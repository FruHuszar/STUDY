# Microsoft 365 alapok 3

## Microsoft Purview

#### tags
purview, governance, compliance, alapok

Központi, felhőalapú platform az adatok biztonságának, kormányzásának, kockázatainak és megfelelőségének kezelésére a Microsoft 365-ben és azon túl.

A GDPR az Európai Unió adatvédelmi rendelete, amely szigorú szabályokat ír elő a személyes adatok kezelésére, védelmére és törlésére. Ide tartozik az elfeledtetéshez való jog is, vagyis hogy az érintett kérheti az adatai törlését. A Purview ennek a megfelelőségnek az automatizálásában és a bírságok elkerülésében segít.

## Adatfelderítés és osztályozás

#### tags
purview, classification, discovery

Az adatvédelem alapja megtalálni, hol vannak az érzékeny adatok, és kategóriákba sorolni őket.

- **Sensitive Information Type (SIT):** előre definiált minta, reguláris kifejezés vagy kulcsszó az érzékeny adatok felismerésére, például bankkártyaszámra vagy útlevélszámra.
- **Trainable classifier:** gépi tanuláson alapuló modell, amelyet mintadokumentumokkal tanítanak be egy dokumentumtípus felismerésére, például önéletrajzra vagy forráskódra.
- **Exact Data Match (EDM):** pontos adatillesztés a szervezet által feltöltött, biztonságos adatbázis-listák alapján, például konkrét alkalmazotti azonosítókra vagy ügyfélszámokra. Azért lényegesen pontosabb a mintaillesztésnél, mert nem általános formátumot keres, hanem a valódi, létező adatot, így gyakorlatilag megszünteti a téves riasztásokat.

## Bizalmassági címkék

#### tags
purview, labels, information-protection

A címke meghatározza az adat védelmét, és a fájllal együtt utazik, mert a fájl metaadataiba épül be. Exportálás vagy a tenanton kívülre másolás után is érvényes marad.

- **Titkosítás:** az Azure Rights Management (Azure RMS) alapján szabályozza, ki nyithatja meg, szerkesztheti és nyomtathatja a fájlt.
- **Vizuális jelölés:** fejléc, lábléc vagy vízjel hozzáadása, például "Top Secret" felirattal.
- **Hozzáférési korlátozás:** a külső megosztás, a másolás vagy a nem felügyelt eszközről való elérés tiltása.
- **Címkeházirend (label policy):** meghatározza, melyik felhasználó milyen címkéket használhat, kötelező-e a címkézés, és kell-e indoklás a besorolás szigorúságának csökkentéséhez.

## Adatéletciklus-kezelés

#### tags
purview, retention, lifecycle

Az adatéletciklus-kezelés (DLM) biztosítja, hogy az adat csak a szükséges ideig őrződjön meg. Ez egyszerre csökkenti a tárolási költséget és a jogi kockázatot.

| Eszköz | Hatóköre | Működése |
| --- | --- | --- |
| Retention label | Egyedi elem vagy dokumentum | Megakadályozza a törlést a megadott időtartam alatt, a felhasználó sem tudja törölni, majd az idő lejárta után automatikusan töröl |
| Retention policy | Helyszín, például teljes Exchange vagy Teams | Átfogó szabály egyedi címkézés nélkül, például minden csevegés törlése 90 nap után |
| Auto-apply rule | Tartalom alapján | Automatikusan helyezi fel a címkét kulcsszó vagy felismert érzékeny adat (SIT, EDM) alapján |

## Adatkockázatok azonosítása

#### tags
purview, risk, monitoring

A hagyományos, hálózathatárra épülő védelem itt már nem elegendő. A Purview valós idejű, kontextusfüggő betekintést ad az adatok mozgásába a felhőben, az eszközökön és az AI-eszközökön keresztül.

- **Kockázati jelek:** rendellenes adatkiáramlás, illetéktelen letöltés, nem engedélyezett felhőtárhelyre, például Dropboxba történő feltöltés.
- **Adatkiáramlás (exfiltration):** tömeges letöltés, valamint külső adathordozóra vagy USB-re másolás korai észlelése.
- **Copilot-kockázat:** a DLP szabályok megakadályozzák, hogy az AI bizalmasnak címkézett adatot dolgozzon fel vagy jelenítsen meg jogosulatlan kontextusban.
- **Hozzáférési tüske:** a megszokottól eltérő hozzáférési minta, például éjszakai, nagy volumenű megnyitás.

## Belső kockázatok kezelése

#### tags
insider-risk, purview, monitoring

Az Insider Risk Management gépi tanulással, viselkedési mintákkal és HR-adatokkal, például a felmondási idővel vagy a szerepkör-váltással azonosítja a belső fenyegetéseket.

- **Tömeges fájlletöltés:** riasztás, ha valaki rövid idő alatt sok bizalmas fájlt tölt le.
- **Személyes címre küldés:** belső adat kijuttatása külső levelezésre, például Gmailre vagy Yahoo-ra.
- **Szokatlan munkaidő vagy tartózkodási hely:** a viselkedési alapvonaltól eltérő hozzáférés, HR-kontextussal kombinálva.

## Adatvesztés-megelőzés

#### tags
dlp, purview, defender

A DLP tartalomvizsgálat és szabályok alapján blokkolja, auditálja vagy engedélyezi az adatok mozgását.

- **DLP házirend:** rugalmas döntés, például teljes blokkolás vagy indokláshoz kötött engedélyezés.
- **Eszközszintű védelem:** a Defender for Endpoint tiltja az USB-re másolást, a nyomtatást és a vágólap használatát Windows és macOS eszközön.
- **Riasztás:** automatikus vagy manuális vizsgálatot indít, és továbbítható SIEM rendszerbe, például a Sentinelbe.

## Kommunikáció-megfelelőség

#### tags
communication-compliance, purview, governance

A Communication Compliance mintaillesztő kifejezésekkel (regex) és gépi tanulási modellekkel pásztázza az e-mail, a Teams, a Viva Engage (korábban Yammer) és a Copilot üzeneteket.

- **Felismerés:** zaklatás, visszaélés, bennfentes kereskedelem és szabályzati sértés azonosítása.
- **Reviewer dashboard:** a vizsgálók itt elemzik a megjelölt üzeneteket, és eszkalálhatják a HR vagy a jogi osztály felé.
- **Iparág-specifikus szabályok:** a szabályozott területek, például a FINRA vagy a HIPAA elvárásaihoz igazítható.

## Activity Explorer

#### tags
purview, monitoring, forensics

A Purview központi idővonal- és vizualizációs eszköze a felhasználói tevékenységek visszakövetésére. Akkor is teljes betekintést ad a címkézésbe, a letöltésbe, a megosztásba és a DLP-találatokba, ha az adott művelet nem váltott ki riasztást.

Felhasználó, dátum, fájltípus vagy házirend szerint szűrhető, és összekapcsolja az egymást követő eseményeket. Így látszik például, hogy egy fájlt előbb címkéztek, majd USB-re mentettek, végül külső címre küldtek.

## Compliance Manager

#### tags
compliance, purview, governance

Megfelelőségi kockázatértékelő és javaslattevő motor a jogszabályoknak, például a GDPR-nak, a HIPAA-nak vagy az ISO 27001-nek való megfeleléshez.

- **Assessment és control:** előre megépített szabálykészletek. A Microsoft-kezelt vezérlőket a rendszer automatikusan ellenőrzi, a felhasználó-kezelt vezérlőkhöz manuális feladat elvégzése és bizonyíték feltöltése szükséges.
- **Compliance Score:** számszerűsített mutató a megfelelőségi állapotról, amely egyben prioritási sorrendet is ad a javító intézkedésekhez.

## Data Explorer

#### tags
purview, discovery, monitoring

Felkutatja az érzékeny adatokat, például a bankkártyaszámokat, a személyi számokat és az egészségügyi adatokat, és megmutatja, hol helyezkednek el a SharePointban, a Teamsben, a OneDrive-on és az Exchange-ben.

Az adatok szűrhetők helyszín, bizalmassági címke és tartalomtípus szerint. Ez segít azonosítani a túlzott kitettséget, például a külsőleg megosztott bizalmas fájlokat.

## DSPM for AI

#### tags
purview, ai, copilot

A Data Security Posture Management (DSPM) az AI-eszközök, például a Copilot és a nem jóváhagyott generatív AI-alkalmazások által használt, feldolgozott és generált adatok biztonságát felügyeli.

- **Shadow AI észlelése:** azonosítja a nem jóváhagyott AI-eszközök és böngészőbővítmények használatát. A Shadow AI ugyanaz a jelenség, mint a Shadow IT, csak AI-eszközökre vonatkozik.
- **AI-védelmi intézkedések:** automatikus bizalmassági címkézés az AI által generált tartalomra, hozzáférési korlátozás a szabályozott adatokra, valamint Activity Explorer és audit napló a vizsgálatokhoz.

## Content Search és eDiscovery

#### tags
ediscovery, purview, legal

- **Content Search:** keresőeszköz kulcsszó, dátum és küldő alapján az e-mailekben, dokumentumokban és csevegésekben. A lekérdezés nyelve a KQL (Keyword Query Language), az eredmény exportálható.
- **eDiscovery Standard:** alapvető keresés, exportálás és jogi megőrzés (legal hold), amely megakadályozza az érintett adat törlését az eljárás idejére.
- **eDiscovery Premium:** haladó ügykezelés, áttekintési készletek (review set), elemzések, például duplikációszűrés és témaazonosítás, valamint kitakarás (redaction) az összetett jogi és megfelelőségi vizsgálatokhoz.

## Túlmegosztás a SharePointban

#### tags
sharepoint, oversharing, sharing

Túlmegosztásról akkor beszélünk, ha a felhasználó a szükségesnél vagy a szándékoltnál szélesebb hozzáférést ad a tartalomhoz. Három tipikus formája:

- **Kinek:** a "bárki a hivatkozással" vagy a "mindenki" opció használata.
- **Milyen szinten:** szerkesztési jog megadása megtekintési helyett.
- **Milyen kiterjedésben:** teljes webhely-hozzáférés adása külső vendégnek egyetlen fájl megosztása helyett.

### Felismerés és hibaelhárítás

#### tags
sharepoint, audit, admin

- **SharePoint admin center:** megosztási jelentések szűrése webhely, mappa vagy fájl szerint.
- **PowerShell és Graph API:** hozzáférések auditálása és a javítás automatizálása nagy léptékben.
- **Automatizált audit:** értesítés küldése, ha bizalmas címkéjű fájlt osztanak meg külsősnek.

### Megelőzés

#### tags
sharepoint, best-practices, labels

- **Bizalmassági címke és titkosítás:** a fájlt csak a jogosultak nyithatják meg, akkor is, ha a link máshoz kerül.
- **Szervezeti szintű korlát:** az anonim hivatkozások letiltása az admin centerben.
- **Oktatás és figyelmeztetés:** SharePoint eszköztippek a megosztás pillanatában, valamint automatikus admin értesítés.

### DAG jelentések

#### tags
sharepoint, governance, monitoring

A Data Access Governance (DAG) a SharePoint beépített jelentése a magas kockázatú webhelyek beazonosítására.

- **Kockázatos webhelyek:** bizalmas tartalom túlmegosztással.
- **Inaktív tulajdonosok:** felügyelet nélkül maradt webhelyek.
- **Javítási lépések:** vendég-hozzáférés visszavonása, szigorúbb megosztási beállítás, címkék bevezetése.

### SharePoint Advanced Management

#### tags
sharepoint, sam, governance

Fizetős bővítmény (SAM) a finomhangolt hozzáférés-vezérléshez, az aktivitásfigyeléshez és a feltételes hozzáféréshez.

- **Korlátozott webhely-hozzáférés:** csak kijelölt csoportok vagy felügyelt eszközök férhetnek hozzá.
- **Inaktivitási riasztás:** a régóta nem használt webhelyek automatikus archiválása vagy zárolása.
- **Hozzáférési felülvizsgálat és feltételes hozzáférés:** rendszeres jogosultság-ellenőrzés és MFA megkövetelése.

## Copilot adathozzáférése

#### tags
copilot, ai, permissions

A leggyakoribb tévhit az, hogy a Copilot mindent lát. Valójában ugyanazok a hozzáférési határok érvényesek rá, mint a felhasználóra, és nem tud adatot átszivárogtatni felhasználók között.

- **Felhasználói identitás:** a Copilot kizárólag a bejelentkezett felhasználó identitásával, jogosultságaival és OAuth-tokenjével fér hozzá az adatokhoz a Wordben, az Excelben, a PowerPointban, az Outlookban, a Teamsben, a OneDrive-on és a SharePointban.
- **Nincs jogosultság-megkerülés:** ha a felhasználó manuálisan nem ér el egy fájlt, például egy pénzügyi mappát, akkor a Copilot sem vonhatja be összefoglalóba vagy elemzésbe.
- **Adatvédelmi határ:** a Copilot a Purview megfelelőségi határain belül működik, az adatot nem továbbítja a tenanton kívülre vagy harmadik félnek.

### Microsoft Graph és a szemantikus index

#### tags
copilot, graph, ai

A Copilot nem közvetlenül a fájlokban keres, hanem a Microsoft Graph API-n keresztül éri el a szolgáltatásokat.

- **Szemantikus index:** a Graph a szövegek jelentését, fogalmait és kontextusát vektorokká alakítja, tehát nem csak kulcsszóra keres. Felismeri a szinonimákat és a szervezeti zsargont is, így a "project kickoff" keresésre a "launch meetings" című dokumentumot is megtalálja.
- **Kontextus és jelek:** a lekérdezésnél figyelembe veszi a felhasználó szervezeti kapcsolatait, a dokumentumok frissességét, a megosztási jelzéseket és az aktivitási naplókat.

### Copilot jogosultsági modell

#### tags
copilot, security, labels

A Copilot a meglévő Microsoft 365 biztonsági házirendeket maradéktalanul betartja.

- **Bizalmassági címke és DLP:** ha egy dokumentum Confidential – Finance Only címkét kapott, a Copilot nem jeleníti meg annak, aki nem tagja a Finance csoportnak.
- **Link-alapú megosztás:** ha a felhasználó aktív megosztási hivatkozáson keresztül fér hozzá egy fájlhoz, a Copilot is eléri. A link lejártakor vagy visszavonásakor a Copilot hozzáférése is azonnal megszűnik.
- **Feltételes hozzáférés:** ha egy szabály tiltja a SharePoint megnyitását nem felügyelt eszközről, a Copilot sem dolgozza fel azokat az adatokat azon az eszközön.

### Felelősségteljes AI

#### tags
copilot, ai, governance

- **Adatminimalizálás:** csak a kérés teljesítéséhez szükséges adatot kéri le, nem indexeli végig válogatás nélkül a teljes fiókot.
- **Átláthatóság:** minden válasz tartalmazza a forráshivatkozásokat a felhasznált fájlokra vagy Teams üzenetekre, így a válasz ellenőrizhető.
- **Nem talál ki hiányzó adatot:** ha nincs elérhető adat a kérdésre, például a negyedéves előrejelzésre, akkor ezt közli, ahelyett hogy kitalálna egyet.
- **Tartalomszűrés és auditálhatóság:** szűri a káros és sértő tartalmat, és minden interakciót naplóz a Purview audit naplókba.

## Kulcsfogalmak

#### tags
osszefoglalo, purview, compliance

| Fogalom | Meghatározás |
| --- | --- |
| SIT | Sensitive Information Type: minta vagy kulcsszó az érzékeny adat felismerésére |
| Trainable classifier | Mintadokumentumokkal betanított osztályozó modell |
| EDM | Exact Data Match: illesztés a szervezet valódi adatlistájához, minimális téves riasztással |
| Azure RMS | A bizalmassági címkék mögötti titkosítási és jogosultságkezelő motor |
| DLM | Data Lifecycle Management: az adat megőrzésének és törlésének kezelése |
| Retention label | Elem- vagy dokumentumszintű megőrzési szabály |
| Retention policy | Helyszínalapú, átfogó megőrzési szabály |
| Insider Risk Management | Belső fenyegetések észlelése viselkedési és HR-jelek alapján |
| Communication Compliance | Az üzenetforgalom pásztázása szabályzati sértés után |
| Activity Explorer | Idővonalas vizsgálati eszköz a felhasználói tevékenységekhez |
| Compliance Score | Számszerűsített megfelelőségi mutató a Compliance Managerben |
| DSPM for AI | Az AI-eszközök adathasználatának biztonsági felügyelete |
| Shadow AI | Nem jóváhagyott AI-eszközök és bővítmények használata |
| KQL | Keyword Query Language: a Content Search lekérdezőnyelve |
| Legal hold | Az adat törlésének megakadályozása jogi eljárás idejére |
| Review set | Az eDiscovery Premium áttekintési készlete a válogatott bizonyítékokból |
| Redaction | Kitakarás: érzékeny részlet elrejtése a kiadott dokumentumban |
| Oversharing | A szükségesnél szélesebb hozzáférés adása a tartalomhoz |
| DAG | Data Access Governance: SharePoint jelentés a kockázatos webhelyekről |
| SAM | SharePoint Advanced Management: fizetős felügyeleti bővítmény |
| Szemantikus index | Jelentés alapú, vektoros keresési réteg a Graphban |
| Adatminimalizálás | Csak a feladathoz szükséges adat lekérése |
