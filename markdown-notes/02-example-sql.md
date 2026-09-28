---
category: example
---

# SQL basics

## Selecting rows

Read only the columns you need and filter early.

```sql
SELECT name, email
FROM students
WHERE enrolled_at >= '2026-09-01'
ORDER BY name;
```

#### tags
sql, example

## Counting per group

- Pick the column to group by
- Count or sum the rows in each group
- Filter the groups with `HAVING`, not `WHERE`

```sql
SELECT course, COUNT(*) AS students
FROM enrollments
GROUP BY course
HAVING COUNT(*) > 10;
```

#### tags
sql, example
