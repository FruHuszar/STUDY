import CodeHighlighter from "../core/CodeHighlighter.js";

const highlighter = new CodeHighlighter();

export default function CodeView({ block }) {
  return (
    <figure className="code">
      <figcaption>{highlighter.label(block.language)}</figcaption>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: highlighter.highlight(block.code, block.language)
          }}
        />
      </pre>
    </figure>
  );
}
