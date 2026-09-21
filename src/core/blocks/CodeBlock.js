import Block from "./Block.js";

export default class CodeBlock extends Block {
  #code;
  #language;

  constructor(code, language) {
    super("code");
    this.#code = code;
    this.#language = language;
  }

  get code() {
    return this.#code;
  }

  get language() {
    return this.#language;
  }

  get searchText() {
    return this.#code;
  }
}
