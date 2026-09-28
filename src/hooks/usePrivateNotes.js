import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import config from "../config.js";
import ApiClient, { ApiError } from "../core/ApiClient.js";
import SessionStore from "../core/SessionStore.js";
import NoteCache from "../core/NoteCache.js";
import GoogleSignIn from "../core/GoogleSignIn.js";

const sessions = new SessionStore();
const cache = new NoteCache();
const empty = { notes: [], categories: [], savedAt: null };

export const googleSignIn = new GoogleSignIn(config.googleClientId);

const byCategoryAndTitle = (a, b) =>
  a.category.localeCompare(b.category) || a.title.localeCompare(b.title);

export default function usePrivateNotes() {
  const [session, setSession] = useState(() =>
    config.privateNotesEnabled ? sessions.read() : null
  );
  const [data, setData] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const sessionRef = useRef(session);
  const dataRef = useRef(data);

  const api = useMemo(
    () => new ApiClient(config.apiUrl, () => sessionRef.current?.token),
    []
  );

  const applySession = useCallback((next) => {
    sessionRef.current = next;
    setSession(next);
    if (next) {
      sessions.write(next);
    } else {
      sessions.clear();
    }
  }, []);

  const store = useCallback(async (next) => {
    const sorted = { ...next, notes: [...next.notes].sort(byCategoryAndTitle) };
    dataRef.current = sorted;
    setData(sorted);
    if (sessionRef.current) {
      await cache.write({ ...sorted, email: sessionRef.current.email });
    }
  }, []);

  const signOut = useCallback(
    async (message = "") => {
      applySession(null);
      dataRef.current = empty;
      setData(empty);
      await cache.clear();
      googleSignIn.forget();
      setStatus("idle");
      setError(message);
    },
    [applySession]
  );

  const report = useCallback(
    async (problem) => {
      if (problem instanceof ApiError && (problem.status === 401 || problem.status === 403)) {
        await signOut(problem.message);
        return;
      }
      setStatus(problem instanceof ApiError && problem.status === 0 ? "offline" : "idle");
      setError(problem.message);
    },
    [signOut]
  );

  const refresh = useCallback(async () => {
    if (!sessionRef.current) {
      return;
    }
    setStatus("syncing");
    setError("");
    try {
      const result = await api.listNotes();
      if (result.session) {
        applySession(result.session);
      }
      await store({ notes: result.notes, categories: result.categories, savedAt: Date.now() });
      setStatus("synced");
    } catch (problem) {
      await report(problem);
    }
  }, [api, applySession, report, store]);

  useEffect(() => {
    if (!config.privateNotesEnabled) {
      return undefined;
    }
    let active = true;
    const start = async () => {
      const saved = await cache.read();
      if (!active) {
        return;
      }
      if (saved) {
        const restored = {
          notes: saved.notes || [],
          categories: saved.categories || [],
          savedAt: saved.savedAt || null
        };
        dataRef.current = restored;
        setData(restored);
      }
      if (sessionRef.current && navigator.onLine) {
        await refresh();
      } else if (sessionRef.current) {
        setStatus("offline");
      }
    };
    start();
    const onOnline = () => refresh();
    const onOffline = () => setStatus("offline");
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      active = false;
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [refresh]);

  const signIn = useCallback(
    async (credential) => {
      setStatus("syncing");
      setError("");
      try {
        const next = await api.signIn(credential);
        const saved = await cache.read();
        if (saved && saved.email !== next.email) {
          await cache.clear();
          dataRef.current = empty;
          setData(empty);
        }
        applySession(next);
        await refresh();
      } catch (problem) {
        await report(problem);
      }
    },
    [api, applySession, refresh, report]
  );

  const guarded = useCallback(
    async (action) => {
      if (!sessionRef.current) {
        throw new Error("Sign in to change private notes.");
      }
      try {
        return await action();
      } catch (problem) {
        await report(problem);
        throw problem;
      }
    },
    [report]
  );

  const save = useCallback(
    (draft) =>
      guarded(async () => {
        const fields = { title: draft.title, category: draft.category, content: draft.content };
        const note = draft.id
          ? await api.updateNote(draft.id, { ...fields, version: draft.version })
          : await api.createNote(fields);
        let categories = dataRef.current.categories;
        if (draft.category && draft.color) {
          const saved = await api.saveCategory(draft.category, draft.color);
          categories = [...categories.filter((entry) => entry.name !== saved.name), saved];
        }
        const others = dataRef.current.notes.filter((entry) => entry.id !== note.id);
        await store({ notes: [...others, note], categories, savedAt: Date.now() });
        return note;
      }),
    [api, guarded, store]
  );

  const remove = useCallback(
    (id) =>
      guarded(async () => {
        await api.deleteNote(id);
        await store({
          ...dataRef.current,
          notes: dataRef.current.notes.filter((entry) => entry.id !== id),
          savedAt: Date.now()
        });
      }),
    [api, guarded, store]
  );

  const importNotes = useCallback(
    (drafts, onProgress) =>
      guarded(async () => {
        const created = [];
        try {
          for (const draft of drafts) {
            created.push(await api.createNote(draft));
            onProgress(created.length, drafts.length);
          }
        } finally {
          if (created.length > 0) {
            await store({
              ...dataRef.current,
              notes: [...dataRef.current.notes, ...created],
              savedAt: Date.now()
            });
          }
        }
        return created.length;
      }),
    [api, guarded, store]
  );

  const saveCategoryColor = useCallback(
    (name, color) =>
      guarded(async () => {
        const saved = await api.saveCategory(name, color);
        await store({
          ...dataRef.current,
          categories: [
            ...dataRef.current.categories.filter((entry) => entry.name !== saved.name),
            saved
          ],
          savedAt: Date.now()
        });
      }),
    [api, guarded, store]
  );

  const renameCategory = useCallback(
    (from, to, color) =>
      guarded(async () => {
        await api.renameCategory(from, to, color);
        await refresh();
      }),
    [api, guarded, refresh]
  );

  const deleteCategory = useCallback(
    (name) =>
      guarded(async () => {
        await api.deleteCategory(name);
        await refresh();
      }),
    [api, guarded, refresh]
  );

  return {
    enabled: config.privateNotesEnabled,
    signedIn: session !== null,
    email: session?.email || "",
    notes: data.notes,
    categories: data.categories,
    savedAt: data.savedAt,
    status,
    error,
    signIn,
    signOut,
    refresh,
    save,
    remove,
    importNotes,
    saveCategoryColor,
    renameCategory,
    deleteCategory
  };
}
