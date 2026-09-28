import { useCallback, useEffect, useMemo, useState } from "react";
import NoteFile from "./core/NoteFile.js";
import NoteLibrary from "./core/NoteLibrary.js";
import MarkdownParser from "./core/MarkdownParser.js";
import SectionTheme from "./core/SectionTheme.js";
import StepNavigator from "./core/StepNavigator.js";
import ScrollSnapGuard from "./core/ScrollSnapGuard.js";
import usePrivateNotes from "./hooks/usePrivateNotes.js";
import TopBar from "./components/TopBar.jsx";
import AccountBar from "./components/AccountBar.jsx";
import NoteSection from "./components/NoteSection.jsx";
import NoteEditor from "./components/NoteEditor.jsx";
import ImportDialog from "./components/ImportDialog.jsx";
import CategoryManager from "./components/CategoryManager.jsx";
import BackToTop from "./components/BackToTop.jsx";

const sources = import.meta.glob("/markdown-notes/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});
const parser = new MarkdownParser();
const publicNotes = Object.keys(sources)
  .sort()
  .map((path) => NoteFile.fromFile(path, sources[path], parser));
const theme = new SectionTheme();
const steps = new StepNavigator();
const snapGuard = new ScrollSnapGuard();

const scrollToNote = (slug) =>
  requestAnimationFrame(() =>
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" })
  );

export default function App() {
  const account = usePrivateNotes();
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [editing, setEditing] = useState(null);
  const [importing, setImporting] = useState(false);
  const [managingCategories, setManagingCategories] = useState(false);

  useEffect(() => steps.start(), []);
  useEffect(() => snapGuard.start(), []);

  const library = useMemo(() => {
    const privateNotes = account.notes.map((record) => NoteFile.fromRecord(record, parser));
    const savedColors = Object.fromEntries(
      account.categories.map((entry) => [entry.name, entry.color])
    );
    const showExamples = !account.signedIn && account.notes.length === 0;
    return new NoteLibrary([...privateNotes, ...(showExamples ? publicNotes : [])], savedColors);
  }, [account.notes, account.categories, account.signedIn]);

  const categories = library.categories;
  const ownCategories = useMemo(() => {
    const counts = new Map(account.categories.map((entry) => [entry.name, 0]));
    account.notes.forEach((record) => {
      if (record.category) {
        counts.set(record.category, (counts.get(record.category) || 0) + 1);
      }
    });
    return [...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count, color: library.colorFor(name) }));
  }, [account.notes, account.categories, library]);
  const category = categories.some((entry) => entry.name === activeCategory) ? activeCategory : "";
  const tags = library.tagsIn(category);
  const tagsInView = activeTags.filter((tag) => tags.includes(tag));

  useEffect(() => {
    if (!account.signedIn) {
      setEditing(null);
      setImporting(false);
      setManagingCategories(false);
    }
  }, [account.signedIn]);

  const toggleTag = (tag) =>
    setActiveTags(
      tagsInView.includes(tag) ? tagsInView.filter((entry) => entry !== tag) : [...tagsInView, tag]
    );

  const toggleCategory = (name) => setActiveCategory(category === name ? "" : name);

  const startNew = useCallback(
    () => setEditing({ title: "", category, content: "" }),
    [category]
  );

  const startEdit = useCallback((note) => {
    const { id, version, title, category: noteCategory, content } = note.record;
    setEditing({ id, version, title, category: noteCategory, content });
  }, []);

  const save = async (draft) => {
    const note = await account.save(draft);
    setEditing(null);
    scrollToNote(`note-${note.id}`);
  };

  const remove = async (id) => {
    await account.remove(id);
    setEditing(null);
  };

  const visible = library.notes.filter(
    (note) => note.inCategory(category) && note.isVisible(query, tagsInView)
  );

  return (
    <>
      <TopBar
        notes={visible}
        categories={categories}
        activeCategory={category}
        onCategory={toggleCategory}
        tags={tags}
        activeTags={tagsInView}
        onTag={toggleTag}
        query={query}
        onQuery={setQuery}
        colorFor={(name) => library.colorFor(name)}
        account={
          <AccountBar
            account={account}
            onNew={startNew}
            onImport={() => setImporting(true)}
            onCategories={() => setManagingCategories(true)}
          />
        }
      />
      <main>
        {library.notes.map((note, index) =>
          note.inCategory(category) ? (
            <NoteSection
              key={note.slug}
              note={note}
              index={index}
              palette={theme.paletteFor(index)}
              color={note.category ? library.colorFor(note.category) : null}
              query={query}
              activeTags={tagsInView}
              onEdit={account.signedIn ? startEdit : null}
            />
          ) : null
        )}
        {visible.length === 0 && (
          <section className="nothing">
            <p>
              {library.notes.length === 0
                ? "No notes yet. Use New note or Import at the top."
                : "No notes match. Clear the search or pick fewer tags."}
            </p>
          </section>
        )}
      </main>
      <BackToTop />
      {editing && (
        <NoteEditor
          draft={editing}
          categories={ownCategories}
          colorFor={(name) => library.colorFor(name)}
          onSave={save}
          onDelete={remove}
          onClose={() => setEditing(null)}
        />
      )}
      {managingCategories && (
        <CategoryManager
          categories={ownCategories}
          onAdd={account.saveCategoryColor}
          onColor={account.saveCategoryColor}
          onRename={account.renameCategory}
          onDelete={account.deleteCategory}
          onClose={() => setManagingCategories(false)}
        />
      )}
      {importing && (
        <ImportDialog
          categories={categories}
          onImport={account.importNotes}
          onClose={() => setImporting(false)}
        />
      )}
    </>
  );
}
