# PowerShell

## Core vs Windows PowerShell

#### tags
powershell, pwsh, devops, dotnet

A régi **Windows PowerShell** (v1.0–v5.1) kizárólag Windowson fut. A modern **PowerShell Core** (parancs: `pwsh`, v7+) nyílt forráskódú és cross-platform, tehát Linuxon és macOS-en is elindul. A kettő eltérő .NET futtatókörnyezetre épül, ezért néhány régi, Windows-specifikus modul nem működik `pwsh` alatt.

**Mire jó ez a gyakorlatban?** A CI/CD pipeline-ok (például GitHub Actions, Azure DevOps) a lépéseket nem a fejlesztő gépén futtatják, hanem egy Docker konténerben: ez egy előre összerakott, eldobható minigép, amiben csak a futtatáshoz szükséges csomagok vannak, és ami minden indításnál pontosan ugyanolyan állapotból indul. Ezek a konténerek szinte mindig Linux alapúak. Mivel a `pwsh` Linuxon is elérhető, ugyanaz a script fut le helyben és a pipeline-ban is, tehát nem kell külön Windows-os és Linux-os változatot karbantartani.

## Pipeline és objektumkezelés

#### tags
powershell, pipeline, alapok, objektumok

```powershell
pwsh  #PowerShell Core indítása Linux terminálból
|     #pipeline: objektumot ad tovább (nem szöveget!)

Get-Process   #futó folyamatok lekérése (folyamat-objektumok tömbjét adja vissza)
  | Where-Object { $_.CPU -gt 1 }   #szűrés: csak az az objektum megy tovább, ahol a CPU > 1
  | Select-Object Name, CPU  #csak ez a 2 mező kelljen
  | Sort-Object CPU -Descending  #CPU szerint csökkenő sorrend

$_  #"az aktuális elem" a pipeline-ban (az éppen feldolgozás alatt lévő objektum)
```

A pipeline objektumorientált: minden parancsmag objektumokat ad vissza, amelyek mezői közvetlenül a tulajdonságneveiken keresztül érhetők el (`.DisplayName`, `.Mail`, `.Id`).

A `>` és a `<` a PowerShellben átirányítást jelöl, ezért az összehasonlításnak külön operátorai vannak:

| Operátor | Jelentés |
| --- | --- |
| `-eq` / `-ne` | egyenlő / nem egyenlő |
| `-gt` / `-lt` | nagyobb / kisebb |
| `-like` | mintaillesztés `*` helyettesítő karakterrel |
| `-match` | reguláris kifejezés |

## Objektumok felderítése: Get-Member

#### tags
powershell, hibakeresés, get-member, objektumok

A PowerShell legfontosabb felfedező parancsmagja a `Get-Member` (röviden `gm`). Ezzel vizsgálható meg egy ismeretlen objektum pontos típusa (Type), metódusai (Methods) és tulajdonságai (Properties). Ha nem világos, mit ad vissza egy parancs, érdemes ezzel kezdeni.

```powershell
$myUser | Get-Member   #a szerkezet feltérképezése

Get-MgUser -Top 1 | Get-Member   #egy Graph-parancs kimenetének felépítése

Get-MgUser -Top 5 | Format-List *   #minden mező kiíratása értékekkel együtt
```

## Graph parancsok és hitelesítés

#### tags
powershell, graph, m365, oauth, scopes

```powershell
Connect-MgGraph  #bejelentkezés + token megszerzése (mint a Graph Explorer "Sign in" gombja)
-Scopes  #milyen jogosultságot kér a hívás (ugyanaz, mint a Graph Explorerben bepipált permission)
Get-MgContext  #"melyik fiók van bejelentkezve, milyen jogokkal" -- debug/ellenőrző parancs
Invoke-MgGraphRequest  #nyers Graph API hívás PowerShellből, ugyanaz mint a Graph Explorer GET-je

Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.ReadWrite.All"
Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/v1.0/me"
Disconnect-MgGraph   #kijelentkezés, a token eldobása
```

A `Get-MgContext` megmutatja a jelenlegi fiókot, a bérleményt (tenant) és az aktív scope-okat. Váratlan 403-as hiba esetén érdemes először ezt futtatni.

Az `Invoke-MgGraphRequest` a nyers, bármelyik végpontra jó hívás, a `Get-MgUser` és társai pedig a kényelmes, tipizált parancsmagok ugyanarra a végpontra.

## Jogosultsági körök (-Scopes)

#### tags
powershell, graph, scopes, jogosultság

A `-Scopes` paraméterben megadott értékek határozzák meg a kért token jogosultságait (delegált permissionök). Csak a ténylegesen szükséges jogokat érdemes kérni: ez a legkisebb jogosultság elve.

Ha hiányzik a művelethez szükséges scope, például a hívás írna a címtárba, de csak olvasási jog tartozik a tokenhez, a Graph API **403 Forbidden** hibát dob. A pótlás a `Connect-MgGraph -Scopes ...` újrafuttatásával történik, céges tenantban esetleg admin jóváhagyással (Admin Consent).

| Scope | Mire jó |
| --- | --- |
| `User.Read` | Csak a saját fiók olvasása (`/me`) |
| `User.Read.All` | A tenant összes felhasználójának olvasása |
| `User.ReadWrite.All` | Felhasználók létrehozása és módosítása |
| `Directory.ReadWrite.All` | Címtárszintű írás, például manager-kapcsolat beállítása |

## M365 szervezeti hierarchia beállítása

#### tags
powershell, graph, m365, hierarchia

A manager-kapcsolat referencia, ezért nem a felettes nevét, hanem az OData URI azonosítóját kell átadni.

```powershell
#előfeltétel: a két felhasználó létrehozása (New-MgUser), majd az objektumok betöltése a $manager és $employee változóba

#felettes (manager) hozzárendelése a beosztotthoz:
Set-MgUserManagerByRef -UserId $employee.Id `
                       -BodyParameter @{ "@odata.id" = "https://graph.microsoft.com/v1.0/users/$($manager.Id)" }

#beosztott felettesének lekérdezése (kétlépcsős, megbízható módszer):
$managerId = (Get-MgUserManager -UserId $employee.Id).Id   #1. lépés: csak a referencia azonosítója
Get-MgUser -UserId $managerId | Select-Object Id, DisplayName, UserPrincipalName   #2. lépés: teljes user objektum

#a felettes közvetlen beosztottjai:
Get-MgUserDirectReport -UserId $manager.Id
```

A backtick (`` ` ``) a sortörés-folytatás jele, a `$($manager.Id)` pedig subexpression: sztringen belül így kell tulajdonságot behelyettesíteni, mert a sima `$manager.Id` csak a változót oldaná fel, a `.Id`-t már szövegként hagyná.

## Üres mezők a felettes lekérdezésekor

#### tags
powershell, graph, hibakeresés, manager

Tipikus eset: a felettes lekérdezésekor az `Id` oszlopban ott a hosszú azonosító, a `DisplayName` és a `UserPrincipalName` oszlop viszont teljesen üres marad.

```powershell
Get-MgUserManager -UserId $employee.Id | Select-Object Id, DisplayName, UserPrincipalName
#az Id megvan, a DisplayName és a UserPrincipalName oszlop üres marad

(Get-MgUserManager -UserId $employee.Id).AdditionalProperties["displayName"]   #a többi mező itt landol, nem tipizált tulajdonságként
```

Ennek az az oka, hogy a `Get-MgUserManager` nem a szokásos `/v1.0/users/{id}` végpontot hívja, hanem a `/v1.0/users/{id}/manager` referencia-végpontot. Az pedig nem teljes `user` objektumot, hanem `directoryObject` ősosztályt ad vissza, amiben tipizált tulajdonságként csak az `Id` szerepel. A `-Property` paraméterre sem érdemes hagyatkozni: a típus-konverzió miatt nem mindig kerül át a kért mezőlista a hálózati kérés `$select` paraméterébe.

Megbízható megoldás a fent látható kétlépcsős lekérés, mert szétválasztja a két Graph-műveletet. Először a referenciából csak az `Id` jön le, ami mindig megérkezik, majd ezzel az azonosítóval a standard `/v1.0/users/{id}` végpont ad vissza teljes `User` objektumot, kitöltött `DisplayName`, `UserPrincipalName` és `Mail` mezőkkel. A második lépés neve objektum-hidratálás: a puszta hivatkozásból így lesz adattal feltöltött objektum.

## Zárójel és tulajdonság kinyerése

#### tags
powershell, szintaxis, objektumok

A zárójel a kiértékelés sorrendjét szabályozza, ugyanúgy, mint a matematikában. Zárójel nélkül a `Get-MgUserManager.Id` egyetlen parancsnévnek számít, ilyen parancsmag pedig nincs, ezért hibára fut.

Zárójellel két lépés történik: előbb lefut a zárójelben lévő parancs és visszaad egy objektumot, majd a pont operátor kiolvassa ebből a kért tulajdonságot.

```powershell
$managerId = (Get-MgUserManager -UserId $employee.Id).Id   #1: lefut a parancs, 2: az eredmény Id tulajdonsága

(Get-Process -Name pwsh).Id   #ugyanez a minta bármelyik parancsmaggal
```

Rokon szerkezet a `$(...)` subexpression, ami sztringen belül működik ugyanígy: `"https://graph.microsoft.com/v1.0/users/$($manager.Id)"`.

## Paraméter-kötési hiba

#### tags
powershell, hibakeresés, szintaxis

`Cannot bind parameter 'X'.` Az `Invoke-MgGraphRequest` pozíciói: 0 Method, 1 Uri, 2 Body, 3 Headers. A hiba oka, hogy elgépelésnél, például egy extra szóköznél, a pwsh elcsúsztatja a pozíciókat, és rossz paraméterbe próbálja betenni az értéket.

```powershell
#beírt kód:
Invoke-MgGraphRequest -Method Get - Uri "https://graph.microsoft.com/v1.0/me" #felesleges szóköz a kötőjel és az Uri közt
#válasz:
Invoke-MgGraphRequest: Cannot bind parameter 'Headers'. Cannot convert the "https://graph.microsoft.com/v1.0/me" value of type "System.String" to type "System.Collections.IDictionary".
```

Kiküszöbölés: mindig nevesíteni kell a paramétereket (`-Method`, `-Uri`), nem a pozícióra bízni, és figyelni kell a szintaxisra, vagyis nincs szóköz a kötőjel és a paraméter neve között. A hibaüzenetet érdemes visszafelé olvasni: megmondja, **melyik** paraméterbe és **milyen típusként** próbálta betenni az értéket.
