export default class Block {
  #kind;

  constructor(kind) {
    this.#kind = kind;
  }

  get kind() {
    return this.#kind;
  }

  get searchText() {
    return "";
  }
}
