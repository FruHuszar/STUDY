import BlockView from "./BlockView.jsx";
import { escapeHtml } from "../core/Html.js";

export default function BriefNote({ note, chapters, meta }) {
  return chapters.map((chapter, index) => (
    <article key={chapter.id}>
      {index === 0 && meta}
      <h3
        tabIndex={0}
        data-heading=""
        dangerouslySetInnerHTML={{ __html: `${escapeHtml(note.title)} / ${chapter.titleHtml}` }}
      />
      {chapter.blocks.map((block, blockIndex) => (
        <BlockView key={blockIndex} block={block} />
      ))}
    </article>
  ));
}
