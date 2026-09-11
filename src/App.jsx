import { useEffect, useState } from "react";
import NoteLibrary from "./core/NoteLibrary.js";
import MarkdownParser from "./core/MarkdownParser.js";
import SectionTheme from "./core/SectionTheme.js";
import StepNavigator from "./core/StepNavigator.js";
import ScrollSnapGuard from "./core/ScrollSnapGuard.js";
import TopBar from "./components/TopBar.jsx";
import NoteSection from "./components/NoteSection.jsx";
import BackToTop from "./components/BackToTop.jsx";

const sources = import.meta.glob("/markdown-notes/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});
const library = new NoteLibrary(sources, new MarkdownParser());
const theme = new SectionTheme();
const steps = new StepNavigator();
const snapGuard = new ScrollSnapGuard();

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => steps.start(), []);
  useEffect(() => snapGuard.start(), []);

  const toggleTag = (tag) =>
    setActiveTags(
      activeTags.includes(tag)
        ? activeTags.filter((entry) => entry !== tag)
        : [...activeTags, tag]
    );

  return (
    <>
      <TopBar
        notes={library.notes}
        tags={library.tags}
        activeTags={activeTags}
        query={query}
        onQuery={setQuery}
        onTag={toggleTag}
      />
      <main>
        {library.notes.map((note, index) => (
          <NoteSection
            key={note.slug}
            note={note}
            index={index}
            palette={theme.paletteFor(index)}
            query={query}
            activeTags={activeTags}
          />
        ))}
      </main>
      <BackToTop />
    </>
  );
}
