import CodeView from "./CodeView.jsx";
import StepsView from "./StepsView.jsx";
import TableView from "./TableView.jsx";

export default function BlockView({ block }) {
  if (block.kind === "code") {
    return <CodeView block={block} />;
  }
  if (block.kind === "steps") {
    return <StepsView block={block} />;
  }
  if (block.kind === "table") {
    return <TableView block={block} />;
  }
  if (block.kind === "quote") {
    return <blockquote dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
  if (block.kind === "heading") {
    return <h4 dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
  return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
}
