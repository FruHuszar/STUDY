import { marked } from "marked";
import Frontmatter from "./Frontmatter.js";
import CategoryPalette from "./CategoryPalette.js";

const titleFromFile = (fileName) =>
  fileName
    .replace(/\.(md|markdown)$/i, "")
    .replace(/^\d+[-_.]/, "")
    .replace(/[-_]/g, " ")
    .trim();

export default function importMarkdown(fileName, raw, fallbackCategory) {
  const { data, body } = Frontmatter.split(raw.replace(/\r\n/g, "\n"));
  const heading = marked.lexer(body).find((token) => token.type === "heading" && token.depth === 1);
  const content = heading ? body.replace(heading.raw, "") : body;
  const title = (data.title || heading?.text || titleFromFile(fileName) || "Untitled").trim();
  return {
    title: title.slice(0, 200),
    category: CategoryPalette.normalize(data.category || fallbackCategory),
    content: `${content.trim()}\n`
  };
}
