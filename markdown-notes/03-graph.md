# Microsoft Graph

## Graph Explorer hibakódok

#### tags
m365, graph, hibakód, rest, http

| Kód | Jelentés |
| --- | --- |
| 400 Bad Request | Hibás a kérés szintaxisa, például elgépelt `$filter` vagy rossz JSON body. |
| 401 Unauthorized | Nincs érvényes bejelentkezés, vagy hiányzik, illetve lejárt az access token. |
| 403 Forbidden | A bejelentkezés érvényes, de a művelethez nincs jogosultság: hiányzik a szükséges permission (`-Scopes`). |
| 404 Not Found | Nincs ilyen végpont, vagy nincs ilyen azonosítójú objektum. |
| 429 Too Many Requests | Throttling: rövid idő alatt túl sok kérés érkezett. A várakozási időt a `Retry-After` fejléc adja meg. |

A 401 és a 403 közti különbség a legfontosabb: a 401 **hitelesítési** (ki a hívó?), a 403 **jogosultsági** (mit szabad?) hiba. 401 esetén újra be kell jelentkezni, 403 esetén több scope-ot kell kérni.

403 Forbidden esetén a válasz JSON szerkezete így néz ki. Ez akkor érkezik, ha a bejelentkezett fióknak vagy a használt tokennek nincs meg a joga az adott végpont olvasásához vagy módosításához.

```json
{
  "error": {
    "code": "Authorization_RequestDenied",
    "message": "Insufficient privileges to complete the operation."
  }
}
```

Graph Explorerben a **Modify permissions** fülön lehet a hiányzó jogot bepipálni és elfogadtatni (consent). Céges tenantban egyes jogokhoz admin jóváhagyás (Admin Consent) szükséges.

## $select / $filter / $top

#### tags
graph, query, m365, rest, odata

| Paraméter | Mit csinál |
| --- | --- |
| `$select` | Csak a felsorolt mezőket kéri le: kevesebb adat mozog, gyorsabb a válasz. |
| `$filter` | Szűrés megadott feltétel alapján, például `$filter=accountEnabled eq true`. |
| `$top` | Darabszám-limit, például az első 10 elem lekérése. |
| `$orderby` | Rendezés egy mező szerint, például `$orderby=displayName`. |
| `$expand` | Kapcsolódó objektum beágyazása a válaszba, például `$expand=manager`. |
| `$count` | Találatok darabszáma; szűrt lekérdezésnél a `ConsistencyLevel: eventual` fejléc is szükséges hozzá. |

Mindegyik OData query string paraméter. A sor az URL végén kérdőjellel (`?`) kezdődik, a további feltételek pedig `&` jellel fűződnek hozzá. A `$` jel a paraméter nevének része, nem PowerShell-változó.

```bash
GET https://graph.microsoft.com/v1.0/users?$select=displayName,mail&$filter=accountEnabled eq true&$top=10&$orderby=displayName
```

PowerShellben a `$` miatt az ilyen URI-t aposztróf közé kell tenni, vagy backtickkel escape-elni, különben a pwsh változóként próbálja feloldani.

```powershell
Invoke-MgGraphRequest -Method GET -Uri 'https://graph.microsoft.com/v1.0/users?$select=displayName,mail&$top=5'
```

## /me vs /users

#### tags
graph, jogosultság, m365, json

- `/me` a bejelentkezett fiók saját adatai. Csak felhasználó nevében futó (delegált) hívásnál működik, alkalmazás-tokennel nem, mert ott nincs "én".
- `/users` a teljes szervezet, vagyis a tenant összes felhasználója. Ehhez címtár-jogosultság szükséges: `User.Read.All` olvasáshoz, `User.ReadWrite.All` íráshoz.

Lista jellegű lekérdezéseknél a JSON válasz az elemeket mindig a `value` kulcs alatt, tömbben adja vissza. Egyetlen objektumot visszaadó lekérdezésnél, például a `/me` esetén nincs `value`, ott közvetlenül az objektum mezői érkeznek vissza.

```json
{
  "value": [
    { "id": "1", "displayName": "Kovács Éva" },
    { "id": "2", "displayName": "Nagy Péter" }
  ]
}
```

Sok találat esetén a Graph lapoz: a válasz végén megjelenik az `@odata.nextLink` kulcs, ami a következő oldal URL-je. Amíg van `nextLink`, addig van még adat.

## OData

#### tags
graph, odata, rest, alapok

Az OData (Open Data Protocol) egy nemzetközi szabvány a REST API-k felépítésére, és a Microsoft Graph is erre épül. Ez írja le, hogyan néznek ki a lekérdezési paraméterek (`$select`, `$filter`, `$top`), és hogyan hivatkoznak egymásra az erőforrások.

Két objektum összekötéséhez azért nem elég egy név vagy egy e-mail-cím:

- **Egyediség:** a név megváltozhat, például házasság után, az e-mail-cím is frissülhet. Minden objektumnak egyetlen állandó azonosítója van, az `Id` (GUID).
- **Referencia:** a kapcsolat nem szöveges adattag, hanem mutató a címtár egy másik objektumára. Az OData szabvány szerint a hivatkozás berögzítésekor a célobjektum teljes URI-ját kell megadni, hogy egyértelmű legyen, melyik gyűjtemény (`/users`) melyik elemére mutat.

## Szervezeti hierarchia és referenciák

#### tags
graph, m365, hierarchia, manager

A Graphban a felettes-beosztott viszony (manager) nem sima szöveges mező, hanem **referencia-kapcsolat** (directory object reference) két user objektum között. Ezért a főnök neve nem adható meg sztringként: az API a menedzser egyedi OData URI azonosítóját várja.

```plaintext
https://graph.microsoft.com/v1.0/users/{manager-id}
```

A kapcsolat a `$ref` végponton keresztül kezelhető: `PUT` a beállításához, `DELETE` a megszüntetéséhez, `GET` a lekérdezéséhez.

```bash
GET https://graph.microsoft.com/v1.0/users/{id}/manager
PUT https://graph.microsoft.com/v1.0/users/{id}/manager/$ref
GET https://graph.microsoft.com/v1.0/users/{id}/directReports
```

## API

#### tags
api, rest, alapok, http

Az API (Application Programming Interface) egy szerződés, ami leírja, milyen kéréseket lehet küldeni egy rendszernek, és cserébe milyen válasz érkezik rájuk. Nem UI, nem kell hozzá böngésző-kattintgatás: ez gép-gép közötti kommunikáció.

A REST API olyan API-fajta, ami HTTP-t használ. A végpont (endpoint) az URL, vagyis az erőforrás, amin a művelet történik, a metódus pedig azt mondja meg, mi történik vele.

| Metódus | Mit csinál |
| --- | --- |
| GET | Adat olvasása |
| POST | Új erőforrás létrehozása |
| PATCH | Meglévő erőforrás részleges módosítása |
| PUT | Meglévő erőforrás teljes felülírása |
| DELETE | Erőforrás törlése |

```bash
GET    https://graph.microsoft.com/v1.0/me/messages
POST   https://graph.microsoft.com/v1.0/users
PATCH  https://graph.microsoft.com/v1.0/users/{id}
DELETE https://graph.microsoft.com/v1.0/users/{id}
```

A Graphnak két verziója él egymás mellett: a `v1.0` a stabil, éles használatra szánt, a `beta` pedig a kísérleti, ami bármikor változhat. Éles kódban mindig a `v1.0` használandó.
