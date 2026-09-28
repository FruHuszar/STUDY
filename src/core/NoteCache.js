const databaseName = "study-notes";
const storeName = "cache";
const entryKey = "private-notes";

export default class NoteCache {
  #database = null;

  #open() {
    if (this.#database) {
      return this.#database;
    }
    this.#database = new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB is unavailable."));
        return;
      }
      const request = indexedDB.open(databaseName, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(storeName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    this.#database.catch(() => {
      this.#database = null;
    });
    return this.#database;
  }

  async #run(mode, action) {
    try {
      const database = await this.#open();
      return await new Promise((resolve, reject) => {
        const request = action(database.transaction(storeName, mode).objectStore(storeName));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch {
      return null;
    }
  }

  read() {
    return this.#run("readonly", (store) => store.get(entryKey));
  }

  write(value) {
    return this.#run("readwrite", (store) => store.put(value, entryKey));
  }

  clear() {
    return this.#run("readwrite", (store) => store.delete(entryKey));
  }
}
