# STUDY

## Github

- Github online commitok törlése és restart (fontos: Fájlokból azért visszaolvasható, így env fájl vagy hasonló secret kikerülésének javítására nem alkalmas)
- git config átírása és saját parancs hozzáadása:

```bash
git config --global alias.restart '!git checkout --orphan temp_branch && git add . && git commit -m "version 1.0" && git branch -D main && git branch -m main && git push -f origin main'
```

- ezek után csak ki kell adni a: git restart parancsot.

```bash
git restart
```

## Általános

### SOLID

A SOLID elvek az objektumorientált szoftverfejlesztés öt alapelvét jelentik. Céljuk, hogy a kód könnyen karbantartható, bővíthető és tesztelhető maradjon.

- **S – Single Responsibility Principle (Egyetlen Felelősség Elve):**
  Egy osztálynak csak egyetlen oka lehet a változásra, vagyis egyetlen jól körülhatárolt feladata vagy felelőssége lehet.
- **O – Open/Closed Principle (Nyílt/Zárt Elv):**
  A szoftveregységek legyenek nyitottak a bővítésre, de zártak a módosításra. Ez azt jelenti, hogy ha egy új funkciót vagy működést szeretnél hozzáadni a rendszerhez, azt a meglévő, már működő és letesztelt kód átírása (módosítása) nélkül, új kód vagy osztály hozzáadásával (bővítésével) kelljen megoldani.
- **L – Liskov Substitution Principle (Liskov Behelyettesítési Elv):**
  A gyermek (származtatott) osztályoknak teljes mértékben helyettesíthetőknek kell lenniük a szülő (ős) osztályaikkal anélkül, hogy a program helyes működése megsérülne. Ha van egy `Madár` szülőosztályod `repül()` metódussal, és abból származtatod a `Pingvin` osztályt, a pingvin nem tud repülni (kivételt dobna), így sérül az elv.
- **I – Interface Segregation Principle (Interfész Elkülönítés Elve):**
  Egyetlen osztályt se kényszerítsünk olyan interfészek megvalósítására (implementálására), amelyek metódusait az adott osztály valójában nem használja. Ahelyett, hogy egyetlen "óriás" interfészt hoznál létre 20 metódussal, hozz létre több kicsi, specifikus interfészt.
- **D – Dependency Inversion Principle (Függőségek Felcserélésének Elve):**
  A magas szintű modulok ne függjenek az alacsony szintű moduloktól; mindkettő absztrakcióktól (interfészektől) függjön. Ennek gyakorlati megnyilvánulása a **Dependency Injection (DI)**: az osztály ne maga hozza létre a belső függőségeit (`new` kulcsszóval a kód közepén), hanem kívülről, pl. a konstruktoron keresztül kapja meg azokat.

---

### OOP

Az OOP (Object-Oriented Programming / Objektumorientált Programozás) egy olyan programozási paradigma, amely az adatokat és a rajtuk végzett műveleteket egyetlen egységbe, úgynevezett **objektumokba** szervezi. Négy fő alappillére van:

- **1. Encapsulation (Adatrejtés / Encapsulatio):**
  Az adatok (adattagok) és a rajtuk végzett műveletek (metódusok) egyetlen osztályba zárása, valamint az adatok közvetlen elérésének korlátozása láthatósági szintekkel (`private`, `protected`, `public`). A belső állapotot elrejtjük, és csak vezérelt, publikus metódusokon (getter/setter) keresztül engedjük módosítani, védve az adat integritását.
- **2. Abstraction (Absztrakció):**
  A komplex belső működés elrejtése a felhasználó elől, és csak a lényegi, szükséges felület (interfész) megmutatása. Amikor meghívod a `$db->getConnection()` metódust, nem kell tudnod, hogy a háttérben hány socket nyílt meg vagy hogyan épült fel a TCP csomag – csak a végeredményt használod.
- **3. Inheritance (Öröklődés):**
  Olyan mechanizmus, amely lehetővé teszi, hogy egy új osztály (gyermek) átvegye egy meglévő osztály (szülő) adattagjait és metódusait az `extends` kulcsszóval. Segít elkerülni a kódismétlést (DRY - Don't Repeat Yourself), és hierarchikus kapcsolatot hoz létre az osztályok között.
- **4. Polymorphism (Többalakúság):**
  Azon képesség, hogy a különböző osztályokhoz tartozó objektumok reagálhatnak ugyanarra a metódushívásra, de a saját specifikus módjukon. Például ha van egy `Shape` interfészed `getArea()` metódussal, a `Circle` és a `Square` osztály is megvalósítja azt, de az területet teljesen eltérő matematikai képlettel számolják ki.

## Backend/PHP

### $this-> vs self::

A $this-> az osztályból létrehozott konkrét objektumpéldány saját adattagjait és metódusait éri el, míg a self:: magára az osztályra mint tervrajzra mutat, így annak statikus tulajdonságait és konstansait hivatkozza meg.

## M365/pwsh

### Graph Explorer — hibakódok

401 Unauthorized -> nincs érvényes bejelentkezés/token
403 Forbidden -> be vagy jelentkezve, de nincs jogod a művelethez (permission hiányzik)
válasz JSON: { "error": { "code": "...", "message": "Access is denied." } }
(402 nincs Graphban, azt nyugodtan törölheted)

$select / $filter / $top

$select = csak bizonyos mezők (kevesebb adat, gyorsabb válasz)
$filter = szűrés feltétel alapján
$top = darabszám-limit
-> mind query string paraméter, a URL végén ?-tel kezdve, &-nal fűzve össze

### me vs users

/me -> a bejelentkezett saját fiók
/users -> a szervezet (tenant) összes felhasználója -> ehhez admin jogosultság kell

JSON válasz szerkezete

{
"value": [ {...}, {...}, {...} ] <- lista lekérdezéseknél mindig ez a kulcs
}
egy elemű válasznál (pl. /me) nincs value, csak simán az objektum

### API

API = Application Programming Interface
-> egy "szerződés", ami leírja, milyen kéréseket küldhetsz egy rendszernek,
és milyen választ kapsz rá cserébe
-> nem UI, nem kell hozzá böngésző-kattintgatás, gép-gép kommunikáció
REST API = API-fajta, ami HTTP-t használ (GET/POST/PUT/PATCH/DELETE)
gyakorlati példa:
GET https://graph.microsoft.com/v1.0/me/messages -> levelek lekérése (olvasás)
POST https://graph.microsoft.com/v1.0/me/events -> új naptáresemény létrehozása
-> a "végpont" (endpoint) az URL, a "metódus" mondja meg, mit csinálsz vele

### PowerShell pipeline

```powershell
pwsh  #PowerShell indítása terminálból
|   #pipeline: objektumot ad tovább (nem szöveget!)
Get-Process   #futó folyamatok lekérése
  | Where-Object { $_.CPU -gt 1 }   #zűrés: csak ahol CPU > 1
  | Select-Object Name, CPU  #csak ez a 2 mező kelljen
  | Sort-Object CPU -Descending  #CPU szerint csökkenő sorrend
$_  #"az aktuális elem" a pipeline-ban (mint egy ideiglenes változó, ciklusonként)
```

```powershell
Connect-MgGraph  #bejelentkezés + token megszerzése (mint a Graph Explorer "Sign in" gombja)
-Scopes  #milyen jogosultságot kérsz (mint amit a Graph Explorerben pipáltál be)
Get-MgContext  #"ki vagyok most bejelentkezve, mivel" -- debug/ellenőrző parancs
Invoke-MgGraphRequest  #nyers Graph API hívás PowerShellből, ugyanaz mint a Graph Explorer GET-je
Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/v1.0/me"
```

#### PARAMÉTER-KÖTÉSI HIBA (Cannot bind parameter 'X')

Invoke-MgGraphRequest pozíciók: 0 Method, 1 Uri, 2 Body, 3 Headers
Hiba oka: Elgépeléseknél (pl extra szóköz, stb) rosszul értelmezheti a kódot a pwsh.
Pl:

```powershell
#beírt kód:
Invoke-MgGraphRequest -Method Get - Uri "https://graph.microsoft.com/v1.0/me" #Felesleges szóköz a kötéjel és Uri közt
#válasz:
Invoke-MgGraphRequest: Cannot bind parameter 'Headers'. Cannot convert the "https://graph.microsoft.com/v1.0/me" value of type "System.String" to type "System.Collections.IDictionary".
```

Kiküszöbölés pl.: mindig nevesíteni a paramétereket (-Method, -Uri), nem pozícióra bízni, valamint figyelni a szintaxra
