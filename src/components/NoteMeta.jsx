import CategoryDot from "./CategoryDot.jsx";

export default function NoteMeta({ note, label, color, onEdit }) {
  return (
    <div className="meta">
      <p>
        {note.category && <CategoryDot color={color} />}
        <span>{label}</span>
        {note.category && <span>{note.category}</span>}
        {note.isPrivate && <span>private</span>}
      </p>
      {note.isPrivate && onEdit && (
        <button type="button" className="action" onClick={() => onEdit(note)}>
          Edit
        </button>
      )}
    </div>
  );
}
