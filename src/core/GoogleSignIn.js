const scriptUrl = "https://accounts.google.com/gsi/client";

export default class GoogleSignIn {
  #clientId;
  #loading = null;
  #initialized = false;
  #onCredential = () => {};

  constructor(clientId) {
    this.#clientId = clientId;
  }

  async render(element, onCredential) {
    this.#onCredential = onCredential;
    await this.#load();
    const { id } = window.google.accounts;
    if (!this.#initialized) {
      id.initialize({
        client_id: this.#clientId,
        callback: (response) => this.#onCredential(response.credential),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      this.#initialized = true;
    }
    element.replaceChildren();
    id.renderButton(element, {
      theme: "filled_black",
      size: "medium",
      shape: "pill",
      text: "signin_with"
    });
  }

  forget() {
    window.google?.accounts?.id?.disableAutoSelect();
  }

  #load() {
    if (window.google?.accounts?.id) {
      return Promise.resolve();
    }
    if (!this.#loading) {
      this.#loading = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => {
          this.#loading = null;
          script.remove();
          reject(new Error("Google sign-in didn't load. Check your connection and reload."));
        };
        document.head.append(script);
      });
    }
    return this.#loading;
  }
}
