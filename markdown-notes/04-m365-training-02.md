# Microsoft 365 alapok 2

## Zero Trust és identitáskezelés

#### tags
zero-trust, security, architektura

Olyan biztonsági megközelítés, amely nem bízik meg automatikusan semmilyen belső vagy külső felhasználóban, eszközben vagy alkalmazásban. Minden hozzáférési kérést egyedileg és folyamatosan hitelesíteni és engedélyezni kell.

- **Verify explicitly:** a rendszer minden hozzáférési kérést az összes elérhető kontextuális jelzés alapján hitelesít és engedélyez. Jelzés az identitás, az eszközállapot, a helyszín és a kockázati szint.
- **Least privilege access:** a felhasználók és a rendszerek csak a feladatuk elvégzéséhez feltétlenül szükséges, minimális hozzáférést kapják meg. Eszközei az RBAC és a Just-In-Time hozzáférés, vagyis az időben korlátozott jogkiosztás.
- **Assume breach:** a működés abból indul ki, hogy a támadó már kijátszotta a védelmet, vagy a hálózaton belül van. Ezért a hangsúly a szegmentáción, a hálózati elszigetelésen, a folyamatos monitorozáson és a fenyegetések azonnali elhárításán van.

## A Zero Trust hat pillére

#### tags
zero-trust, architektura, defender

A Microsoft architektúrája hat pillérre bontja a védelmet, és mindegyikhez konkrét platformeszközt rendel.

| Pillér | Eszköz | Szerep |
| --- | --- | --- |
| Identity | Microsoft Entra ID | Központi identitás- és hozzáférés-kezelés: feltételes hozzáférés, kockázatalapú MFA, jelszómentes belépés, felhős és hibrid identitások védelme |
| Endpoints | Microsoft Intune | Eszköz- és alkalmazásfelügyelet, compliance szabályzatok, nem megfelelő eszköz esetén a hozzáférés letiltása |
| Endpoints | Defender for Endpoint | EDR megoldás: viselkedésalapú elemzés, gyanús tevékenység észlelése, az eszköz automatikus izolálása |
| Applications | Defender for Cloud Apps | CASB megoldás: Shadow IT felderítése, felhőalkalmazások felügyelete, valós idejű munkamenet-vezérlés |
| Data | Microsoft Purview | Adatosztályozás, bizalmassági címkék, titkosítás és DLP e-mailben, dokumentumban és Teams chatben |
| Infrastructure | Defender for Cloud | Számítási kapacitások és felhős infrastruktúra védelme, multicloud környezetben is, például AWS és Google Cloud erőforrásokon |
| Infrastructure | Azure Policy | Felhős erőforrások szabályozása és a konfigurációs megfelelőség kikényszerítése, például a kötelező titkosítás |
| Network | Defender for Identity és Azure hálózatbiztonság | A hálózati forgalom elemzésével észleli az oldalirányú mozgást (lateral movement) és a jogosulatlan átjárási kísérleteket |

A hálózati pillérhez tartozik a mikroszegmentáció is: a hálózat kis, egymástól elszigetelt zónákra bontása, hogy egy kompromittált gépről ne lehessen szabadon továbbmozogni.

## Zero Trust bevezetési fázisai

#### tags
zero-trust, implementation, best-practices

| Fázis | Cél | Eszközök | Kulcslépések |
| --- | --- | --- | --- |
| 1. Assess current security posture | A meglévő biztonsági állapot felmérése és a hiányosságok azonosítása | Microsoft Secure Score, Purview Compliance Manager | Számszerűsített biztonsági pontszám meghatározása, jogszabályi és szabványi megfelelőség (HIPAA, ISO 27001) feltérképezése, priorizált fejlesztési javaslatok |
| 2. Enable identity protection | Az identitás mint elsődleges védelmi vonal biztosítása | Entra ID, Entra ID Protection | Feltételes hozzáférési szabályok, kockázatalapú hitelesítés és valós idejű MFA, identity governance és access review |
| 3. Enforce endpoint compliance | Csak biztonságos és megfelelő állapotú eszköz engedélyezése | Intune, Endpoint Analytics | Compliance szabályzatok (BitLocker, OS verzió, vírusvédelem), app protection policy BYOD eszközre, eszközteljesítmény és kockázat elemzése |
| 4. Classify and protect data | Az adat automatikus azonosítása, titkosítása és szivárgásmentesítése | Purview Information Protection, Purview DLP | Bizalmassági címkék és automatikus titkosítás, DLP szabályzatok a jogosulatlan megosztás blokkolására, incidenskezelés és finomhangolás |
| 5. Monitor and respond to threats | Valós idejű fenyegetésészlelés, elszigetelés és elhárítás | Defender for Endpoint, Microsoft Sentinel, Defender for Identity | Viselkedésalapú EDR és fertőzött eszköz automatikus izolálása, felhős SIEM naplókorrelációval és playbookokkal, hibrid identitástámadások észlelése |
| 6. Educate users | Az emberi tényezőből eredő kockázat csökkentése | Defender for Office 365, Viva Learning | Adathalász szimulációk (Attack Simulation Training), rendszeres biztonsági kampányok, szerepkör-specifikus képzések |

## Microsoft Defender XDR

#### tags
defender, xdr, security

Egységesített, behatolás előtti és utáni fenyegetésvédelem az M365 ökoszisztémában. Naponta több tízbillió biztonsági jelzést korrelál, és automatizáltan vizsgálja ki és hárítja el az eseményeket.

| Komponens | Szerep | Képességek |
| --- | --- | --- |
| Defender for Office 365 | E-mail és együttműködési platformok védelme (Teams, SharePoint, OneDrive) | Adathalászat, BEC, rosszindulatú URL-ek és csatolmányok blokkolása |
| Defender for Endpoint | Végpontvédelem és EDR | Viselkedésalapú elemzés, vírusirtás, kompromittált eszköz automatikus izolálása |
| Defender for Identity | Hibrid és helyi Active Directory elleni identitástámadások észlelése | Lateral movement, Kerberos jegyvisszaélés és Pass-the-Hash támadás szűrése |
| Defender for Cloud Apps | CASB, felhős alkalmazások felügyelete | Shadow IT felderítése, adatkiáramlás megelőzése, például a személyes Dropboxba feltöltés blokkolása |
| Purview integráció | Megfelelőségi és adatbiztonsági vizsgálatok támogatása | Bizalmassági címkék automatikus alkalmazása, belső kockázatok kezelése |

A BEC (Business Email Compromise) olyan célzott csalás, amelyben a támadó egy vezető vagy partner nevében küld hitelesnek látszó, rendszerint utalásra felszólító levelet.

### Adathalászat elleni védelem

#### tags
defender, phishing, exchange

- **Spoof intelligence:** megtévesztő, a sajátra hasonlító küldő tartományok szűrése.
- **Impersonation protection:** vezetői és felhasználói megszemélyesítés elleni védelem.
- **Safe Links:** az URL-ek valós idejű átírása, majd kattintáskori újbóli vizsgálata, mert a link a kézbesítés után is válhat kártékonnyá.

### Kártevő- és spamvédelem

#### tags
defender, malware, mailflow

- **ZAP (Zero-hour Auto Purge):** már kézbesített levél utólagos, automatikus eltávolítása, ha a levél tartalma később minősül veszélyessé.
- **Attachment filtering:** a veszélyes kiterjesztések, például az `.exe` és a `.js` automatikus karanténba helyezése.
- **Kéretlenlevél-szűrés:** gépi tanuláson alapuló spamszűrés.
- **Mail flow rule:** egyedi kulcsszavas tiltás, például a "wire transfer" kifejezésre, és kapcsolatkészlet-szűrés.

### Fenyegetés-felderítés

#### tags
defender, threat-intelligence, monitoring

- **MSTIC (Microsoft Threat Intelligence Center):** globális felderítési központ. A napi jelzésmennyiségből percek alatt frissíti a globális mintázatokat, monitorozza a nemzetállami támadókat és a dark weben megjelenő kiszivárgott adatokat, valamint a végpont-telemetriából azonosítja a parancsnoki szerverekkel folytatott kommunikációt.
- **Threat Explorer:** valós idejű vizsgálati eszköz a Defender for Office 365 Plan 2 csomagban. Elemzi az élő levélforgalmat, lehetővé teszi a küldő, a tárgy, az URL és a fájl hash szerinti továbblépést, mutatja a kézbesítési státuszt, és közvetlenül törölhető vele a levél a beérkező üzenetek mappájából.
- **Threat Analytics:** szakértői fenyegetettségi jelentések a Defender XDR-ben, MITRE ATT&CK feltérképezéssel, közvetlen elhárítási és konfigurációs útmutatóval.

## Identitás

#### tags
identity, entra, alapok

Az identitás a felhasználó, az eszköz vagy a szolgáltatás digitális lenyomata: ki próbál hozzáférni a rendszerhez. Létrehozását és kezelését a Microsoft Entra ID végzi.

Az identitás részei a felhasználónév, a bejelentkezési mód, az attribútumok (munkakör, részleg) és a jogosultságok.

- **Felhőalapú (cloud-only) identitás:** teljesen az Entra ID-ban létezik, nincs helyi hálózati függősége.
- **Hibrid identitás:** helyi Active Directory-ból szinkronizált, például Microsoft Entra Connect Sync segítségével.

## Hitelesítés

#### tags
authentication, mfa, passwordless

A hitelesítés a felhasználó kilétének igazolása: hogyan bizonyítja, hogy valóban ő az.

Jelszó nélküli és megerősített bejelentkezési módok:

- **Microsoft Authenticator:** mobilalkalmazás push-értesítéssel, TOTP kóddal vagy biometrikus azonosítással.
- **FIDO2 biztonsági kulcs:** fizikai eszköz, például USB vagy NFC token, nyilvános kulcsú titkosítással.
- **Windows Hello:** biometrikus azonosítás arccal vagy ujjlenyomattal, illetve eszközhöz kötött PIN-kód.
- **Tanúsítványalapú hitelesítés (CBA):** okoskártyán vagy eszközön tárolt digitális tanúsítvány.

Kiegészítő biztonsági funkciók:

- **Többfaktoros hitelesítés (MFA):** két vagy több igazolási forma megkövetelése a fiókkompromittálódás ellen.
- **Önkiszolgáló jelszó-helyreállítás (SSPR):** a felhasználó IT-segítség nélkül állíthatja vissza a jelszavát, ami csökkenti a helpdesk terhelését.
- **Entra ID Protection:** gépi tanulással észleli a kockázatos bejelentkezéseket, és automatikus védelmi lépést indít.

## Hitelesítési módszerek hibrid környezetben

#### tags
hybrid, authentication, entra

- **PHS (Password Hash Sync):** a jelszavak kriptográfiai lenyomata szinkronizálódik a felhőbe, a hitelesítés a felhőben történik, helyi szerver bevonása nélkül. Ez a leginkább ajánlott, legrugalmasabb módszer, mert a helyi kiesés nem akadályozza a belépést.
- **PTA (Pass-through Authentication):** a jelszó nem kerül a felhőbe. Az Entra ID valós időben, egy helyi ágens segítségével a helyi Active Directoryval ellenőrizteti a jelszót.
- **Föderáció (AD FS):** a hitelesítést külső vagy helyi identitásszolgáltató végzi, amely tokent állít ki a felhő számára. Összetettebb infrastruktúrát igényel.

## Egyszeri bejelentkezés

#### tags
sso, authentication, entra

A felhasználó egyszer jelentkezik be, majd újabb jelszó-megadás nélkül éri el az összes Microsoft 365 alkalmazást és a támogatott harmadik féltől származó appokat. Az Entra ID digitális tokent, vagyis ideiglenes hozzáférési engedélyt bocsát ki, amelyet az alkalmazások ellenőriznek.

- növeli a felhasználói élményt és a termelékenységet;
- csökkenti a jelszóval kapcsolatos problémákat és az adathalász támadások kockázatát, mert kevesebb helyen kell jelszót begépelni;
- kombinálható eszközalapú hozzáféréssel, például a Windows Hello és az Intune ellenőrzésével.

## Engedélyezés

#### tags
authorization, rbac, permissions

Az engedélyezés a hitelesítés után dönti el, hogy a felhasználó mit tehet, a legkisebb jogosultság elve mentén.

- **Szerepköralapú hozzáférés-vezérlés (RBAC):** beépített vagy egyéni szerepkörökön keresztül ad adminisztratív és funkcionális jogokat, például Global Administrator vagy Exchange Administrator.
- **Csoportalapú és erőforrás-specifikus jogosultság:** nem adminisztratív felhasználóknak adott hozzáférés konkrét erőforrásokhoz, például egy SharePoint webhelyhez vagy dokumentumtárhoz, a globális szerepköröktől függetlenül.
- **Hozzáférési csomag (access package):** jogosultságok kötegelt, jóváhagyási folyamathoz kötött és időszakos kiosztása, jellemzően projektre vagy külsős munkatársra.
- **Információvédelem és bizalmassági címke:** a dokumentum szintjén korlátozza a műveleteket, például a másolást, a nyomtatást és a továbbítást.

## Felhasználók és csoportok

#### tags
users, groups, entra

A felhasználó egyéni identitás: lehet belső, külső vendég, illetve szolgáltatás- vagy rendszerfiók, saját tulajdonságokkal és jogosultságokkal. A csoportok típusa dönti el, mire használható.

| Csoporttípus | Mire való | Ad-e közös erőforrást |
| --- | --- | --- |
| Biztonsági csoport | Kizárólag erőforrás-hozzáférések kezelése | Nem |
| Microsoft 365 csoport | Együttműködés: közös postaláda, naptár, SharePoint webhely, Planner tábla, Teams munkaterület | Igen |
| Levelezésre képes biztonsági csoport | Hozzáférés-szabályozás és egyben e-mail címlista | Csak e-mail címet |
| Terjesztési csoport | Kizárólag tömeges üzenetküldés, jogosultság-kiosztásra nem használható | Csak e-mail címet |
| Dinamikus csoport | Az Entra ID attribútumai, például a részleg alapján automatikusan frissülő tagság | A választott csoporttípustól függ |

### Csoportadminisztráció

#### tags
groups, admin, automation

- **Microsoft 365 admin center:** napi, felületről végezhető feladatokhoz.
- **Microsoft Entra admin center:** összetettebb szabályokhoz, dinamikus csoportokhoz és auditáláshoz.
- **PowerShell és Graph API:** nagy léptékű automatizáláshoz és HR-rendszerekkel való integrációhoz.

A csoporttagságot az üzleti szerepkörökhöz, részlegekhez vagy projektekhez kell igazítani, mert csak így marad a hozzáférés-kezelés biztonságos és skálázható.

## Microsoft Entra IAM

#### tags
entra, iam, identity

Szolgáltatáscsomag a felhasználók, eszközök és jogosultságok kezelésére a Microsoft 365-ben, az Azure-ban és harmadik féltől származó alkalmazásokban. Elemei: Entra ID, Conditional Access, Identity Secure Score, PIM, Identity Governance, Identity Protection, Verified ID, Permissions Management, valamint Internet Access és Private Access.

### Feltételes hozzáférés

#### tags
conditional-access, entra, zero-trust

Valós idejű jelek alapján, dinamikusan bírálja el a hozzáférést a Zero Trust modell szerint. Kiértékelt jelek: a felhasználói és bejelentkezési kockázat, az eszköz megfelelőségi állapota, az alkalmazás érzékenysége, a földrajzi hely és az IP-cím, valamint a munkamenet kontextusa.

Gyakori szabályok:

- MFA megkövetelése külső hálózatból.
- Hozzáférés blokkolása nem felügyelt, vagyis Intune-ban nem regisztrált eszközről.
- Automatikus kockázatkezelés magas kockázati szintű fióknál.
- Felhasználási feltételek (terms of use) elfogadtatása.
- Vendégfelhasználók korlátozása csak adott alkalmazásokra.
- Elavult (legacy) hitelesítési protokollok blokkolása.
- Munkamenet-szintű korlátozás, például fájlletöltés vagy másolás tiltása nem felügyelt eszközön.

A szabályok hatása a What If eszközzel szimulálható éles bevezetés előtt.

### Identity Secure Score

#### tags
entra, monitoring, best-practices

Méri és nyomon követi a szervezet identitásbiztonsági állapotát az Entra ID-ban.

- **Biztonsági ajánlások:** priorizált javaslatok a kockázatok csökkentésére.
- **Fejlesztési intézkedések:** lépésről lépésre követhető megvalósítási útmutatók.
- **Állapotbeállítások:** Completed, Planned, Resolved via Third Party és Risk Accepted, vagyis az elfogadott kockázat is jelölhető.
- **Benchmark:** összehasonlítás hasonló méretű vagy azonos iparágban működő szervezetekkel.

### Privileged Identity Management

#### tags
pim, rbac, governance

Just-In-Time, vagyis időben korlátozott hozzáférést biztosít az emelt szintű adminisztratív szerepkörökhöz, és ezzel megszünteti az állandó (standing) admin jogokat.

- **Időhöz kötött aktiválás:** a jogkör csak a feladat elvégzéséhez szükséges ideig él, utána automatikusan visszavonódik.
- **MFA és indoklás:** az aktiválási kérelemhez előírható a többfaktoros azonosítás és az üzleti indoklás megadása.
- **Jóváhagyási folyamat:** az engedély megadása többlépcsős jóváhagyáshoz köthető, például csapatvezetői jóváhagyáshoz.
- **Access review:** rendszeres ellenőrzés a privilege creep, vagyis a jogosultságok észrevétlen felhalmozódásának megelőzésére.
- **Auditálás és riasztás:** minden aktiválás és művelet naplózódik az Entra admin centerben és a Sentinelben, a kritikus szerepkörök aktiválásáról valós idejű riasztás küldhető.

## Bejelentkezési hibák elhárítása

#### tags
troubleshooting, entra, authentication

Leggyakoribb okok:

- helytelenül beállított vagy nem regisztrált MFA;
- túl szigorú feltételes hozzáférési szabály;
- kockázatosnak minősített bejelentkezés;
- elcsúszott eszközóra, ami elrontja a TOTP kódok érvényességét, mert azok pontos időbélyegre épülnek;
- elavult protokoll, például POP vagy IMAP használata, amit a legacy auth tiltása blokkol.

Eszközök:

- **Entra admin center:** központi felület a naplókhoz és a beállításokhoz.
- **Sign-in logs:** minden próbálkozásról részletes információt ad, IP-címet, eszközt, alkalmazott szabályzatot és hibaokot.
- **What If:** feltételes hozzáférési szabályok tesztelése éles bejelentkezés nélkül.

## Audit naplók

#### tags
audit, monitoring, purview

Céljuk a láthatóság biztosítása, az incidensek felderítése, a megfelelőség igazolása és a jogosultsági változások nyomon követése. Elérésük a Purview portálon vagy PowerShellből történik, `Audit Logs` vagy `View-Only Audit Logs` szerepkörrel.

- Jogosulatlan SharePoint fájlhozzáférés és letöltés detektálása.
- Adminisztrátori szerepkör-változások figyelése, például egy új Global Admin hozzáadása.
- Teams és fiókbeállítások módosításainak követése.

Haladó használat: integráció SIEM rendszerrel, például a Microsoft Sentinellel vagy a Splunkkal, és a lekérdezések automatizálása PowerShellel.

## Alkalmazás-regisztrációk és vállalati alkalmazások

#### tags
entra, apps, permissions

- **App registration:** az alkalmazás identitását, hitelesítését, a kért jogosultságokat és az azonosítási kulcsokat (client secret vagy tanúsítvány) határozza meg.
- **Enterprise application:** az alkalmazás konkrét példánya, vagyis a service principal a saját szervezetben.

Biztonsági szempontok:

- a legkisebb elégséges jogosultság elvének betartása;
- a felhasználói hozzájárulások (user consent) korlátozása és rendszeres felülvizsgálata, mert egy jóhiszemű engedélyezés is széles körű adathozzáférést adhat egy külső appnak;
- SSO és MFA kikényszerítése a külső és a saját fejlesztésű alkalmazásoknál is.

## Kulcsfogalmak

#### tags
osszefoglalo, zero-trust, identity

| Fogalom | Meghatározás |
| --- | --- |
| Zero Trust | Verify explicitly, least privilege, assume breach |
| Just-In-Time | Csak a feladat idejére aktivált, automatikusan lejáró jogosultság |
| EDR | Endpoint Detection and Response: végponti észlelés és válaszadás |
| XDR | Extended Detection and Response: több forrás jelzéseit korreláló, egységes védelem |
| CASB | Cloud Access Security Broker: a felhőalkalmazások használatát felügyelő réteg |
| SIEM | Naplógyűjtő és korreláló biztonsági elemzőrendszer, például a Microsoft Sentinel |
| Shadow IT | A szervezet tudta nélkül használt, nem jóváhagyott alkalmazások |
| BEC | Business Email Compromise: vezetőt vagy partnert megszemélyesítő célzott csalás |
| Lateral movement | A támadó oldalirányú továbbmozgása a hálózaton belül az első kompromittált géptől |
| Mikroszegmentáció | A hálózat kis, elszigetelt zónákra bontása a mozgástér korlátozására |
| ZAP | Zero-hour Auto Purge: már kézbesített levél utólagos automatikus eltávolítása |
| Safe Links | URL-ek átírása és kattintáskori újbóli ellenőrzése |
| Spoof intelligence | Megtévesztő küldő tartományok szűrése |
| FIDO2 | Nyilvános kulcsú titkosításra épülő, fizikai biztonsági kulcs |
| CBA | Tanúsítványalapú hitelesítés okoskártyával vagy eszközön tárolt tanúsítvánnyal |
| SSPR | Önkiszolgáló jelszó-helyreállítás |
| PHS | Password Hash Sync: jelszólenyomat szinkronizálása a felhőbe |
| PTA | Pass-through Authentication: helyi ágens ellenőrzi a jelszót valós időben |
| AD FS | Föderációs identitásszolgáltató, amely tokent állít ki a felhő számára |
| PIM | Privileged Identity Management: időben korlátozott admin jogosultság |
| Access package | Kötegelt, jóváhagyáshoz és lejárathoz kötött jogosultság-kiosztás |
| Service principal | Az alkalmazás identitása és példánya a saját tenantban |
| Secure Score | Számszerűsített biztonsági pontszám a védelmi állapot méréséhez |
