# Titkosítás és védelem

## Titkosítás és alapfogalmak

#### tags
titkosítás, kiberbiztonság, adatszörfözés, kulcskezelés

A titkosítás az adatok olvashatatlanná és használhatatlanná tételének folyamata a jogosulatlan megtekintők számára. Az adatok elolvasásához visszafejtés szükséges, amihez egy speciális titkos kulcs kell. Megfelelő kulcs nélkül az elfogott adat használhatatlan a támadók számára.

## Titkosítás típusai

#### tags
szimmetrikus, aszimmetrikus, titkosítás, nyilvános-kulcs

A titkosításnak két fő típusa létezik, amelyek a kulcsok használatában és a teljesítményben különböznek.

- **Szimmetrikus titkosítás:** ugyanazt a kulcsot használja a titkosításhoz és a visszafejtéshez.
  - *Előnye:* számításilag gyors, kiválóan alkalmas nagy mennyiségű adat védelmére (pl. merevlemezek, adatbázisok).
  - *Kihívása:* kulcsterjesztési probléma — a kulcs biztonságos megosztása a felek között hálózaton keresztül nehézkes.
- **Aszimmetrikus titkosítás:** matematikailag összekapcsolt kulcspárt használ (nyilvános és titkos kulcs). A titkos kulcs nem származtatható a nyilvános kulcsból.
  - *Működése:* a **nyilvános kulccsal** titkosított adat csak a hozzá tartozó **titkos kulccsal** fejthető vissza.
  - *Kulcselosztás:* a nyilvános kulcs szabadon megosztható, így megoldja a szimmetrikus titkosítás fő problémáját.
  - *Alkalmazása:* HTTPS, e-mail titkosítás, biztonsági protokollok.

## Digitális aláírások

#### tags
digitális-aláírás, hitelesség, integritás, aszimmetrikus

Az aszimmetrikus titkosításon alapuló eljárás, ahol a feladó a saját **titkos kulcsával** írja alá az adatokat. Bárki, aki rendelkezik a feladó **nyilvános kulcsával**, ellenőrizheti az aláírást.

- **Hitelesség:** igazolja, hogy az adatok valóban a várt feladótól származnak.
- **Integritás:** garantálja, hogy az adatok nem módosultak az aláírás pillanata óta.
- **Felhasználás:** szoftverletöltések ellenőrzése, e-mailek hitelesítése, elektronikus dokumentumok és tranzakciók védelme.

## Titkosítás adatállapot szerint

#### tags
inaktív-adatok, átviteli-adatok, használatban-lévő-adatok, confidential-computing

| Adatállapot | Definíció és példa | Védelemi mechanizmus és protokollok |
| --- | --- | --- |
| **Inaktív adatok (Data at Rest)** | Fizikai eszközön, szerver merevlemezén, adatbázisban vagy felhőtárhelyen tárolt adatok. | Adattároló szintű titkosítás. Megvédi az adatokat az adathordozó ellopása vagy illetéktelen hozzáférés esetén. |
| **Átvitel alatt lévő adatok (Data in Transit)** | Hálózaton, interneten vagy szolgáltatások között mozgó adatok. | Hálózati titkosítás, lehallgatás és elfogás ellen. Példák: HTTPS / TLS, VPN kapcsolatok. |
| **Használatban lévő adatok (Data in Use)** | Memóriában (RAM) betöltött vagy processzor által aktívan feldolgozott adatok. | Bizalmas számítástechnika (Confidential Computing), biztonságos enklávék használata. Megakadályozza a memóriaolvasást OS/hipervizor szinten multi-tenant környezetben. |

## Kulcskezelés

#### tags
kulcskezelés, hsm, azure-key-vault, biztonság

A titkosítás biztonsága a kulcsok védelmén múlik. Az ellopott kulcs használhatatlanná teszi a titkosítást. A kulcskezelés magában foglalja a kulcsok létrehozását, tárolását, védelmét, forgatását és megsemmisítését.

### Ajánlott eljárások (Best Practices)
- **Szétválasztás:** a kulcsokat az általuk védett adatoktól külön kell tárolni.
- **Dedikált hardver:** Hardveres Biztonsági Modulok (HSM) használata, amelyek illetéktelen beavatkozásnak ellenálló fizikai eszközök.
- **Rendszeres kulcsforgatás:** a kulcsok időszakos cseréje korlátozza a компромисс (kompromittálódás) esetén kiszivárgó adatok mennyiségét.
- **Szigorú hozzáférés-vezérlés:** a legkisebb jogosultság elve és erős hitelesítés alkalmazása a visszafejtési kulcsokhoz.

### Felhőalapú kulcskezelés
A felhőalapú szolgáltatások (pl. Azure Key Vault) központosított, felügyelt környezetet biztosítanak a kulcsok, tanúsítványok és titkok tárolására. Támogatják az automatikus kulcsforgatást és az integrációt anélkül, hogy a kulcsanyag megjelenne az alkalmazáskódban vagy a rendszergazdák előtt.

## Kivonatolás (Hashing)

#### tags
hashing, kivonat, egyirányú, determinisztikus

A kivonatolás egy egyirányú algoritmikus folyamat, amely tetszőleges méretű bemenetet egy rögzített hosszúságú karaktersorozattá (hash vagy kivonat) alakít át.

- **Egyirányú működés:** a kivonatból nem fordítható vissza az eredeti bemenet (nem használ kulcsot).
- **Determinisztikus:** ugyanaz a bemenet ugyanazzal az algoritmussal mindig pontosan ugyanazt a kivonatot eredményezi.
- **Egyedi ujjlenyomat:** alkalmas az adatok sértetlenségének ellenőrzésére anélkül, hogy az eredeti értéket tárolni vagy olvasni kellene.

## Jelszóvédelem és sózás (Salting)

#### tags
jelszóvédelem, salting, szivárványtábla, hitelesítés

A rendszerek a jelszavak nyílt szöveges tárolása helyett azok kivonatát tárolják. Bejelentkezéskor a megadott jelszó kivonatát hasonlítják össze a tárolt kivonattal.

### Biztonsági rés: Szivárványtáblás támadás
Mivel a kivonatolás determinisztikus, a támadók előre kiszámíthatják több millió gyakori jelszó hash-értékét (szivárványtáblák / szótári támadások), és összemérhetik őket a kiszivárgott adatbázissal.

### Védekezés: Sózás (Salting)
A só egy egyedi, véletlenszerűen generált értéksorozat, amelyet a jelszóhoz fűznek a kivonatolás előtt.

- **Működése:** minden jelszó egyedi sót kap, így két azonos jelszóval rendelkező felhasználó kivonata teljesen eltérő lesz az adatbázisban.
- **Eredmény:** a szivárványtáblák használhatatlanná válnak, mivel a támadónak minden egyes lehetséges sóértékhez külön keresőtáblát kellene generálnia.
- **Státusz:** a biztonságos jelszókezelés kötelező, iparági alapkövetelménye.

## Kulcsfogalmak és összehasonlítás

#### tags
osszefoglalo, titkositas, kivonatolás, fogalmak

| Fogalom / Technológia | Típus / Jellemző | Elsődleges cél / Használat |
| --- | --- | --- |
| **Szimmetrikus titkosítás** | Kétirányú, 1 titkos kulcs | Nagy adatmennyiségek gyors titkosítása (Data at Rest) |
| **Aszimmetrikus titkosítás** | Kétirányú, kulcspár (nyilvános + titkos) | Biztonságos kulcscsere, csatornaépítés (HTTPS, TLS) |
| **Digitális aláírás** | Aszimmetrikus alapú | Hitelesség és integritás igazolása |
| **Kivonatolás (Hashing)** | Egyirányú, kulcs nélküli, determinisztikus | Adatintegrity, jelszavak biztonságos tárolása |
| **Sózás (Salting)** | Véletlenszerű hozzáadott érték | Szivárványtáblás és szótári támadások kivédése |
| **HSM** | Dediált hardveres biztonsági modul | Titkosítási kulcsok fizikai védelme és tárolása |
| **Confidential Computing** | Védett végrehajtási környezet (enklávé) | Használatban lévő adatok védelme a memóriában |

# Vállalatirányítás, kockázat és megfelelőség (GRC)

#### tags
grc, governance, risk, compliance, adatvedelem

A GRC egy integrált keretrendszer, amely egyesíti a vállalati szabályzatokat, működési folyamatokat és technológiákat a szabályozási követelmények navigálására és a szervezeti értékek védelmére.

| GRC pillér | Meghatározás | Főbb tevékenységek / Tényezők |
| --- | --- | --- |
| **Szabályozás (Governance)** | A szervezet irányítására és felügyeletére szolgáló szabályok, eljárások és folyamatok rendszere. | Szabályzatok meghatározása, identitás- és hozzáférés-kezelés (IAM) szabványai, jóváhagyási folyamatok, felelősségi körök kijelölése. |
| **Kockázat (Risk)** | A szervezeti célokat és bizalmat veszélyeztető fenyegetések azonosítása, értékelése és kezelése. | **Típusai:** külső (kibertámadás, katasztrófa) és belső (emberi hiba, csalás).<br>**Folyamata:** Azonosítás → Értékelés → Válasz (elfogadás, mérséklés, elkerülés) → Monitorozás. |
| **Megfelelőség (Compliance)** | A szervezetre vonatkozó törvények, előírások és iparági szabványok betartása. *Nem azonos a teljes biztonsággal, csak a kötelező minimumot jelöli.* | Keretrendszerek (HIPAA, ISO 27001, SOC 2), adatkezelési és adatvédelmi előírások betartása. |

## Adatkezelési és megfelelőségi alapfogalmak

#### tags
adattarolas, adatelkentség, adatvedelem, joghatosag

- **Adattárolás (Data Residency):** Az adatok tárolásának, továbbításának és feldolgozásának fizikai/földrajzi helyét szabályozó megkötések.
- **Adatelkenység (Data Sovereignty):** Az elv, miszerint az adatokra azon ország/régió törvényei vonatkoznak, ahol azokat fizikailag gyűjtik, tárolják vagy feldolgozzák.
- **Adatvédelem (Data Privacy):** A személyes adatok (közvetlen és közvetett azonosítók) átlátható, hozzájáruláson alapuló és biztonságos kezelése az egyének jogainak garantálásával.
