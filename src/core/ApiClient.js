export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export default class ApiClient {
  #base;
  #token;

  constructor(base, token) {
    this.#base = base;
    this.#token = token;
  }

  signIn(credential) {
    return this.#request("POST", "/api/session", { credential }, false);
  }

  listNotes() {
    return this.#request("GET", "/api/notes");
  }

  createNote(note) {
    return this.#request("POST", "/api/notes", note);
  }

  updateNote(id, note) {
    return this.#request("PUT", `/api/notes/${encodeURIComponent(id)}`, note);
  }

  deleteNote(id) {
    return this.#request("DELETE", `/api/notes/${encodeURIComponent(id)}`);
  }

  saveCategory(name, color) {
    return this.#request("PUT", "/api/categories", { name, color });
  }

  renameCategory(from, to, color) {
    return this.#request("POST", "/api/categories/rename", { from, to, color });
  }

  deleteCategory(name) {
    return this.#request("DELETE", `/api/categories/${encodeURIComponent(name)}`);
  }

  async #request(method, path, body, authenticated = true) {
    const headers = {};
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }
    const token = authenticated ? this.#token() : null;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    let response;
    try {
      response = await fetch(`${this.#base}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        cache: "no-store"
      });
    } catch {
      throw new ApiError(0, "Can't reach the notes server. Check your connection and try again.");
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new ApiError(response.status, data.error || `The server answered with error ${response.status}.`);
    }
    return data;
  }
}
