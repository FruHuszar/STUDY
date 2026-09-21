import Block from "./Block.js";

export default class TableBlock extends Block {
  #header;
  #rows;

  constructor(header, rows) {
    super("table");
    this.#header = header;
    this.#rows = rows;
  }

  get header() {
    return this.#header;
  }

  get rows() {
    return this.#rows;
  }

  get searchText() {
    return this.#rows
      .flat()
      .map((cell) => cell.text)
      .join(" ");
  }
}
