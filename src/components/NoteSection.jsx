import ChapterView from "./ChapterView.jsx";
import BriefNote from "./BriefNote.jsx";

export default function NoteSection({ note, index, palette, query, activeTags }) {
  const chapters = note.visibleChapters(query, activeTags);
  const label = String(index + 1).padStart(2, "0");

  if (chapters.length === 0) {
    return null;
  }

  if (note.isBrief) {
    return (
      <section id={note.slug} style={palette} data-brief="">
        <BriefNote note={note} chapters={chapters} label={label} />
      </section>
    );
  }

  return (
    <section id={note.slug} style={palette}>
      <header>
        <p>{label}</p>
        <h2 tabIndex={0} data-heading>
          {note.title}
        </h2>
      </header>
      {chapters.map((chapter) => (
        <ChapterView key={chapter.id} chapter={chapter} />
      ))}
    </section>
  );
}
