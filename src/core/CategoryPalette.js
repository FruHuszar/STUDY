const swatches = [
  { name: "Green", color: "#5f9e6e" },
  { name: "Blue", color: "#4f7fb8" },
  { name: "Amber", color: "#d4a03c" },
  { name: "Red", color: "#c2544f" },
  { name: "Violet", color: "#8b68b8" },
  { name: "Teal", color: "#3f9a9a" },
  { name: "Rose", color: "#c96b93" },
  { name: "Olive", color: "#98a13f" },
  { name: "Orange", color: "#d27a3e" },
  { name: "Slate", color: "#7f8c9c" }
];

const hexColor = /^#[0-9a-f]{6}$/i;

export default class CategoryPalette {
  static get swatches() {
    return swatches;
  }

  static normalize(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 40);
  }

  static isColor(value) {
    return hexColor.test(String(value || ""));
  }

  static fallback(name) {
    let hash = 0;
    for (const char of name) {
      hash = (hash * 31 + char.codePointAt(0)) >>> 0;
    }
    return swatches[hash % swatches.length].color;
  }
}
