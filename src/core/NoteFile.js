export default class NoteFile {
  #slug;
  #title;
  #chapters;

  constructor(path, raw, parser) {
    const parsed = parser.parse(raw);
    this.#slug = path.split("/").pop().replace(/\.md$/, "");
    this.#title = parsed.title || this.#slug.replace(/^\d+[-_.]/, "").replace(/[-_]/g, " ");
    this.#chapters = parsed.chapters;
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

  get isBrief() {
    return this.#chapters.length <= 2 && this.#chapters.every((chapter) => chapter.isHero);
  }

  get tags() {
    return this.#chapters.flatMap((chapter) => chapter.tags);
  }

  visibleChapters(query, activeTags) {
    return this.#chapters.filter((chapter) =>
      chapter.matches(query, activeTags, this.#title)
    );
  }
}
