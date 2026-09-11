import Block from "./Block.js";

export default class StepsBlock extends Block {
  #items;
  #variant;

  constructor(items) {
    super("steps");
    this.#items = items;
    this.#variant = this.#pickVariant();
  }

  get items() {
    return this.#items;
  }

  get variant() {
    return this.#variant;
  }

  get searchText() {
    return this.#items.map((item) => item.text).join(" ");
  }

  #pickVariant() {
    if (this.#items.length > 5) {
      return "compact";
    }
    return Math.random() < 0.5 ? "timeline" : "ledger";
  }
}
