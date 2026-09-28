export default class StepNavigator {
  #selector = "#root > header nav a, .categories button, .tags button, [data-heading]";

  start() {
    document.addEventListener("keydown", this.#onKey);
    return () => document.removeEventListener("keydown", this.#onKey);
  }

  #isTyping(element) {
    return (
      element !== null &&
      (["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName) ||
        element.isContentEditable ||
        element.closest("dialog") !== null)
    );
  }

  #onKey = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    const current = document.activeElement;
    if (this.#isTyping(current) || document.querySelector("dialog[open]")) {
      return;
    }
    const steps = [...document.querySelectorAll(this.#selector)];
    if (steps.length === 0) {
      return;
    }
    const forward = event.key === "ArrowRight";
    const index = steps.indexOf(current);
    const next =
      index === -1 ? steps[forward ? 0 : steps.length - 1] : steps[index + (forward ? 1 : -1)];
    if (!next) {
      return;
    }
    event.preventDefault();
    if (!next.hasAttribute("data-heading")) {
      next.focus();
      return;
    }
    next.focus({ preventScroll: true });
    (next.closest("section, article") || next).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
}
