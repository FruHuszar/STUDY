export default class InstallPrompt {
  #event = null;
  #listeners = [];

  constructor() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.#event = event;
      this.#notify();
    });
    window.addEventListener("appinstalled", () => {
      this.#event = null;
      this.#notify();
    });
  }

  get available() {
    return this.#event !== null;
  }

  onChange(listener) {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter((entry) => entry !== listener);
    };
  }

  install() {
    if (this.#event === null) {
      return Promise.resolve(false);
    }
    return this.#event
      .prompt()
      .then(() => this.#event.userChoice)
      .then((choice) => {
        this.#event = null;
        this.#notify();
        return choice.outcome === "accepted";
      });
  }

  #notify() {
    this.#listeners.forEach((listener) => listener(this.available));
  }
}
