export default class ScrollSnapGuard {
  #distance = 0;
  #startedAt = 0;
  #timer = 0;

  start() {
    window.addEventListener("wheel", this.#onWheel, { passive: true });
    window.addEventListener("touchmove", this.#onTouch, { passive: true });
    return () => {
      window.removeEventListener("wheel", this.#onWheel);
      window.removeEventListener("touchmove", this.#onTouch);
    };
  }

  #onWheel = (event) => this.#measure(Math.abs(event.deltaY));

  #onTouch = () => this.#measure(90);

  #measure(amount) {
    const now = Date.now();
    if (now - this.#startedAt > 450) {
      this.#startedAt = now;
      this.#distance = 0;
    }
    this.#distance += amount;
    if (this.#distance > 320) {
      this.#suspend();
    }
  }

  #suspend() {
    document.documentElement.style.scrollSnapType = "none";
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => {
      document.documentElement.style.scrollSnapType = "";
      this.#distance = 0;
    }, 700);
  }
}
