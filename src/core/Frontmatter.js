const block = /^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
const line = /^([A-Za-z][\w-]*)[ \t]*:[ \t]*(.*)$/;

export default class Frontmatter {
  static split(raw) {
    const match = block.exec(raw);
    if (!match) {
      return { data: {}, body: raw };
    }
    const data = {};
    match[1].split(/\r?\n/).forEach((entry) => {
      const pair = line.exec(entry.trim());
      if (pair) {
        data[pair[1].toLowerCase()] = pair[2].trim().replace(/^(['"])(.*)\1$/, "$2");
      }
    });
    return { data, body: raw.slice(match[0].length) };
  }
}
