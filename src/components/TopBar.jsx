import InstallButton from "./InstallButton.jsx";

export default function TopBar({ notes, tags, activeTags, query, onQuery, onTag }) {
  return (
    <header>
      <input
        type="search"
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder="Search every note"
        aria-label="Search every note"
      />
      <nav>
        <ul>
          {notes.map((note) => (
            <li key={note.slug}>
              <a href={`#${note.slug}`}>{note.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="tags">
        {tags.map((tag) => (
          <li key={tag}>
            <button
              type="button"
              aria-pressed={activeTags.includes(tag)}
              onClick={() => onTag(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <InstallButton />
    </header>
  );
}
