import ChapterView from "./ChapterView.jsx";
import BriefNote from "./BriefNote.jsx";
import NoteMeta from "./NoteMeta.jsx";

export default function NoteSection({ note, index, palette, color, query, activeTags, onEdit }) {
  const chapters = note.visibleChapters(query, activeTags);
  const label = String(index + 1).padStart(2, "0");

  if (!note.isVisible(query, activeTags)) {
    return null;
  }

  const meta = <NoteMeta note={note} label={label} color={color} onEdit={onEdit} />;

  if (note.isBrief) {
    return (
      <section id={note.slug} style={palette} data-brief="">
        <BriefNote note={note} chapters={chapters} meta={meta} />
      </section>
    );
  }

  return (
    <section id={note.slug} style={palette}>
      <header>
        {meta}
        <h2 tabIndex={0} data-heading>
          {note.title}
        </h2>
        {chapters.length === 0 && <p className="empty">This note is empty. Edit it to add content.</p>}
      </header>
      {chapters.map((chapter) => (
        <ChapterView key={chapter.id} chapter={chapter} />
      ))}
    </section>
  );
}
