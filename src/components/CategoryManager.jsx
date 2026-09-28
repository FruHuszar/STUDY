import { useState } from "react";
import Dialog from "./Dialog.jsx";
import ColorPicker from "./ColorPicker.jsx";
import CategoryDot from "./CategoryDot.jsx";
import CategoryDialog from "./CategoryDialog.jsx";
import CategoryPalette from "../core/CategoryPalette.js";

const notes = (count) => `${count} ${count === 1 ? "note" : "notes"}`;

function RenameField({ category, existing, busy, onRename, onCancel }) {
  const [name, setName] = useState(category.name);
  const [error, setError] = useState("");

  const submit = () => {
    const normalized = CategoryPalette.normalize(name);
    if (!normalized) {
      setError("Name the category.");
      return;
    }
    if (normalized !== category.name && existing.some((entry) => entry.name === normalized)) {
      setError(`"${normalized}" already exists.`);
      return;
    }
    onRename(normalized);
  };

  return (
    <div className="rename">
      <input
        value={name}
        maxLength={40}
        autoFocus
        aria-label={`New name for ${category.name}`}
        disabled={busy}
        onChange={(event) => {
          setName(event.target.value);
          setError("");
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            submit();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onCancel();
          }
        }}
      />
      <button type="button" className="action" onClick={submit} disabled={busy}>
        Save name
      </button>
      <button type="button" className="action" onClick={onCancel} disabled={busy}>
        Cancel
      </button>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CategoryManager({ categories, onAdd, onColor, onRename, onDelete, onClose }) {
  const [open, setOpen] = useState(null);
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async (action) => {
    setBusy(true);
    setError("");
    try {
      await action();
      return true;
    } catch (problem) {
      setError(problem.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const toggle = (name, panel) =>
    setOpen(open?.name === name && open.panel === panel ? null : { name, panel });

  const remove = async (category) => {
    const question =
      category.count === 0
        ? `Delete "${category.name}"?`
        : `Delete "${category.name}"? ${notes(category.count)} will have no category. The notes themselves stay.`;
    if (window.confirm(question) && (await run(() => onDelete(category.name)))) {
      setOpen(null);
    }
  };

  return (
    <Dialog title="Categories" onDismiss={() => !busy && !adding && onClose()}>
      {categories.length === 0 ? (
        <p className="lead">No categories yet.</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.name}>
              <div className="category-row">
                <CategoryDot color={category.color} />
                <span className="name">{category.name}</span>
                <span className="count">{notes(category.count)}</span>
                <button
                  type="button"
                  className="action"
                  aria-expanded={open?.name === category.name && open.panel === "rename"}
                  disabled={busy}
                  onClick={() => toggle(category.name, "rename")}
                >
                  Rename
                </button>
                <button
                  type="button"
                  className="action"
                  aria-expanded={open?.name === category.name && open.panel === "color"}
                  disabled={busy}
                  onClick={() => toggle(category.name, "color")}
                >
                  Color
                </button>
                <button
                  type="button"
                  className="action"
                  disabled={busy}
                  onClick={() => remove(category)}
                >
                  Delete
                </button>
              </div>
              {open?.name === category.name && open.panel === "color" && (
                <ColorPicker
                  value={category.color}
                  disabled={busy}
                  onChange={(color) => run(() => onColor(category.name, color))}
                />
              )}
              {open?.name === category.name && open.panel === "rename" && (
                <RenameField
                  category={category}
                  existing={categories}
                  busy={busy}
                  onCancel={() => setOpen(null)}
                  onRename={async (name) => {
                    if (await run(() => onRename(category.name, name, category.color))) {
                      setOpen(null);
                    }
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="row">
        <button type="button" className="primary" onClick={onClose} disabled={busy}>
          Done
        </button>
        <button type="button" className="action" onClick={() => setAdding(true)} disabled={busy}>
          + New category
        </button>
      </div>
      {adding && (
        <CategoryDialog
          existing={categories}
          onAdd={async (entry) => {
            setAdding(false);
            await run(() => onAdd(entry.name, entry.color));
          }}
          onClose={() => setAdding(false)}
        />
      )}
    </Dialog>
  );
}
