# Identitásfogalmak

#### tags
identitas, hitelesites, engedelyezes, iam, identitastipusok

Az identitás- és hozzáférés-kezelés (IAM) alapvető koncepciói, amelyek meghatározzák az entitások azonosításának, jogosultságainak és típusainak keretrendszerét.

## Hitelesítés és Engedélyezés

#### tags
authentication, authorization, hitelesitesi-tenyezok

- **Hitelesítés (Authentication):** Az identitás igazolásának folyamata (*"Ki vagy te?"*). A bizonyítás 3 fő tényezőre épül:
  - *Valami, amit tud:* Jelszó, PIN-kód, biztonsági kérdés.
  - *Valami, ami van:* Mobileszköz, hardveres kulcs, okoskártya.
  - *Valami, ami Ön:* Biometrikus adat (ujjlenyomat, arcfelismerés).
- **Engedélyezés (Authorization):** A hozzáférési jogok meghatározása (*"Mit tehetsz?"*). Kizárólag sikeres hitelesítés után történik; kiértékeli a jogosultságokat az erőforrásokhoz, adatokhoz vagy funkciókhoz.

## Az identitásinfrastruktúra 4 pillére

#### tags
iam-pillerek, naplozas, felugyelet

| Pillér | Leírás / Szerep |
| --- | --- |
| **Hitelesítés (Authentication)** | Az identitás valódiságának megerősítése és ellenőrzése. |
| **Engedélyezés (Authorization)** | A megfelelő hozzáférési szint és jogosultságok kiosztása. |
| **Naplózás (Accounting / Auditing)** | A hozzáférések, kérések és tevékenységek rögzítése a nyomonkövethetőségért. |
| **Felügyelet (Governance)** | Az identitások életciklusának, szabályzatainak és megfelelőségének központi kezelése. |

## Identitástípusok

#### tags
emberi-identitas, eszkozidentitas, workload-identity, ai-agent

- **Emberi identitások:** Alkalmazottak, alvállalkozók, ügyfelek és partnerek bejelentkezési fiókjai.
- **Eszközidentitások:** Csatlakozó hardverek (laptopok, mobilok, IoT-eszközök), amelyek állapota és megfelelősége alapján határozható meg a megbízhatóság.
- **Számítási feladatok identitásai (Workload identities):** Szoftverek, szolgáltatások, konténerek és automatizációk identitásai az API- és adatbázis-hozzáférésekhez.
- **Ügynökidentitások (AI Agent identities):** AI-ügynökök dedikált identitásai, amelyek skálázható hitelesítést, engedélyezést és életciklus-kezelést biztosítanak a felhasználók nevében végzett műveletekhez.
