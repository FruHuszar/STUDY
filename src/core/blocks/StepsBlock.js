import Block from "./Block.js";

const variants = ["timeline", "ledger", "cards", "rail"];

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
    let hash = 0;
    for (const char of this.searchText) {
      hash = (hash * 31 + char.codePointAt(0)) >>> 0;
    }
    return variants[hash % variants.length];
  }
}
