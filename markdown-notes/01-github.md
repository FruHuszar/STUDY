# Github

## Commitok törlése és restart

#### tags
git, github, parancs

Github online commitok törlése és restart. Fontos: fájlokból azért visszaolvasható, így env fájl vagy hasonló secret kikerülésének javítására nem alkalmas.

Git config átírása és saját parancs hozzáadása:

```bash
git config --global alias.restart '!git checkout --orphan temp_branch && git add . && git commit -m "version 1.0" && git branch -D main && git branch -m main && git push -f origin main'
```

Ezek után csak ki kell adni a git restart parancsot.

```bash
git restart
```
