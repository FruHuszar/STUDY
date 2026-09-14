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

## Identitásszolgáltató (IdP) és Modern Hitelesítés

#### tags
idp, sso, oidc, oauth2, saml, biztonsagi-token

A modern hitelesítés során a hitelesítési és engedélyezési feladatokat a különálló alkalmazások helyett egy központosított **identitásszolgáltató (IdP)** látja el.

## Az Identitásszolgáltató (IdP) szerepe és előnyei

#### tags
idp, kozponti-hitelesites, biztonsag

Az alkalmazások a fiókkezelést és a biztonsági szabályzatok kikényszerítését delegálják az IdP felé. Sikeres bejelentkezés után az IdP egy megbízható **biztonsági jogkivonatot (token)** ad ki.

- **Központosított szabályzatok:** Egyetlen helyen állítható be az MFA és a jelszókövetelmény az összes alkalmazásra.
- **Központi életciklus-kezelés:** A fiók tiltásával az összes csatlakoztatott rendszerehez való hozzáférés azonnal megszűnik.
- **Láthatóság:** A teljes környezet bejelentkezési tevékenységei és gyanús mintái egy helyen monitorozhatók.

## Biztonsági jogkivonatok (Tokens) és Jogcímek (Claims)

#### tags
token, claims, id-token, access-token

A token egy strukturált adatcsomag, amellyel az IdP igazolja az identitást. Az ebben lévő adategységeket **jogcímeknek (claims)** nevezzük (pl. azonosító, e-mail, szerepkörök, lejárat).

| Tokentípus | Célja / Szerepe |
| --- | --- |
| **Azonosító jogkivonat (ID Token)** | Igazolja, hogy a bejelentkezés megtörtént (Hitelesítés). Tartalmazza a felhasználó adatait. |
| **Hozzáférési jogkivonat (Access Token)** | Felhatalmazást ad egy adott erőforrás/API elérésére a felhasználó nevében (Engedélyezés). |

*Megjegyzés:* A tokenek időkorlátosak a visszaélések kockázatának csökkentése érdekében.

## Hitelesítési protokollok

#### tags
oidc, oauth2, saml, protokollok

Ipari szabványok, amelyek meghatározzák a tokenek formátumát és cseréjét az IdP és az alkalmazások között.

- **OpenID Connect (OIDC):** Modern felhő- és mobilalkalmazások **hitelesítési** protokollja (az OAuth 2.0-ra épül).
- **OAuth 2.0:** Erőforrás-hozzáférést biztosító **engedélyezési** keretrendszer.
- **SAML (Security Assertion Markup Language):** Vállalati és helyszíni (on-premise) rendszereknél, illetve összevonási (federation) forgatókönyveknél használt XML-alapú szabvány.

## Egyszeri bejelentkezés (SSO)

#### tags
sso, entra-id, hatekonysag

Az SSO lehetővé teszi, hogy a felhasználó egyetlen bejelentkezéssel az összes megbízható alkalmazáshoz hozzáférjen, újabb hitelesítő adatok megadása nélkül.

- **Felhasználói élmény:** Nem kell külön jelszavakat megjegyezni.
- **Biztonság:** Kevesebb bejelentkezési kérés, alacsonyabb adathalászati kockázat.
- **Példa:** A Microsoft Entra ID felhőalapú IdP-ként több ezer külső alkalmazásban (pl. GitHub, Google, Amazon) támogatja az SSO-t.

## Címtárszolgáltatások, Active Directory és Microsoft Entra ID

#### tags
cimtarszolgaltatas, active-directory, ad-ds, entra-id, hibrid-identitas

A hálózati entitások (felhasználók, eszközök, csoportok, szabályzatok) adatinak strukturált tárolására, hitelesítésére és engedélyezésére szolgáló központi rendszerek.

## Címtárszolgáltatások és Active Directory Domain Services (AD DS)

#### tags
ad-ds, domain-controller, kerberos, gpo

Az **Active Directory Domain Services (AD DS)** a Microsoft helyszíni (on-premise), tartományalapú hálózatokhoz tervezett címtárszolgáltatása. Az AD DS-t futtató szerver a **tartományvezérlő (Domain Controller - DC)**.

- **Főbb képességei:**
  - *Egységes identitás:* Egyetlen fiókkal érhetők el a helyszíni rendszerek.
  - *Csoportházirendek (GPO):* Központi eszköz- és rendszerkonfiguráció-szabályozás.
  - *Hagyományos protokollok:* Bejelentkezések kezelése Kerberos és NTLM protokollokkal.
  - *Szervezeti egységek (OU):* Hálózati objektumok hierarchikus felépítése a könnyebb adminisztrációért.

## AD DS korlátai a modern környezetben vs. Microsoft Entra ID

#### tags
entra-id, idaas, hibrid-identitas, felho, oauth2

A helyszíni AD DS korlátaira válaszul jött létre a felhőalapú **Microsoft Entra ID** (IDaaS – Identity as a Service).

| Szempont | AD DS (Helyszíni) | Microsoft Entra ID (Felhő) |
| --- | --- | --- |
| **Környezet** | Helyszíni vállalati hálózatokhoz | Felhő- és internetalapú infrastruktúrához |
| **Ezközkezelés** | Elsődlegesen Windows-eszközök | Platformfüggetlen (iOS, Android, macOS, Windows) |
| **Támogatott protokollok** | Kerberos, NTLM | Modern szabványok: OAuth 2.0, OpenID Connect, SAML |
| **SaaS és Felhőalkalmazások** | Csak plusz eszközökkel / szinkronizációval | Natív felhő- és SaaS-integráció |
| **Távelérés** | VPN-kapcsolatot igényel | VPN nélkül, közvetlenül az interneten át elérhető |

## Hibrid identitás

#### tags
hibrid-identitas, szinkronizacio, entra-id

Azon architektúra, amely összekapcsolja a helyszíni AD DS-t és a felhőalapú Microsoft Entra ID-t az identitások szinkronizálásával. Lehetővé teszi, hogy a felhasználók ugyanazokkal a hitelesítő adatokkal érjék el a helyszíni és a felhőbeli erőforrásokat.
