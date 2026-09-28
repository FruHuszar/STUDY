import { useState } from "react";
import Dialog from "./Dialog.jsx";
import ColorPicker from "./ColorPicker.jsx";
import CategoryPalette from "../core/CategoryPalette.js";

export default function CategoryDialog({ existing, onAdd, onClose }) {
  const usedColors = existing.map((entry) => entry.color);
  const [name, setName] = useState("");
  const [color, setColor] = useState(
    (CategoryPalette.swatches.find((swatch) => !usedColors.includes(swatch.color)) ||
      CategoryPalette.swatches[0]).color
  );
  const [error, setError] = useState("");

  const add = () => {
    const normalized = CategoryPalette.normalize(name);
    if (!normalized) {
      setError("Name the category.");
      return;
    }
    if (existing.some((entry) => entry.name === normalized)) {
      setError(`"${normalized}" already exists. Pick it from the list instead.`);
      return;
    }
    onAdd({ name: normalized, color });
  };

  return (
    <Dialog title="New category" onDismiss={onClose}>
      <label className="field">
        <span>Name</span>
        <input
          value={name}
          maxLength={40}
          autoFocus
          placeholder="school, work, sql…"
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
        />
      </label>
      <fieldset className="field">
        <legend>Color</legend>
        <ColorPicker value={color} onChange={setColor} />
      </fieldset>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="row">
        <button type="button" className="primary" onClick={add}>
          Add category
        </button>
        <button type="button" className="action" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Dialog>
  );
}
