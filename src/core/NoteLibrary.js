import CategoryPalette from "./CategoryPalette.js";

export default class NoteLibrary {
  #notes;
  #colors;

  constructor(notes, savedColors = {}) {
    this.#notes = notes;
    this.#colors = new Map();
    notes.forEach((note) => {
      if (note.category && note.color && !this.#colors.has(note.category)) {
        this.#colors.set(note.category, note.color);
      }
    });
    Object.entries(savedColors).forEach(([name, color]) => this.#colors.set(name, color));
  }

  get notes() {
    return this.#notes;
  }

  get categories() {
    const counts = new Map();
    this.#notes.forEach((note) => {
      if (note.category) {
        counts.set(note.category, (counts.get(note.category) || 0) + 1);
      }
    });
    return [...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count, color: this.colorFor(name) }));
  }

  tagsIn(category) {
    return [
      ...new Set(this.#notes.filter((note) => note.inCategory(category)).flatMap((note) => note.tags))
    ].sort();
  }

  colorFor(name) {
    return this.#colors.get(name) || CategoryPalette.fallback(name);
  }
}
