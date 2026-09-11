import BlockView from "./BlockView.jsx";

export default function ChapterView({ chapter }) {
  const focusable = chapter.level === 2;

  return (
    <article data-level={chapter.level} className={chapter.isHero ? "hero" : undefined}>
      {chapter.titleText.length > 0 && (
        <h3
          tabIndex={focusable ? 0 : undefined}
          data-heading={focusable ? "" : undefined}
          dangerouslySetInnerHTML={{ __html: chapter.titleHtml }}
        />
      )}
      {chapter.blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </article>
  );
}
