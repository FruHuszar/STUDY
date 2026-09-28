import Block from "./Block.js";

export default class QuoteBlock extends Block {
  #html;
  #text;

  constructor(html, text) {
    super("quote");
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
