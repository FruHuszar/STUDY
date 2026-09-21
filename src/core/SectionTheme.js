export default class SectionTheme {
  #palettes = [
    { bg: "#1e1512", font: "#e8dacb", active: "#a8434f", code: "#c9996c" },
    { bg: "#e7dac7", font: "#2a1d18", active: "#7a2b36", code: "#8a5a2b" },
    { bg: "#4c1d26", font: "#f0dcd3", active: "#c98a5b", code: "#e0a38b" },
    { bg: "#d9c7ae", font: "#33221a", active: "#7e2b36", code: "#6b4a2a" },
    { bg: "#40291f", font: "#ebd9c3", active: "#b4646b", code: "#cba36a" }
  ];

  paletteFor(index) {
    const palette = this.#palettes[index % this.#palettes.length];
    return {
      "--color-theme-bg": palette.bg,
      "--color-theme-font": palette.font,
      "--color-theme-active": palette.active,
      "--color-theme-code": palette.code
    };
  }
}
