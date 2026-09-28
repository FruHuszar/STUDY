import { useState } from "react";
import Dialog from "./Dialog.jsx";
import CategoryDialog from "./CategoryDialog.jsx";
import CategoryDot from "./CategoryDot.jsx";

const placeholder = `## First chapter

#### tags
sql, school

Write in Markdown. Every ## or ### heading starts a new chapter.`;

export default function NoteEditor({ draft, categories, colorFor, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(draft.title);
  const [category, setCategory] = useState(draft.category || "");
  const [content, setContent] = useState(draft.content);
  const [created, setCreated] = useState(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const options = categories.map((entry) => ({ name: entry.name, color: entry.color }));
  if (created && !options.some((entry) => entry.name === created.name)) {
    options.push(created);
  }
  if (draft.category && !options.some((entry) => entry.name === draft.category)) {
    options.push({ name: draft.category, color: colorFor(draft.category) });
  }
  options.sort((a, b) => a.name.localeCompare(b.name));

  const isNewCategory = created !== null && created.name === category;
  const categoryColor = options.find((entry) => entry.name === category)?.color;
  const dirty =
    title !== draft.title || category !== (draft.category || "") || content !== draft.content;

  const dismiss = () => {
    if (busy) {
      return;
    }
    if (dirty && !window.confirm("Discard your changes to this note?")) {
      return;
    }
    onClose();
  };

  const save = async () => {
    if (title.trim().length === 0) {
      setError("Give the note a title.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onSave({
        id: draft.id,
        version: draft.version,
        title: title.trim(),
        category,
        content,
        color: isNewCategory ? created.color : null
      });
    } catch (problem) {
      setError(problem.message);
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${draft.title}"? This can't be undone.`)) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onDelete(draft.id);
    } catch (problem) {
      setError(problem.message);
      setBusy(false);
    }
  };

  return (
    <Dialog title={draft.id ? "Edit note" : "New note"} onDismiss={dismiss} wide>
      <div
        className="form"
        onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
            event.preventDefault();
            save();
          }
        }}
      >
        <label className="field">
          <span>Title</span>
          <input
            value={title}
            maxLength={200}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus={!draft.id}
          />
        </label>
        <div className="field">
          <label htmlFor="note-category">Category</label>
          <div className="category-picker">
            {categoryColor && <CategoryDot color={categoryColor} />}
            <select
              id="note-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">No category</option>
              {options.map((entry) => (
                <option key={entry.name} value={entry.name}>
                  {entry.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="action"
              onClick={() => setAddingCategory(true)}
              disabled={busy}
            >
              New category
            </button>
          </div>
        </div>
        <label className="field">
          <span>Note</span>
          <textarea
            value={content}
            spellCheck
            placeholder={placeholder}
            onChange={(event) => setContent(event.target.value)}
            autoFocus={Boolean(draft.id)}
          />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="row">
          <button type="button" className="primary" onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save note"}
          </button>
          <button type="button" className="action" onClick={dismiss} disabled={busy}>
            Cancel
          </button>
          {draft.id && (
            <button type="button" className="action danger" onClick={remove} disabled={busy}>
              Delete note
            </button>
          )}
        </div>
      </div>
      {addingCategory && (
        <CategoryDialog
          existing={options}
          onAdd={(entry) => {
            setCreated(entry);
            setCategory(entry.name);
            setAddingCategory(false);
          }}
          onClose={() => setAddingCategory(false)}
        />
      )}
    </Dialog>
  );
}
