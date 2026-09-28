import InstallButton from "./InstallButton.jsx";
import CategoryDot from "./CategoryDot.jsx";

export default function TopBar({
  notes,
  categories,
  activeCategory,
  onCategory,
  tags,
  activeTags,
  onTag,
  query,
  onQuery,
  colorFor,
  account
}) {
  return (
    <header>
      <input
        type="search"
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
            document.querySelector("main section")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        placeholder="Search every note"
        aria-label="Search every note"
      />
      {categories.length > 0 && (
        <ul className="categories" aria-label="Categories">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                type="button"
                aria-pressed={activeCategory === category.name}
                title={`${category.count} ${category.count === 1 ? "note" : "notes"}`}
                onClick={() => onCategory(category.name)}
              >
                <CategoryDot color={category.color} />
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <nav>
        <ul>
          {notes.map((note) => (
            <li key={note.slug}>
              <a href={`#${note.slug}`}>
                {note.category && <CategoryDot color={colorFor(note.category)} />}
                {note.title}
              </a>
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
      <div className="account">
        {account}
        <InstallButton />
      </div>
    </header>
  );
}
