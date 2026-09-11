export default class Chapter {
  #id;
  #level;
  #titleHtml;
  #titleText;
  #blocks;
  #tags;

  constructor(id, level, titleHtml, titleText) {
    this.#id = id;
    this.#level = level;
    this.#titleHtml = titleHtml;
    this.#titleText = titleText;
    this.#blocks = [];
    this.#tags = [];
  }

  get id() {
    return this.#id;
  }

  get level() {
    return this.#level;
  }

  get titleHtml() {
    return this.#titleHtml;
  }

  get titleText() {
    return this.#titleText;
  }

  get blocks() {
    return this.#blocks;
  }

  get tags() {
    return this.#tags;
  }

  get isHero() {
    return (
      this.#titleText.length > 0 &&
      this.#blocks.length > 0 &&
      this.#blocks.every((block) => block.kind === "text")
    );
  }

  get searchText() {
    return [this.#titleText, ...this.#blocks.map((block) => block.searchText)]
      .join(" ")
      .toLowerCase();
  }

  addBlock(block) {
    this.#blocks.push(block);
  }

  addTags(tags) {
    tags.forEach((tag) => {
      if (!this.#tags.includes(tag)) {
        this.#tags.push(tag);
      }
    });
  }

  matches(query, activeTags, extraText) {
    const byTag =
      activeTags.length === 0 || this.#tags.some((tag) => activeTags.includes(tag));
    const haystack = `${this.searchText} ${extraText}`.toLowerCase();
    const byQuery = query
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .every((word) => haystack.includes(word));
    return byTag && byQuery;
  }
}
