import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import php from "highlight.js/lib/languages/php";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";

export default class CodeHighlighter {
  #aliases = {
    pwsh: "powershell",
    ps1: "powershell",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    js: "javascript",
    jsx: "javascript",
    html: "xml",
    yml: "xml"
  };

  constructor() {
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("php", php);
    hljs.registerLanguage("powershell", powershell);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("sql", sql);
    hljs.registerLanguage("xml", xml);
  }

  label(language) {
    return (language || "text").toLowerCase();
  }

  highlight(code, language) {
    const name = this.#aliases[this.label(language)] || this.label(language);
    if (!hljs.getLanguage(name)) {
      return this.#escape(code);
    }
    return hljs.highlight(code, { language: name }).value;
  }

  #escape(code) {
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
