import BlockView from "./BlockView.jsx";

export default function BriefNote({ note, chapters, label }) {
  return chapters.map((chapter) => (
    <article key={chapter.id}>
      <p>{label}</p>
      <h3
        tabIndex={0}
        data-heading=""
        dangerouslySetInnerHTML={{ __html: `${note.title} / ${chapter.titleHtml}` }}
      />
      {chapter.blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </article>
  ));
}
