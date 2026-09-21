import NoteFile from "./NoteFile.js";

export default class NoteLibrary {
  #notes;

  constructor(sources, parser) {
    this.#notes = Object.keys(sources)
      .sort()
      .map((path) => new NoteFile(path, sources[path], parser));
  }

  get notes() {
    return this.#notes;
  }

  get tags() {
    return [...new Set(this.#notes.flatMap((note) => note.tags))].sort();
  }
}
