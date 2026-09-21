# Microsoft 365 alapok 1

## Mi az a Microsoft 365?

#### tags
m365, saas, cloud, alapok

Előfizetés-alapú, felhőben futó szolgáltatáscsomag. Egy platformon hozza össze a produktivitási alkalmazásokat, az együttműködési eszközöket, az identitáskezelést, a biztonsági megoldásokat, az eszközmenedzsmentet és a megfelelőségi funkciókat.

Három dolog tér el a dobozos szoftvertől:

- **Az adat helye.** Microsoft adatközpontokban fut és tárolódik, nem a felhasználó gépén vagy a cég szerverszobájában. A szervezetnek nem kell Exchange szervert üzemeltetnie, patchelnie, mentenie.
- **A frissítés módja.** Nincs több évente egy nagy verzióváltás, a szolgáltatás folyamatosan frissül. Ez az evergreen modell.
- **A fizetés módja.** Felhasználónkénti havi vagy éves előfizetés egyszeri licencdíj helyett. CAPEX helyett OPEX: nem beruházás, hanem működési költség.

A szervezet a szolgáltatást egy tenantban kapja meg. A tenant a szervezet izolált példánya a Microsoft felhőjében: itt élnek a felhasználók, a csoportok, a postafiókok, a SharePoint oldalak és a beállítások. Két cég tenantja logikailag teljesen elkülönül egymástól, akkor is, ha fizikailag ugyanabban az adatközpontban van. A tenant kezdeti domainje `cegnev.onmicrosoft.com`, amely mellé saját domain is regisztrálható.

## Office 365, Microsoft 365, Windows 365

#### tags
m365, alapok, licensing

| Név | Mit takar |
| --- | --- |
| Office 365 | A produktivitási és együttműködési szolgáltatások: Exchange Online, SharePoint, OneDrive, Teams, Office alkalmazások. Ma már részhalmaz-elnevezés. |
| Microsoft 365 | A teljes csomag: Office 365 + Windows + Enterprise Mobility & Security. Nem csak alkalmazások, hanem az egész munkahelyi környezet. |
| Windows 365 | Cloud PC: felhőben futó, streamelt Windows asztal. Külön termék, nem része az alapcsomagoknak. |

Az Office 365 az alkalmazásokról szól, a Microsoft 365 a teljes menedzselt és biztonságos munkakörnyezetről, a Windows 365 pedig magáról az operációs rendszerről mint szolgáltatásról.

Átnevezett/Átdolgozott rendszerek/alkalmazások:
| Régi név | Jelenlegi név |
| --- | --- |
| Azure Active Directory | Microsoft Entra ID |
| Office 365 ProPlus | Microsoft 365 Apps for enterprise |
| Microsoft 365 Compliance | Microsoft Purview |
| Skype for Business | Microsoft Teams |

## A hat funkcionális terület

#### tags
m365, architektura, services

A szolgáltatások hat, egymásra épülő területbe sorolhatók. Nem hivatalos rétegmodell, hanem gondolkodási keret.

| Terület | Feladata |
| --- | --- |
| Identity | A felhasználó azonosítása és beengedése |
| Services | Amivel a felhasználó ténylegesen dolgozik |
| Data | Hol keletkezik és hol él a szervezeti tartalom |
| Intelligence | Mit hoz ki a rendszer ebből az adatból |
| Security | Védelem a támadásokkal és a visszaélésekkel szemben |
| Compliance | Szabályozási, jogi és belső megfelelőség |

Az Identity a belépési pont, a Services a felület, a Data a tartalom, az Intelligence a hozzáadott érték. A Security és a Compliance minden réteg fölött érvényesül. A felhasználó szinte kizárólag a Services réteget látja.

### Identity

#### tags
entra, identity, security

A helyszíni IT-ban a védelem a hálózat határán volt: aki bent volt a céges hálózaton, az megbízhatónak számított. Ez a kastély és várárok modell. Felhőben a határ eltűnik, mert a szolgáltatás bárhonnan elérhető, ezért a kontrollpont átkerül a bejelentkezésre. Az identitás lett az új biztonsági határ.

- **Authentikáció:** a felhasználó azonosságának igazolása jelszóval, MFA-val, biometriával.
- **Authorizáció:** milyen erőforrásokhoz fér hozzá, csoporttagság, szerepkör és licenc alapján.
- **Provisioning:** felhasználók és csoportok létrehozása, módosítása, letiltása, törlése, lehetőleg automatizáltan.
- **Single Sign-On:** egyszeri bejelentkezés után token alapú hozzáférés az összes kapcsolódó szolgáltatáshoz.

Ha ez a réteg sérül, a többi réteg védelme megkerülhető, mert a támadó legitim felhasználóként lép be. Ezért kap az MFA és a feltételes hozzáférés ekkora hangsúlyt.

### Services

#### tags
services, apps, m365

| Szolgáltatás | Mit ad |
| --- | --- |
| Exchange Online | Postafiók, naptár, kontaktok, terembeosztás |
| SharePoint Online | Csapat- és szervezeti szintű dokumentumtárak, intranet oldalak |
| OneDrive for Business | Személyes felhőtárhely, technikailag SharePoint alapokon |
| Microsoft Teams | Chat, hívás, értekezlet, csatornák |
| Microsoft 365 Apps | A telepített asztali Office alkalmazások, licenc-alapú aktiválással |

Ezek nem különálló szigetek. A Teams elsősorban kliens és felület, nem önálló tároló:

- csapat létrehozásakor a háttérben SharePoint oldal jön létre, a csatornákba feltöltött fájlok ott tárolódnak;
- a privát chatben megosztott fájlok a küldő OneDrive-jába kerülnek;
- az értekezletek és a naptár az Exchange Online-ból jönnek;
- a csapathoz tartozó Microsoft 365 csoport kezeli a tagságot és a jogosultságokat.

Ezért kell egy Teams-fájl jogosultsági problémáját sokszor SharePoint oldalon megoldani.

### Data

#### tags
data, m365, storage

- **A tenant az adathatár.** A tartalom a szervezet tenantjához tartozik, nem az egyes felhasználóhoz. Kilépés után a postafiók és a OneDrive tartalma a szervezetnél marad.
- **Data residency:** a szervezet megadhatja, melyik földrajzi régióban tárolódjanak az adatai. GDPR és szektorspecifikus szabályozás miatt lényeges.
- **Központi tárolók:** Exchange postafiókok, SharePoint és OneDrive dokumentumtárak, Teams üzenetek.
- **Microsoft Graph:** egységes API- és adatréteg, amelyen keresztül a tárolók tartalma és a köztük lévő kapcsolatok egységesen elérhetők.

A Graph teszi lehetővé, hogy a rendszer ne csak fájlokat tároljon, hanem a fájlok, emberek és tevékenységek közötti kapcsolatokat is ismerje.

### Intelligence

#### tags
intelligence, copilot, graph

Ez a réteg nem új adatot hoz létre, hanem a meglévő szervezeti adatot teszi kereshetővé, elemezhetővé és automatizálhatóvá.

- **Search:** szervezeten átívelő keresés, amely a felhasználó jogosultságát figyelembe véve ad találatot.
- **Microsoft 365 Copilot:** generatív AI a tenant adatára támaszkodva. Nem ad új hozzáférést, csak azt használja, amihez a felhasználónak amúgy is joga van. Rosszul beállított jogosultsági rendszerben nem sebezhetőséget hoz létre, hanem láthatóvá teszi a meglévőt.
- **Viva Insights:** munkamintázatok és terhelés elemzése aggregált, anonimizált formában.
- **Power Platform:** automatizálás, riportálás és egyszerű alkalmazásfejlesztés az M365 adat fölött.

Az Intelligence réteg minősége közvetlenül függ a Data és az Identity réteg rendezettségétől.

### Security

#### tags
security, defender, zero-trust

Négy támadási felületet véd: az identitást, az eszközt, az alkalmazást és az adatot. A réteg egésze a Zero Trust elvrendszerre épül, amelyet a védelmi rétegekről szóló fejezet fejt ki.

| Eszköz | Mit véd |
| --- | --- |
| Defender for Office 365 | E-mail és együttműködési tartalom: phishing, kártékony csatolmány és link |
| Defender for Endpoint | Végpontok: kártevők, gyanús viselkedés |
| Defender for Identity | Helyszíni Active Directory elleni támadások észlelése |
| Defender for Cloud Apps | Felhőalkalmazások használatának láthatósága és kontrollja |
| Microsoft Intune | Eszközök menedzselése és megfelelőségi állapota |
| Conditional Access | Szabályzatmotor, amely a jelekből döntést hoz a belépésről |

A feltételes hozzáférés köti össze a rétegeket, ezért külön fejezet foglalkozik vele.

### Compliance

#### tags
compliance, purview, governance

A Security a külső támadó és a rosszindulatú hozzáférés ellen véd. A Compliance azt szabályozza és bizonyítja, hogy a szervezet maga hogyan kezeli az adatait: jogszerű és szabályos-e az eljárás.

A megfelelőségi eszközök gyűjtőneve Microsoft Purview.

| Funkció | Mire szolgál |
| --- | --- |
| Retention policy | Meddig kell megőrizni és mikor kell törölni egy tartalmat |
| Sensitivity label | Bizalmassági besorolás, amely a fájlhoz tapad, így a védelem vele utazik |
| Data Loss Prevention | Megakadályozza az érzékeny adat kiszivárgását |
| eDiscovery | Jogi eljáráshoz tartalom felkutatása és megőrzése |
| Audit log | Ki mit csinált a tenantban, visszakereshetően |
| Insider Risk Management | Belső, szándékos vagy gondatlan kockázatok észlelése |

A két terület átfed: a DLP és a sensitivity label egyszerre biztonsági és megfelelőségi eszköz.

## Microsoft Entra ID

#### tags
entra, identity

A központi identitáskezelő rendszer, korábbi nevén Azure Active Directory. A névváltás 2023-ban történt, a technológia és az API-k lényegében változatlanok maradtak, ezért a dokumentációkban mindkét név előfordul.

- felhasználók, csoportok, eszközök és alkalmazás-identitások tárolása;
- authentikáció és SSO a Microsoft 365 és több ezer külső SaaS alkalmazáshoz;
- MFA és feltételes hozzáférés;
- szerepkör-alapú hozzáférés-kezelés az adminisztratív jogokhoz;
- külső partnerek kezelése vendégfelhasználóként.

Az Entra ID nem azonos a helyszíni Active Directory-val. Az AD tartományvezérlőn futó, LDAP és Kerberos alapú címtár; az Entra ID felhőalapú, OAuth 2.0, OpenID Connect és SAML mentén működő identitásszolgáltatás. Nincs benne OU-struktúra és csoportházirend a klasszikus értelemben.

Ha a szervezetnek mindkettő megvan, hibrid identitásról van szó: a Microsoft Entra Connect szinkronizálja a helyszíni AD felhasználóit a felhőbe, így ugyanaz a felhasználónév működik mindkét környezetben.

## Szolgáltatási modell és felelősségmegosztás

#### tags
saas, cloud, felelosseg

| Modell | Mit ad a szolgáltató | Példa |
| --- | --- | --- |
| IaaS | Virtualizált infrastruktúra: gép, tárhely, hálózat | Azure Virtual Machines |
| PaaS | Futtatókörnyezet és platform, az OS kezelése nélkül | Azure App Service |
| SaaS | Kész, használatra kész alkalmazás | Microsoft 365 |

A Microsoft 365 SaaS, ez határozza meg a felelősségmegosztást.

| A Microsoft felel | A szervezet felel |
| --- | --- |
| Fizikai adatközpont és hardver | Felhasználói fiókok és azok életciklusa |
| Hálózat és virtualizáció | Jogosultságok és hozzáférési szabályzatok |
| Operációs rendszer és platform | A tenant konfigurációja |
| Az alkalmazás kódja és frissítései | Az adat tartalma és osztályozása |
| Rendelkezésre állás | Az eszközök megfelelősége |

A szolgáltatás elérhetőségéért a Microsoft felel, a benne lévő adatért és annak szabályozásáért mindig a szervezet. Az adat az ügyfél tulajdona marad. Ebből két gyakori félreértés következik: a konfigurációs hibából eredő adatszivárgás a szervezet felelőssége, és a beépített redundancia nem azonos a biztonsági mentéssel.

## Adminisztrációs felületek és eszközök

#### tags
admin, portal, graph, devops

A tenant kezelése webes portálokon és programozott felületeken keresztül történik. A grafikus felületek a háttérben ugyanazt a Microsoft Graph API-t hívják, ezért gyakorlatilag nincs olyan művelet, amely kizárólag kattintással lenne elvégezhető.

| Felület | Szerepkör | Technikai háttér |
| --- | --- | --- |
| Microsoft 365 admin center | Felhasználók, licencek, domainek, számlázás, szolgáltatás állapota | Graph API REST hívásokat generál |
| Microsoft Entra admin center | Címtár, identitásvédelem, MFA, feltételes hozzáférés, RBAC szerepkörök | Az Identity réteg közvetlen vezérlése |
| Microsoft Intune admin center | Eszközök, alkalmazások, megfelelőségi szabályok | Az eszközfelügyeleti motor konfigurációja |
| Microsoft Purview portal | Megőrzés, DLP, eDiscovery, audit | A megfelelőségi réteg konfigurációja |
| Exchange, SharePoint, Teams admin center | Az adott munkaterhelés részletes házirendjei | A Service réteg mélyszintű konfigurációja |
| PowerShell és Graph API | Tömeges műveletek, riportálás, CI/CD automatizáció | Közvetlen, skálázható hálózati hívások |
| Service Health és Message Center | Üzemzavarok, incidensek, jövőbeli API-változások | Telemetria és változásmenedzsment értesítések |

A használt PowerShell modulok a `Microsoft.Graph` és az `ExchangeOnlineManagement`. Tömeges és ismétlődő feladatoknál, például több száz felhasználó létrehozásánál, jogosultság-auditálásnál vagy riportálásnál a szkriptelés nem kényelmi kérdés, hanem gyakorlati szükségszerűség.

## Licencelés

#### tags
licensing, admin, m365

A licencelés felhasználó-alapú: a licenc dönti el, hogy az adott ember milyen szolgáltatásokat érhet el. A licenc hozzárendelése egyben ki is provizionálja a hozzá tartozó erőforrásokat, például az Exchange postafiókot.

- **Business** csomagok: kisebb szervezeteknek, felhasználószám-korláttal.
- **Enterprise (E3, E5)** csomagok: nagyvállalatoknak, korlát nélkül. Az E5 tartalmazza a fejlett biztonsági, analitikai és megfelelőségi funkciókat, például a magasabb szintű Defender és Purview képességeket.
- **Frontline (F)** csomagok: terepen dolgozó, elsősorban mobil eszközt használó munkatársaknak.

## Együttműködési szolgáltatások architektúrája

#### tags
exchange, sharepoint, teams, architektura

A három fő együttműködési szolgáltatás egyetlen ökoszisztémát alkot. Az Exchange Online adja a kommunikációs és naptárhátteret, a SharePoint Online a strukturált tartalomkezelést és fájltárolást, a Teams pedig a központi kommunikációs felületet, amely a másik kettőt összefogja.

```text
                      +----------------------------------+
                      |         MICROSOFT TEAMS          |
                      | (Központi kommunikációs felület) |
                      +-----------------+----------------+
                                        |
                 +----------------------+----------------------+
                 |                                             |
+----------------v-----------------+         +-----------------v----------------+
|        SHAREPOINT ONLINE         |         |         EXCHANGE ONLINE          |
|  (Dokumentumtár, webhelyek és    |         |  (Levelezés, naptárak, mail flow |
|       állományok tárolása)       |         |     és compliance szabályok)     |
+----------------------------------+         +----------------------------------+
```

| Szolgáltatás | Portál és szerepkör | Fő konfigurációs elemek | Biztonsági és megfelelőségi eszközök |
| --- | --- | --- | --- |
| Exchange | Exchange Admin Center, Exchange Administrator | User, shared és resource mailbox, mail flow, transport rule | Retention policy, litigation hold, DLP |
| SharePoint | SharePoint Admin Center, SharePoint Administrator | Team site, communication site, dokumentumtár, egyedi lista | External sharing policy, öröklődés, megosztási hivatkozás |
| Teams | Teams Admin Center, Teams Administrator | Standard, privát és megosztott csatorna, fülek, connectorok, botok | Meeting policy, messaging policy, app permission policy |

Három architektúrális összefüggés köti össze a hármat:

- **Licencelés:** az Exchange postafiók a licenc hozzárendelésekor automatikusan létrejön.
- **Adattárolás:** a standard csatorna fájljai a fő SharePoint team site dokumentumtárába kerülnek, a privát csatorna viszont izolációt igényel, ezért saját, különálló SharePoint webhelyet kap.
- **Csoporttagság:** a Microsoft 365 csoport tagsága egyszerre ad hozzáférést a Teams chatekhez, az Exchange csoportpostafiókhoz és a SharePoint dokumentumtárhoz.

## Exchange Online

#### tags
exchange, services, m365

Az Exchange Online a Microsoft 365 vállalati levelezési és naptárszolgáltatása. Feladata a biztonságos levélforgalom (mail flow), a felhős postafiókok kezelése és a megfelelőségi szabályok érvényesítése.

### Exchange szerepkörök

#### tags
exchange, rbac, admin

A Global Administrator minden szolgáltatáshoz teljes hozzáféréssel rendelkezik, ezért napi munkára nem használandó. Az Exchange-specifikus szerepkörök:

- **Exchange Administrator:** kizárólagos jog a postafiókok, a mail flow szabályok és az anti-spam beállítások kezelésére.
- **Organization Management role group:** a legtöbb Exchange-funkció elérése az Exchange Admin Centerben vagy PowerShellben.
- **View-Only Organization Management:** csak olvasási hozzáférés, például helpdesk auditorok számára.
- **Role assignment policy:** azt szabályozza, hogy a végfelhasználó mit állíthat a saját postafiókján, például kezelhet-e saját terjesztési listát.

### Postafiók típusok

#### tags
exchange, mailbox, licensing

- **User mailbox:** a licenc hozzárendelésekor automatikusan létrejön. Exchange Online Plan 2 esetén 100 GB kvóta és archiválás tartozik hozzá.
- **Shared mailbox:** közös címekhez, például `support@contoso.com`. 50 GB-ig nem igényel licencet. Licenc akkor kell hozzá, ha a méret meghaladja az 50 GB-ot, ha archiválás vagy litigation hold szükséges, vagy ha valaki közvetlenül, saját fiókként jelentkezik be rá.
- **Resource mailbox:** tárgyalók (room) és eszközök (equipment) foglalására. A foglalási kérések automatikus elfogadásra vagy elutasításra is állíthatók.

### Mail flow és házirendek

#### tags
exchange, mailflow, security

- **Transport rule (mail flow rule):** a levelek tartalmának és fejlécének vizsgálata. Blokkolhatja a veszélyes csatolmányokat, például az `.exe` kiterjesztést, vagy automatikusan titkosíthatja a bizalmas adatot tartalmazó levelet.
- **Accepted domain:** a szervezet által kezelt levelezési tartományok verifikációja.
- **Connector:** hibrid levelezési kapcsolat kiépítése a helyszíni (on-premises) Exchange szerverekkel.

### Megőrzés és jogi visszatartás

#### tags
exchange, compliance, purview

- **Retention policy:** az e-mailek életciklusának kezelése, például a törölt elemek 30 napos megőrzése a végleges törlés előtt.
- **Litigation hold:** jogi vagy bizonyítási eljárás alá vont postafiók teljes tartalmának kötelező megőrzése. A háttérben a törölt és a módosított elemeket is megtartja, ezért a tartalom utólag nem tüntethető el.

## SharePoint Online

#### tags
sharepoint, services, m365

A SharePoint Online a tartalomkezelő, fájltároló és intranetes platform. Biztosítja a dokumentumok verziókövetését, a strukturált adatnyilvántartást és a finomhangolt hozzáférés-kezelést.

### SharePoint szerepkörök és jogosultságok

#### tags
sharepoint, rbac, admin

- **SharePoint Administrator:** webhelygyűjtemények (site collection), tárhely-kvóták és megosztási házirendek kezelése.
- **Webhely szintű szerepkörök:** Owner (teljes felügyelet), Member (szerkesztés), Visitor (csak olvasás).
- **Microsoft 365 csoporttagság:** a csoport tagjai automatikusan hozzáférnek a kapcsolódó SharePoint webhelyhez.

### Webhelytípusok

#### tags
sharepoint, provisioning, teams

- **Team site:** csapatmunkára tervezve, automatikus Microsoft 365 csoport- és Teams-integrációval, közös dokumentumtárral.
- **Communication site:** széles közönségnek szóló hírek, HR anyagok és vállalati portálok közzétételére. Kevés a szerkesztő, az olvasók vannak túlsúlyban.
- **Site template:** előre konfigurált sablon, például projektmenedzsment oldal, saját struktúrával és verziókövetéssel.

### Dokumentumtárak és listák

#### tags
sharepoint, data, automation

- **Document library:** verziókövetés (version history), metaadatok és egyedi jóváhagyási munkafolyamatok.
- **Custom list:** strukturált adatnyilvántartás, például eszközleltár. A lista változása Power Automate segítségével automatikus értesítést válthat ki.

### Hozzáférés-kezelés és megosztás

#### tags
sharepoint, permissions, sharing

- **Permission inheritance:** a jogosultság öröklődik a szülő-gyermek láncon: webhely, dokumentumtár, mappa, fájl. Az öröklődés megszakítható, ha egyedi jogokat kell kiosztani. Megszakítás után a szülőn végzett módosítás már nem érvényesül az adott objektumon.
- **External sharing policy:** szabályozza a külső vendégekkel való megosztást. Például a pénzügyi oldalakon teljes tilalom, a projektoldalakon engedélyezés.
- **Sharing link:** egyedi megosztási hivatkozás lejárati idővel, jelszavas védelemmel vagy csak olvasási joggal.

## Microsoft Teams

#### tags
teams, services, m365

A Teams a központi kommunikációs és együttműködési felület. Egyesíti a chateket, a megbeszéléseket, a fájlkezelést és az alkalmazások integrációját.

### Teams szerepkörök

#### tags
teams, rbac, admin

- **Teams Administrator:** csapatok létrehozása, megbeszélési és üzenetküldési házirendek, valamint app-integrációk felügyelete a Teams Admin Centerben.
- **Híváskezelési delegálás:** a felhasználó a saját beállításaiban megadhat delegáltat, aki a nevében fogadhat és kezdeményezhet hívásokat. Ez nem adminisztratív jogosultság, hanem felhasználói funkció.

### Csapatok és csatornák

#### tags
teams, channels, sharepoint

- **Csapat létrehozása:** manuálisan vagy automatikusan, egy Microsoft 365 csoport keletkezésekor.
- **Standard channel:** a csapat minden tagja számára nyitott. A fájljai a fő SharePoint webhelyen tárolódnak.
- **Private channel:** korlátozott tagságú csatorna. A háttérben teljesen különálló, izolált SharePoint webhelyet hoz létre.
- **Shared channel:** más csapatokkal vagy külső szervezetekkel megosztható csatorna, Entra B2B Direct Connect alapon. A meghívott fél nem lesz a teljes csapat tagja, csak a csatornához fér hozzá.

### Teams házirendek

#### tags
teams, policies, governance

- **Meeting policy:** a megbeszélések funkcióit szabályozza, például a felvételkészítést, a transzkripciót és a névtelen csatlakozást.
- **Messaging policy:** a chatfunkciók korlátozása, például a GIF-ek, a matricák, az üzenettörlés vagy a külső chatek tiltása szabályozott részlegeken.
- **App permission policy:** harmadik féltől származó vagy egyedi alkalmazások engedélyezése, illetve tiltása.

### Integráció és automatizáció

#### tags
teams, integration, automation

- **Tab:** webhely, dokumentumtár vagy külső eszköz beágyazása egy csatornába, saját fülként.
- **Connector:** külső szolgáltatás értesítéseinek becsatornázása a beszélgetésbe.
- **Bot:** automatizált beszélgetőpartner, például helpdesk bot, amely bejelentést vesz fel.
- **Power Automate munkafolyamat:** automatizált folyamat, például jóváhagyási kérelem továbbítása a megfelelő vezetőnek.

A leggyakrabban beágyazott alkalmazások:

| Alkalmazás | Gyártó | Mit ad |
| --- | --- | --- |
| Planner | Microsoft | Feladatkezelő táblás (kanban) nézettel, csapatszintű feladatkiosztásra |
| Power BI | Microsoft | Üzleti riportálás és adatvizualizáció, jelentések beágyazása csatornába |
| Power Apps | Microsoft | Egyszerű üzleti alkalmazások fejlesztése kevés kóddal |
| Trello | Atlassian | Külső, kanban-alapú feladatkezelő webalkalmazás, amely fülként ágyazható be |
| Salesforce | Salesforce | Külső CRM, vagyis ügyfélkapcsolat-kezelő rendszer, fülként vagy connectorként köthető be |

## Zero Trust és a védelmi rétegek

#### tags
security, zero-trust, architektura

A biztonsági, identitáskezelési és megfelelőségi réteg a teljes M365 architektúrát áthatja, és a Zero Trust elvre épül: alapból semmi nem megbízható, minden hozzáférést ellenőrizni kell.

- **Verify explicitly:** minden hozzáférést hitelesíteni és engedélyezni kell, semmi nem megbízható alapból.
- **Least privilege:** mindenki a feladatához szükséges minimális jogot kapja meg.
- **Assume breach:** a kiindulópont az, hogy a támadó már bent van, ezért szegmentálás, naplózás és a mozgástér korlátozása szükséges.

A védelem három adminisztrációs pillérre támaszkodik: az Entra ID a hozzáférés-vezérlés és az identitásvédelem központja, az Intune az eszközök és alkalmazások felügyeleti motorja, a Purview pedig az adatvédelem, a tartalomosztályozás és a megőrzés portálja.

```text
+---------------------------------------------------------------------------+
|                     ZERO TRUST ARCHITEKTÚRA ÉS VÉDELEM                    |
+---------------------------------------------------------------------------+
| IDENTITÁS ÉS HOZZÁFÉRÉS  |     ESZKÖZVÉDELEM      |   ADAT ÉS TARTALOM    |
|   (Microsoft Entra ID)   |   (Microsoft Intune)   |  (Microsoft Purview)  |
|                          |                        |                       |
| Feltételes hozzáférés    | Compliance policy      | Sensitivity label     |
| Bejelentkezési kockázat  | App protection (MAM)   | DLP szabályok         |
| MFA és SSO               | Eszközállapot jelzés   | Retention policy      |
+---------------------------------------------------------------------------+
```

## Microsoft Intune

#### tags
intune, mdm, mam, devices

Felhőalapú Enterprise Mobility Management (EMM) és Unified Endpoint Management (UEM) megoldás. Feladata a szervezetben használt mobileszközök (iOS, Android), számítógépek (Windows, macOS, Linux) és a rajtuk futó alkalmazások központi felügyelete és védelme.

- **MDM (Mobile Device Management):** a teljes eszköz feletti felügyelet: beállítások kikényszerítése, titkosítás, távoli törlés. Az eszközt regisztrálni kell (enrollment).
- **MAM (Mobile Application Management):** kizárólag a céges alkalmazásokban lévő adat védelme, az eszköz teljes felügyelete nélkül. Saját tulajdonú (BYOD) eszközökre való.

## Eszköz-hozzáférési szabályzatok

#### tags
intune, devices, conditional-access

Az Intune és az Entra ID integrációjával érvényesíthető. Célja, hogy csak megbízható, naprakész és titkosított eszköz érhesse el a vállalati adatot.

- **Device compliance policy:** meghatározza a minimális biztonsági elvárásokat, például a BitLocker titkosítást, a Defender Antivirus meglétét, a minimális OS verziót és a jelszókomplexitást. A feltételeket teljesítő eszköz Compliant állapotot kap.
- **Eszközállapot-alapú feltételes hozzáférés:** az Entra ID-ban beállított szabály, amely megköveteli, hogy az eszköz Compliant vagy Microsoft Entra hybrid joined (korábbi nevén Hybrid Azure AD Joined) legyen a Teams és az Exchange eléréséhez.
- **App protection policy (MAM):** alkalmazás szintű védelem nem felügyelt, saját tulajdonú eszközökre. Nem igényel eszközregisztrációt, de a céges appokon belül, például az Outlookban és a Teamsben megtiltja a másolást, a mentést és a megosztást.

## Feltételes hozzáférés

#### tags
entra, conditional-access, security

Az Entra ID döntéshozatali motorja, amely valós időben értékeli a bejelentkezési jeleket: a felhasználót, az eszközt, a helyszínt, az alkalmazást és a kockázati szintet. A kimenet háromféle lehet: engedélyezés, feltételes engedélyezés (például MFA kérése) vagy blokkolás.

- **Célzás (targeting):** eltérő szigorúságú szabályok csoportok vagy szerepkörök szerint. A pénzügy és a vezetőség számára például kötelező MFA és szigorúbb korlátozás állítható be.
- **Bejelentkezési kockázat (sign-in risk):** a Microsoft Entra ID Protection jelei alapján észlelt anomália, például lehetetlen utazás (impossible travel), kiszivárgott jelszó vagy ismeretlen IP-cím. Kockázat esetén a szabály blokkol, vagy azonnali jelszó-visszaállítást kér. A helyszíni Active Directory elleni támadások észlelése ezzel szemben a Defender for Identity feladata.
- **Munkamenet-vezérlés (session control):** a Defender for Cloud Apps segítségével az engedélyezett munkamenet közben is korlátozható a felhasználó, például tiltható a letöltés, a nyomtatás vagy a vágólap használata böngészős nézetben.

## Tartalomvédelmi szabályzatok

#### tags
purview, dlp, compliance

A Purview eszköztárával valósul meg az adat osztályozása, védelme és életciklus-kezelése. Míg a megfelelőségi fejezet azt írja le, mire való az egyes eszköz, ez a fejezet azt, hogyan érvényesül a gyakorlatban.

- **Sensitivity label:** titkosítja a dokumentumot vagy az e-mailt, vizuális jelzést tesz rá (fejléc, vízjel), és korlátozza a hozzáférést. Példa címkenévre: Confidential – Legal. A védelem magába a fájlba épül, ezért a tenanton kívülre másolt fájlon is érvényes marad.
- **Data Loss Prevention:** automatikusan átvizsgálja a tartalmat érzékeny adat, például hitelkártyaszám vagy személyi szám után kutatva. Észlelés esetén blokkolja a külső megosztást e-mailben, SharePointon vagy Teamsen.
- **Retention policy:** szabályozza a kötelező megőrzési időt, például a HR dokumentumok hét éves megőrzését, vagy az automatikus törlést a jogszabályi megfelelőség érdekében.

## Korlátozási és letiltási típusok

#### tags
security, intune, dlp, conditional-access

A védelmi rétegek eltérő pontokon avatkoznak be. A táblázat azt mutatja, melyik korlátozás hol lép működésbe.

| Típus | Működési réteg | Hogyan működik | Példa |
| --- | --- | --- | --- |
| Device access block | Intune és Entra ID | Megtiltja a belépést az M365 szolgáltatásokba nem megfelelő eszközről | Titkosítás nélküli Windows gép letiltása a SharePointról |
| Rooted vagy jailbroken block | Intune (MDM és MAM) | Detektálja a feltört operációs rendszert és megtiltja a céges appok indítását | Céges e-mail elérésének tiltása jailbreakelt iPhone-on |
| Data transfer restriction | Intune app protection | Megakadályozza az adat kimásolását a védett céges appból a személyes appba | Szöveg másolásának tiltása a céges Outlookból a személyes jegyzetalkalmazásba |
| Conditional access block | Entra ID | Letiltja a bejelentkezést IP-cím, kockázati szint vagy ország alapján | Lehetetlen utazásként értékelt bejelentkezés azonnali blokkolása |
| Session-level restriction | Defender for Cloud Apps | Engedi a belépést, de letiltja a funkciókat a munkameneten belül | Dokumentum megtekintése webes SharePointban, de a letöltés gomb tiltása |
| DLP external sharing block | Microsoft Purview | Blokkolja a bizalmas adatot tartalmazó üzenet vagy fájl külső megosztását | Bankkártyaadatot tartalmazó Teams üzenet külső címzettnek küldésének megakadályozása |

## Monitorozás és auditálás

#### tags
monitoring, audit, purview, entra

A szabályzatok élesítése után a folyamatos ellenőrzés azonosítja a biztonsági réseket és a hibás beállításokat.

| Eszköz | Nyomon követett terület | Fő funkciók |
| --- | --- | --- |
| Microsoft Purview portal | Adatvédelem és megfelelőség | DLP riasztások és szabályegyezések vizsgálata, audit logok lekérdezése (ki, mikor, mit osztott meg), megfelelőségi riportok generálása |
| Microsoft Entra admin center | Identitások és bejelentkezések | Bejelentkezési naplók, a sikeres és sikertelen belépések és az alkalmazott szabályok elemzése, kockázatos felhasználók és bejelentkezések detektálása |
| Intune reporting dashboard | Eszközállapot és alkalmazások | Megfelelőségi állapotok és trendek, app protection szabályzatok érvényesülési jelentései, nem megfelelő eszközök listázása és hibaelhárítása |

## Szerepkör-alapú hozzáférés-kezelés

#### tags
rbac, identity, governance

> **RBAC (Role-Based Access Control):** olyan biztonsági modell, amely a rendszerekhez és adatokhoz való hozzáférést a felhasználó szervezetben betöltött szerepköre alapján korlátozza.

A Microsoft 365-ben az RBAC a legkisebb jogosultság elvére (principle of least privilege) épül: a felhasználó vagy adminisztrátor pontosan és kizárólag azokat a jogosultságokat kapja meg, amelyek a feladata elvégzéséhez elengedhetetlenek.

- **Kockázatcsökkentés:** kevesebb jog kevesebb véletlen vagy szándékos rendszerhibát tesz lehetővé.
- **Privilege creep ellen:** megakadályozza, hogy a dolgozók az évek során felesleges jogokat halmozzanak fel.
- **Feladatok szétválasztása (separation of duties):** megakadályozza az ellenőrizetlen hatalomkoncentrációt. A számlázást kezelő admin például ne legyen egyszerre Billing Admin és Global Admin.

### Előre definiált szerepkörök

#### tags
rbac, entra, admin

Beépített Microsoft 365 és Entra ID szerepkörök, konkrét feladatkörökre szabva.

- `Exchange Admin`: csak levelezést és postafiókokat kezel, a Teamshez nincs joga.
- `Helpdesk Admin`: jelszavakat állíthat vissza, de biztonsági házirendet nem módosíthat.
- `Global Administrator`: korlátlan hozzáférés a teljes tenanthoz. Csak indokolt esetben, lehetőleg dedikált fiókkal használandó.

### Egyedi szerepkörök

#### tags
rbac, entra, admin

Ha a beépített szerepkörök túl tágak, egyedi Entra ID szerepkör hozható létre három lépésben:

- **Permissions:** a pontos műveletek kijelölése, például csak az audit logok olvasása.
- **Scope:** a jog korlátozása adott csoportra vagy részlegre, például csak a marketing Teams csatornáira.
- **Assignment:** felhasználók vagy csoportok hozzárendelése a szerepkörhöz.

### Biztonságos delegálás

#### tags
rbac, governance, audit

- **Csoportalapú hozzárendelés:** a jogokat Entra biztonsági csoporthoz kell rendelni, nem egyénhez. Aki kikerül a csoportból, automatikusan elveszíti az admin jogot.
- **Access review:** időszakos felülvizsgálat a feleslegessé vált jogok megvonására, például egy külsős alvállalkozó jogának törlésére a projekt végén.
- **Dokumentáció:** a szerepkörök és a kiosztás indoklásának írásos vezetése az auditálhatóság érdekében.
- **Automatikus riasztás:** értesítés beállítása a kritikus szerepkörök, például a Global Admin módosulásakor.
- **Naplóelemzés:** a Purview audit log az adminisztrátori tevékenységeket és a szerepkör-változásokat, az Entra bejelentkezési napló a hozzáférési mintákat követi vissza.

## Bevezetési jó gyakorlatok

#### tags
best-practices, security, rbac

Az alábbi elvek a biztonsági szabályzatok és a szerepkörök élesítésére egyaránt vonatkoznak.

- **Pilot csoporttal indulás.** Biztonsági, feltételes hozzáférési vagy szerepkör-változás soha ne a teljes szervezeten élesedjen egyszerre. Egy kis létszámú, reprezentatív csoport kiszűri a nem szándékolt következményeket, például a téves blokkolásokat.
- **Beépített sablonok használata.** A Microsoft előre konfigurált, iparági szabványoknak megfelelő DLP, feltételes hozzáférési és szerepkör-sablonjai gyorsítják a bevezetést, és kevesebb hibalehetőséget hordoznak, mint az egyedi fejlesztés.
- **Rendszeres audit és riportelemzés.** Az Entra bejelentkezési és a Purview audit naplók visszatérő felülvizsgálata szükséges. A sok blokkolt levél vagy a gyakori DLP riasztás hiányos felhasználói oktatásra vagy finomhangolásra szoruló szabályra utal.
- **Felhasználói oktatás.** A technikai korlátok mellett a felhasználók képzése is szükséges. Ha értik a sensitivity label és a DLP szabályok célját, kisebb eséllyel próbálják megkerülni a rendszert.
- **Automatizált válaszreakciók.** Power Automate munkafolyamattal a DLP incidens azonnal értesítheti a biztonsági csapatot és az érintett felet.

## Kulcsfogalmak

#### tags
osszefoglalo, m365, alapok

| Fogalom | Meghatározás |
| --- | --- |
| Tenant | A szervezet elkülönített példánya a Microsoft felhőjében, egyben az adathatár |
| SaaS | Kész alkalmazás szolgáltatásként, a Microsoft 365 alapmodellje |
| Shared responsibility | A szolgáltató és az ügyfél közötti felelősségmegosztás |
| Microsoft Entra ID | Felhőalapú identitásszolgáltatás, korábban Azure AD |
| SSO | Egyszeri bejelentkezés több szolgáltatáshoz |
| MFA | Többtényezős hitelesítés |
| Conditional Access | Jelek alapján döntő hozzáférési szabályzatmotor |
| Zero Trust | Verify explicitly, least privilege, assume breach |
| Microsoft Graph | Egységes API- és adatréteg az M365 adat és kapcsolatai fölött |
| Microsoft Purview | A megfelelőségi eszközök gyűjtőneve |
| Microsoft Intune | Eszköz- és alkalmazásfelügyeleti szolgáltatás (EMM és UEM) |
| MDM | A teljes eszköz felügyelete, eszközregisztrációhoz kötve |
| MAM | Csak a céges alkalmazásban lévő adat védelme, eszközregisztráció nélkül |
| DLP | Adatvesztés-megelőzés az érzékeny tartalom kiszivárgása ellen |
| Litigation hold | Postafiók teljes tartalmának kötelező megőrzése jogi eljárás miatt |
| RBAC | Szerepkör-alapú hozzáférés-kezelés a legkisebb jogosultság elve mentén |
| Privilege creep | Jogosultságok észrevétlen felhalmozódása az idő során |
| Hibrid identitás | Helyszíni AD és Entra ID együttes, szinkronizált használata |
