import { marked } from "marked";
import Chapter from "./Chapter.js";
import TextBlock from "./blocks/TextBlock.js";
import HeadingBlock from "./blocks/HeadingBlock.js";
import QuoteBlock from "./blocks/QuoteBlock.js";
import CodeBlock from "./blocks/CodeBlock.js";
import StepsBlock from "./blocks/StepsBlock.js";
import TableBlock from "./blocks/TableBlock.js";

export default class MarkdownParser {
  parse(raw) {
    const tokens = marked.lexer(raw);
    const chapters = [];
    let current = new Chapter("chapter-0", 0, "", "");
    let title = "";
    let counter = 0;
    let waitingForTags = false;

    for (const token of tokens) {
      if (token.type === "space" || token.type === "hr") {
        continue;
      }
      if (waitingForTags) {
        waitingForTags = false;
        if (token.type === "paragraph" || token.type === "list") {
          current.addTags(this.#readTags(token));
          continue;
        }
      }
      if (token.type === "heading" && token.depth === 1) {
        title = token.text;
        continue;
      }
      if (token.type === "heading" && this.#isTagsHeading(token)) {
        waitingForTags = true;
        continue;
      }
      if (token.type === "heading" && token.depth <= 3) {
        this.#store(chapters, current);
        counter += 1;
        current = new Chapter(
          `chapter-${counter}`,
          token.depth,
          marked.parseInline(token.text),
          token.text
        );
        continue;
      }
      current.addBlock(this.#toBlock(token));
    }

    this.#store(chapters, current);
    this.#shareTags(chapters);
    return { title, chapters };
  }

  #isTagsHeading(token) {
    return token.depth >= 3 && token.text.trim().toLowerCase() === "tags";
  }

  #readTags(token) {
    const source =
      token.type === "list" ? token.items.map((item) => item.text).join(",") : token.text;
    return source
      .split(/[,\n]/)
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);
  }

  #toBlock(token) {
    if (token.type === "code") {
      return new CodeBlock(token.text, token.lang || "");
    }
    if (token.type === "list") {
      return new StepsBlock(
        token.items.map((item) => ({
          html: marked.parseInline(item.text),
          text: item.text
        }))
      );
    }
    if (token.type === "table") {
      return new TableBlock(
        token.header.map((cell) => marked.parseInline(cell.text)),
        token.rows.map((row) =>
          row.map((cell) => ({ html: marked.parseInline(cell.text), text: cell.text }))
        )
      );
    }
    if (token.type === "blockquote") {
      return new QuoteBlock(marked.parseInline(token.text), token.text);
    }
    if (token.type === "heading") {
      return new HeadingBlock(marked.parseInline(token.text), token.text);
    }
    return new TextBlock(marked.parseInline(token.raw.trim()), token.raw.trim());
  }

  #store(chapters, chapter) {
    if (chapter.titleText.length > 0 || chapter.blocks.length > 0) {
      chapters.push(chapter);
    }
  }

  #shareTags(chapters) {
    chapters.forEach((chapter, index) => {
      if (chapter.level !== 2) {
        return;
      }
      const children = [];
      for (let next = index + 1; next < chapters.length && chapters[next].level === 3; next += 1) {
        children.push(chapters[next]);
      }
      children.forEach((child) => chapter.addTags(child.tags));
      children.forEach((child) => child.addTags(chapter.tags));
    });
  }
}
