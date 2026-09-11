import Block from "./Block.js";

export default class TextBlock extends Block {
  #html;
  #text;

  constructor(html, text) {
    super("text");
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
