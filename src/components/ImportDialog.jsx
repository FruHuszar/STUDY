import { useState } from "react";
import Dialog from "./Dialog.jsx";
import importMarkdown from "../core/MarkdownImport.js";

const maxBytes = 500_000;

export default function ImportDialog({ categories, onImport, onClose }) {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const tooLarge = files.filter((file) => file.size > maxBytes);
  const usable = files.filter((file) => file.size <= maxBytes);

  const run = async () => {
    setBusy(true);
    setError("");
    try {
      const drafts = await Promise.all(
        usable.map(async (file) => importMarkdown(file.name, await file.text(), category))
      );
      const count = await onImport(drafts, (current, total) => setProgress({ current, total }));
      setDone(`Imported ${count} ${count === 1 ? "note" : "notes"}.`);
    } catch (problem) {
      setError(`${problem.message} Notes imported before the error were kept.`);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <Dialog title="Import notes" onDismiss={onClose}>
        <p className="lead">{done}</p>
        <div className="row">
          <button type="button" className="primary" onClick={onClose}>
            Done
          </button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog title="Import notes" onDismiss={() => !busy && onClose()}>
      <p className="lead">
        Pick Markdown files from your computer. Each file becomes one private note. A file's first
        # heading becomes its title.
      </p>
      <label className="field">
        <span>Files</span>
        <input
          type="file"
          multiple
          accept=".md,.markdown,text/markdown"
          disabled={busy}
          onChange={(event) => setFiles([...event.target.files])}
        />
      </label>
      <label className="field">
        <span>Category</span>
        <input
          value={category}
          maxLength={40}
          list="import-category-options"
          placeholder="Used when a file doesn't set its own"
          disabled={busy}
          onChange={(event) => setCategory(event.target.value)}
        />
        <datalist id="import-category-options">
          {categories.map((entry) => (
            <option key={entry.name} value={entry.name} />
          ))}
        </datalist>
      </label>
      {tooLarge.length > 0 && (
        <p className="error">
          {tooLarge.length === 1 ? "1 file is" : `${tooLarge.length} files are`} over 500 KB and
          will be skipped: {tooLarge.map((file) => file.name).join(", ")}
        </p>
      )}
      {progress && busy && (
        <p className="lead" role="status">
          Importing {progress.current} of {progress.total}…
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="row">
        <button
          type="button"
          className="primary"
          onClick={run}
          disabled={busy || usable.length === 0}
        >
          {busy
            ? "Importing…"
            : `Import ${usable.length || ""} ${usable.length === 1 ? "note" : "notes"}`.replace("  ", " ")}
        </button>
        <button type="button" className="action" onClick={onClose} disabled={busy}>
          Cancel
        </button>
      </div>
    </Dialog>
  );
}
