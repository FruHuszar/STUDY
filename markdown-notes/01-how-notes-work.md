---
category: guide
---

# How notes work

## Chapters come from headings

Every `##` heading starts a chapter, and every `###` heading starts a smaller one inside it. The `#` heading at the very top is the note's title.

#### tags
guide, markdown

### Tagging a chapter

Put a `#### tags` line under a chapter heading, then list the tags on the next line, separated by commas. A small chapter inherits the tags of the big chapter above it.

```markdown
## Joins

#### tags
sql, school
```

### Picking a category

Each note has one category, shown as a colored dot. In the editor you type it and pick its color. In a Markdown file you set it at the very top:

```markdown
---
category: school
---
```

## What Markdown turns into

| You write | You get |
| --- | --- |
| A list | Numbered steps |
| A code block | Highlighted code with a copy-friendly layout |
| `> A quote` | A pull quote |
| A table | A table like this one |

#### tags
guide, markdown
