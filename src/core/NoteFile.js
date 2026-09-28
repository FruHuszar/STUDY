import Frontmatter from "./Frontmatter.js";
import CategoryPalette from "./CategoryPalette.js";
import { normalize } from "./Chapter.js";

const titleFromSlug = (slug) => slug.replace(/^\d+[-_.]/, "").replace(/[-_]/g, " ");

export default class NoteFile {
  #slug;
  #title;
  #chapters;
  #category;
  #color;
  #record;

  constructor({ slug, title, category, color, markdown, record = null }, parser) {
    const parsed = parser.parse(markdown);
    this.#slug = slug;
    this.#title = title || parsed.title || titleFromSlug(slug);
    this.#chapters = parsed.chapters;
    this.#category = CategoryPalette.normalize(category);
    this.#color = CategoryPalette.isColor(color) ? color : null;
    this.#record = record;
  }

  static fromFile(path, raw, parser) {
    const { data, body } = Frontmatter.split(raw);
    return new NoteFile(
      {
        slug: path.split("/").pop().replace(/\.md$/, ""),
        title: data.title,
        category: data.category,
        color: data.color,
        markdown: body
      },
      parser
    );
  }

  static fromRecord(record, parser) {
    return new NoteFile(
      {
        slug: `note-${record.id}`,
        title: record.title,
        category: record.category,
        markdown: record.content,
        record
      },
      parser
    );
  }

  get slug() {
    return this.#slug;
  }

  get title() {
    return this.#title;
  }

  get chapters() {
    return this.#chapters;
  }

  get category() {
    return this.#category;
  }

  get color() {
    return this.#color;
  }

  get isPrivate() {
    return this.#record !== null;
  }

  get record() {
    return this.#record;
  }

  get isBrief() {
    return (
      this.#chapters.length > 0 &&
      this.#chapters.length <= 2 &&
      this.#chapters.every((chapter) => chapter.isHero)
    );
  }

  get tags() {
    return this.#chapters.flatMap((chapter) => chapter.tags);
  }

  inCategory(category) {
    return !category || this.#category === category;
  }

  visibleChapters(query, activeTags) {
    return this.#chapters.filter((chapter) =>
      chapter.matches(query, activeTags, `${this.#title} ${this.#category}`)
    );
  }

  isVisible(query, activeTags) {
    if (this.#chapters.length > 0) {
      return this.visibleChapters(query, activeTags).length > 0;
    }
    const haystack = normalize(`${this.#title} ${this.#category}`);
    return (
      activeTags.length === 0 &&
      normalize(query)
        .split(/\s+/)
        .filter((word) => word.length > 0)
        .every((word) => haystack.includes(word))
    );
  }
}
