import { useEffect, useRef, useState } from "react";
import { googleSignIn } from "../hooks/usePrivateNotes.js";

const formatTime = (time) =>
  new Date(time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

function statusText(account, online) {
  if (account.error) {
    return account.error;
  }
  if (account.status === "syncing") {
    return "Syncing your notes…";
  }
  if (account.notes.length > 0 && (!online || account.status === "offline")) {
    return `Offline. Showing notes saved on this device${account.savedAt ? ` at ${formatTime(account.savedAt)}` : ""}.`;
  }
  if (!account.signedIn && account.notes.length > 0) {
    return "Sign in again to sync. Showing notes saved on this device.";
  }
  return "";
}

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}

function SignInButton({ onCredential, online }) {
  const target = useRef(null);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    if (!online || !target.current) {
      return;
    }
    setProblem("");
    googleSignIn.render(target.current, onCredential).catch((error) => setProblem(error.message));
  }, [online, onCredential]);

  if (!online) {
    return <p className="status">Connect to the internet to sign in.</p>;
  }
  return (
    <>
      <div className="google" ref={target} />
      {problem && <p className="status">{problem}</p>}
    </>
  );
}

export default function AccountBar({ account, onNew, onImport, onCategories }) {
  const online = useOnline();

  if (!account.enabled) {
    return null;
  }

  const message = statusText(account, online);
  const canEdit = account.signedIn && online;

  return (
    <>
      {account.signedIn ? (
        <>
          <button type="button" className="action" onClick={onNew} disabled={!canEdit}>
            New note
          </button>
          <button type="button" className="action" onClick={onImport} disabled={!canEdit}>
            Import
          </button>
          <button type="button" className="action" onClick={onCategories} disabled={!canEdit}>
            Categories
          </button>
          <button
            type="button"
            className="action"
            onClick={account.refresh}
            disabled={!online || account.status === "syncing"}
          >
            Sync
          </button>
          <button
            type="button"
            className="action"
            title={`Signed in as ${account.email}`}
            onClick={() => account.signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <SignInButton onCredential={account.signIn} online={online} />
      )}
      {message && (
        <p className="status" role="status">
          {message}
        </p>
      )}
    </>
  );
}
