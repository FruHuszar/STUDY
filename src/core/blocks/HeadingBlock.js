import Block from "./Block.js";

export default class HeadingBlock extends Block {
  #html;
  #text;

  constructor(html, text) {
    super("heading");
    this.#html = html;
    this.#text = text;
  }

  get html() {
    return this.#html;
  }

  get searchText() {
    return this.#text;
  }
}
