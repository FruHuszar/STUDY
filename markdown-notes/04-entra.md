# Microsoft Entra

#### tags
microsoft-entra, entra-id, entra-suite, licenceles, iam-architektura

A Microsoft Entra egy átfogó identitás- és hálózati hozzáférési termékcsalád, amely a Zero Trust elvekre épülve biztosítja a hozzáférést emberek, eszközök, alkalmazások és AI-ügynökök számára.

## A Microsoft Entra termékcsalád felépítése

#### tags
entra-termekek, ztna, zero-trust, identity-governance

A termékek a védett hozzáférési forgatókönyvek köré csoportosulnak:

- **Zero Trust alapok:**
  - **Microsoft Entra ID:** A család alapját képező felhőalapú IAM-szolgáltatás (SSO, szabályzatok, védelem).
  - **Microsoft Entra Domain Services:** Felügyelt tartományi szolgáltatás hagyományos (AD DS-t igénylő) alkalmazásokhoz a felhőben.
- **Munkavállalói hozzáférés-védelem:**
  - **Microsoft Entra Private Access:** Biztonságos hozzáférés belső/privát erőforrásokhoz VPN nélkül.
  - **Microsoft Entra Internet Access:** Biztonságos internet- és SaaS-hozzáférés (pl. webes tartalomszűrés).
  - **Microsoft Entra ID Governance:** Automatikus identitás-életciklus és jogosultság-kezelés.
  - **Microsoft Entra ID Protection:** Kockázatalapú fenyegetésészlelés és automatikus válaszintézkedések (pl. kockázatos bejelentkezéskor MFA kikényszerítése).
  - **Microsoft Entra Verified ID:** Decentralizált identitási (DID) szabványra épülő digitális igazolvány-kezelés.
- **Külső partnerek és ügyfelek:**
  - **Microsoft Entra External ID:** B2B együttműködés és ügyfél-identitáskezelés (CIAM) önkiszolgáló regisztrációval vagy közösségi fiókokkal.
- **Felhős számítási feladatok és AI:**
  - **Microsoft Entra Workload ID:** Alkalmazások, szolgáltatások és konténerek identitáskezelése.
  - **Microsoft Entra Agent ID:** Dedikált keretrendszer az AI-ügynökök biztonságos azonosítására és szabályozására.

## Licencelési opciók és Felügyelet

#### tags
licenceles, entra-suite, entra-admin-center

A teljes termékcsalád egyetlen felületről, a **Microsoft Entra felügyeleti központból** (Entra Admin Center) kezelhető, és a Security Copilot AI-támogatásával is kiegészíthető.

| Licenc szint | Tartalom és főbb képességek |
| --- | --- |
| **Ingyenes (Free)** | Alapvető IAM, felhasználó- és csoportkezelés, önkiszolgáló jelszó-visszaállítás (MS 365 / Azure része). |
| **Microsoft Entra ID P1** | Feltételes hozzáférés (Conditional Access), hibrid identitás, fejlett csoportkezelés. |
| **Microsoft Entra ID P2** | P1 funkciók + Kockázatalapú feltételes hozzáférés, ID Protection, Privileged Identity Management (PIM). |
| **Microsoft Entra Suite** | Átfogó csomag (P1 szükséges hozzá): Private & Internet Access, ID Governance, ID Protection és Verified ID egyben. |

## Identitástípusok, Objektumok és AI-ügynökök

#### tags
entra-id, identitastipusok, managed-identity, ai-agent-id, berlet-alapok

A Microsoft Entra ID felhőalapú identitásszolgáltatásként az entitások és erőforrások központi azonosítását és hozzáférés-vezérlését látja el.

## Alapfogalmak és Bérlői struktúra

#### tags
tenant, directory, multi-tenant, identity-secure-score

- **Bérlő (Tenant):** A Microsoft Entra ID egy izolált példánya, amely egy szervezet adatait, objektumait és biztonsági határait tartalmazza (egyedi azonosítóval és pl. `*.onmicrosoft.com` tartománnyal).
- **Címtár (Directory):** A bérlőn belüli adatbázis/katalógus, amely a felhasználókat, csoportokat, alkalmazásokat és eszközöket tárolja.
- **Több-bérlős (Multi-tenant):** Olyan felépítés, ahol egy szervezet leányvállalatok vagy jogi előírások miatt több független bérlőt üzemeltet.
- **Identitásbiztonsági pontszám (Identity Secure Score):** Százalékos mutató, amely a szervezet biztonsági beállításainak szintjét méri a Microsoft ajánlásaihoz képest.

## Támogatott identitástípusok

#### tags
felhasznalok, workload-identity, eszkozok, csoportok

### 1. Felhasználói identitások
Az emberi felhasználókat képviselik a hitelesítés módja és a bérlői viszony (UserType) alapján:
- **Belső tag (Internal Member):** A szervezet saját alkalmazottja belső hitelesítéssel.
- **Külső vendég (External Guest):** Külső identitással (pl. B2B, közösségi fiók) hitelesítő partner vagy tanácsadó, korlátozott jogosultságokkal.
- **Külső tag (External Member):** Több-bérlős szervezeteknél külső fiókkal hitelesítő, de tagszintű jogokkal rendelkező felhasználó.
- **Belső vendég (Internal Guest):** Belső fiókkal rendelkező, de vendég statuszra állított külső partner (örökölt modell).

### 2. Számítási feladatok identitásai (Workload Identities)
- **Alkalmazások és szolgáltatásnevek (Service Principals):** Az alkalmazás regisztrációja után létrejövő identitás, amely lehetővé teszi a szoftverek hitelesítését.
- **Felügyelt identitások (Managed Identities):** Automatikus hitelesítőadat-kezelést biztosító szolgáltatási fiókok az Azure-erőforrásokhoz:
  - *Rendszer által hozzárendelt:* Közvetlenül az Azure-erőforráshoz kötött; az erőforrás törlésével az identitás is törlődik.
  - *Felhasználó által hozzárendelt:* Önáló Azure-erőforrásként hozható létre, és több szolgáltatás-példányhoz is hozzárendelhető.

### 3. Eszközidentitások
- **Entra regisztrált eszközök:** BYOD (saját eszköz) forgatókönyvekre személyes mobileszközökhöz.
- **Entra csatlakoztatott eszközök:** Szervezeti tulajdonú eszközök felhős bejelentkezéshez.
- **Entra hibrid csatlakoztatott eszközök:** Helyszíni AD-hoz és Entra ID-hoz egyaránt csatlakozó eszközök.

### 4. Csoportok
- **Biztonsági csoportok:** Hozzáférések, szabályzatok kezelésére (tagjai lehetnek felhasználók, eszközök, szolgáltatásnevek, ügynökök).
- **Microsoft 365 csoportok:** Együttműködésre (megosztott postaláda, naptár, SharePoint).
- *Tagsági típusok:* Manuálisan hozzárendelt vagy szabályalapú **dinamikus tagság**.

## AI-ügynökök identitásai (Microsoft Entra Agent ID)

#### tags
ai-agent, agent-id, blueprint, participated-unattended

Az AI-ügynökök autonóm működésük és dinamikus döntéshozataluk miatt sajátos kockázatokat hordoznak (pl. jogosultság-túllépés, prompt-injekció, ügynök-burjánzás).

- **Szerkezeti felépítés:**
  - **Ügynökidentitás-terv (Blueprint):** Újrafelhasználható sablon/osztály, amely meghatározza az ügynök típusát, besorolását és az alkalmazandó szabályzatokat.
  - **Ügynökidentitás:** Egyedi példány kijelölt felelőssel (szponzorral). Saját hitelesítő adatok helyett a tervrajzra támaszkodik a tokenek beszerzéséhez.
- **Hitelesítési módok:**
  - *Részt vett (Attended):* Az ügynök egy emberi felhasználó nevében, delegált engedélyekkel jár el.
  - *Felügyelet nélküli (Unattended):* Az ügynök önállóan, saját hozzárendelt szerepköreivel működik.

## Hibrid Identitás és Külső Identitások (Microsoft Entra)

#### tags
hibrid-identitas, entra-cloud-sync, scim, entra-external-id, b2b-egyuttmukodes, ciam

A helyszíni és felhőbeli erőforrások összekapcsolásának, valamint a vállalati partnerekkel és ügyfelekkel való külső együttműködés megvalósításának keretrendszere.

## Hibrid Identitás

#### tags
hibrid-identitas, cloud-sync, ad-ds, scim

A hibrid identitás egy közös identitást biztosít a felhasználók számára, függetlenül attól, hogy az alkalmazások a helyszínen (Active Directory) vagy a felhőben (Microsoft Entra ID) futnak.

- **Megvalósítás:** Kiépítés (provisioning) és szinkronizálás útján jön létre.
- **Microsoft Entra Cloud Sync:** Az ajánlott, felhőből felügyelt szinkronizálási eszköz.
  - Egyszerűsített, pehelykönnyű helyszíni ügynököt használ.
  - Magas rendelkezésre állást és leválasztott, többerdős (multi-forest) Active Directory környezeteket is támogat.
  - Leváltja a korábbi, komplexebb helyszíni **Microsoft Entra Connect Sync** eszközt.
- **SCIM szabvány:** A Cloud Sync a *System for Cross-domain Identity Management* (SCIM) iparági szabványt használja a felhasználók és csoportok automatikus kiépítésére és megszüntetésére.

## Microsoft Entra Külső ID (External ID)

#### tags
external-id, b2b, b2b-direct-connect, ciam, berlet-konfiguracio

Lehetővé teszi, hogy külső identitások (külső partnerek, ügyfelek, fogyasztók) saját meglévő fiókjaikkal (pl. vállalati AD, Google, Facebook) érjék el a belső vagy felhős alkalmazásokat.

### Bérlői (Tenant) konfigurációk
- **Munkaerő bérlő (Workforce tenant):** Saját alkalmazottak, belső üzleti alkalmazások és meghívott B2B üzleti vendégek számára.
- **Külső bérlő (External tenant):** Kizárólag külső ügyfeleknek/fogyasztóknak szánt alkalmazások közzétételére.

### Külső együttműködési forgatókönyvek

| Forgatókönyv | Megközelítés / Működés | Címtárobjektum |
| --- | --- | --- |
| **B2B Együttműködés (B2B Collaboration)** | Vállalati vendégek meghívása saját meglévő hitelesítő adataikkal az SaaS, Office 365 és üzletági appokhoz. | Létrejön egy **Vendég (Guest)** objektum a helyi bérlőben. |
| **Közvetlen B2B-kapcsolat (B2B Direct Connect)** | Kölcsönös megbízhatóság két Entra bérlő között. Elsősorban a **Teams Connect** megosztott csatornáknál használatos. | **NEM jön létre vendégobjektum**; a felhasználók közvetlenül a saját bérlőjükből érnek el erőforrásokat. |
| **Ügyfél-identitáskezelés (CIAM)** | Fogyasztói és ügyfélappok védelme önkiszolgáló regisztrációval, SSO-val és közösségi/vállalati identitások támogatásával. | A külső bérlőben kezelt ügyfélfiókok. |

## Hitelesítés

#### tags
entra-id, hitelesites, mfa, sspr, jelszovedelem, passkey, homalyositas, number-matching

A Microsoft Entra ID átfogó hitelesítési, jelszókezelési és védelemi funkciói, amelyek a biztonság növelését és a felhasználói élmény javítását szolgálják.

## Hitelesítési módszerek és Jelszómentes (Passwordless) megoldások

#### tags
fido2, passkey, microsoft-authenticator, passkey, certificate-based, homalyositas

A Microsoft Entra ID több rugalmas és biztonságos hitelesítési opciót támogat a Zero Trust elvek mentén:

- **Jelszómentes hitelesítés (Passwordless):** A legbiztonságosabb hitelesítési szint, amely kiküszöböli a jelszóalapú támadásokat (phishing, credential stuffing).
  - **FIDO2 / Passkeys:** Szabványos hardveres biztonsági kulcsok vagy eszköztámogatott jelkulcsok.
  - **Microsoft Authenticator:** Mobilalkalmazásos push-értesítés számillesztéssel (number matching), biometrikus azonosítással és kontextuális információkkal (pl. alkalmazásnév, földrajzi helyzet).
  - **Windows Hello for Business:** Biometrikus (arc/ujjlenyomat) vagy PIN-kódos azonosítás az eszközbe épített TPM chipalapon.
- **Tanúsítványalapú hitelesítés (CBA):** Lehetővé teszi a felhasználók számára, hogy PKI tanúsítvánnyal azonosítsák magukat (X.509).
- **Hagyományos és másodlagos módszerek:** SMS, hanghívás, OATH TOTP hardveres/szoftveres tokenek és jelszavak.
- **Adatvédelem és Homályosítás (Masking / Obfuscation):** A hitelesítési folyamatok során használt érzékeny azonosítók (például a felhasználó telefonszáma vagy e-mail címe) részleges elrejtése/homályosítása az illetéktelen adatgyűjtés és a szociális mérnökség (social engineering) megelőzésére.

## Többtényezős Hitelesítés (MFA)

#### tags
mfa, conditional-access, identity-protection

A többtényezős hitelesítés (Multi-Factor Authentication) legalább két független tényezőt igényel a bejelentkezéshez:

1. **Valami, amit tud:** Jelszó vagy PIN-kód.
2. **Valami, amivel rendelkezik:** Telefon, biztonsági kulcs (FIDO2) vagy regisztrált eszköz.
3. **Valami, ami ő maga:** Biometrikus azonosító (ujjlenyomat, arcfelismerés).

- **Feltételes hozzáférés (Conditional Access):** Az MFA kényszerítése környezeti szignálok alapján történik (pl. helyszín, eszköz állapota, felhasználói/bejelentkezési kockázati szint).
- **Számillesztés és kontextus:** A fáradtsági támadások (MFA fatigue) ellen számillesztéses és helyalapú védelmi funkciók támogatják a jóváhagyást.

## Önkiszolgáló Jelszó-visszaállítás (SSPR)

#### tags
sspr, password-reset, writeback

Az SSPR (Self-Service Password Reset) lehetővé teszi a felhasználók számára, hogy IT-rendszergazdai segítség nélkül módosítsák vagy visszaállítsák elfelejtött jelszavaikat.

- **Működés:** A felhasználó a regisztrált hitelesítési módszerekkel (pl. Authenticator app, SMS, másodlagos e-mail) igazolja identitását.
- **Jelszó-visszaírás (Password Writeback):** Hibrid környezetben az SSPR segítségével a felhőben módosított jelszó azonnal visszaszinkronizálódik a helyszíni Active Directoryba (AD DS).

## Jelszóvédelmi és Felügyeleti Képességek

#### tags
password-protection, banned-passwords, smart-lockout

A gyenge vagy kiszivárgott jelszavak használatának megakadályozására szolgáló védelmi vonalak:

- **Microsoft Entra Password Protection:**
  - **Globális tiltólista:** A Microsoft által automatikusan frissített, gyakran használt és gyenge jelszavak szűrése.
  - **Egyéni tiltólista:** A szervezet saját specifikus szavait (pl. cégnév, helyi kifejezések, sportcsapatok) tartalmazó tiltólista.
  - **Helyszíni AD integráció:** Ügynök segítségével a helyszíni Active Directoryban is kikényszeríthető ugyanez a tiltólista.
- **Okos zárolás (Smart Lockout):** Megvédi a fiókokat a jelszószótár-alapú (brute-force) támadásoktól anélkül, hogy a jogos felhasználót kizárná (különbséget tesz az érvényes és a támadó által használt IP-címek/helyszínek között).


