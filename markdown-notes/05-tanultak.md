# Tanultak

## 1. Szakmai Tapasztalatok és Észrevételek

A rendszerbeállítási és tesztelési folyamatok során az alábbi infrastruktúra-kezelési, adatminőségi és biztonsági észrevételek azonosíthatók:

1. **Felhasználói Adatfeltöltés és Automatizáció Hiánya**
   * **Észrevétel:** Az új belső (`Member`) és külső (`Guest`) felhasználók manuális létrehozása során a mezők kitöltése időigényes és hibalehetőségeket rejt magában.
   * **Optimális megoldás:** A név-, vállalati- és attribútum-adatok automatikus kitöltése (pl. `DisplayName` alapú mezőgenerálás) vagy tömeges felhasználólétrehozás CSV-fájlból, PowerShell/Graph API segítségével.

2. **Bemeneti Mezők Validációjának Hiánya (Data Governance)**
   * **Észrevétel:** Az Entra ID beviteli mezői túlságosan megengedőek a szövegformátum tekintetében. A nem egységes értékek (pl. nyelvhasználat: "HR" vs. "Human Resources" vs. "hr", vagy gépelési hibák, mint "extrenal user") közvetlenül veszélyeztetik a dinamikus szabályok működését.
   * **Kockázat:** A `user.department -eq "HR"` típusú dinamikus csoportszabályok nem adják hozzá a felhasználót a csoporthoz, ha az attribútum el van gépelve vagy eltérő formátumú.

3. **Külső Felhasználók Jogosultsági Kockázatai (B2B Security)**
   * **Észrevétel:** Tény, hogy technikai szempontból egy `Guest` (külső) felhasználónak is adható magas szintű jogosultság (akár `Global Administrator`).
   * **Kockázat:** Ez súlyos Zero Trust architektúrával kapcsolatos kockázatot jelent. Külső fiókok esetében szigorúan PIM (Privileged Identity Management) és Just-In-Time (JIT) hozzáférés-kezelés alkalmazandó.

4. **Microsoft Graph SDK Hitelesítési Komplexitás**
   * **Észrevétel:** A PowerShell `Connect-MgGraph` modul paraméter-illesztési viselkedése interaktív és nem-interaktív (App-only) módban jelentős konfigurációt igényel.
   * **Optimális megoldás:** A standard, `AZURE_` előtagú környezeti változók (`AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`) használata biztosítja a legstabilabb csatlakozást.

---

## 2. Elvégzett Feladatok

### 2.1. Entra ID Konfiguráció és Címtárműveletek (GUI)
* **Felhasználók és Csoportok Kezelése:** Belső felhasználók és külső vendégek (`Guest`) meghívása és konfigurálása.
* **Dinamikus Csoportok Létrehozása:** Dinamikus tagsági szabály beállítása a `Department` attribútum alapján (`user.department -eq "HR"`).
* **Entitás-attribútumok és Jogosultságok:** Felettesi viszonyok (`Manager`), csoporttagságok és címtár-szerepkörök kiosztása.
* **App Registration (Alkalmazásregisztráció):** Nem-interaktív (unattended) scriptek számára App Registration létrehozása, Client Secret generálása és alkalmazásszintű API engedélyek (`Application Permissions`) hozzáadása.
* **Licenckezelés:** Entra ID P2 próbalicenc aktiválása és társítása a felhasználói fiókokhoz.

### 2.2. Automatizáció és Csatlakozás PowerShell segítségével
* **Microsoft Graph Csatlakozás (App-Only Auth):** Csatlakozás a Microsoft Graph API-hoz PowerShell Core környezetből a regisztrált alkalmazás identitásával.
* **Biztonságos Hitelesítési Stratégiák:** A titkos adatok (Client Secret) kezelése `.env` fájlon és munkamenet-szintű környezeti változókon keresztül, a plain-text kódolás elkerülése érdekében.

### 2.3. Biztonsági Házirendek Beállítása (GUI)
* **Conditional Access (Feltételes Hozzáférés):** Kötelező MFA előírása az adminisztrátori fiókokra, az IT csoportra és minden felhőalkalmazásra. A szabályzat tesztelési céllal `Report-Only` (Csak jelentés) módba lett állítva.
* **Privileged Identity Management (PIM):** A Zero Trust elveknek megfelelően (JEA / JIT) a `User Administrator` szerepkör beállítása `Eligible` (Jogosult) típusúvá egy adott felhasználó számára, az időtartamkorlátok finomhangolásával.

### 2.4 Szintek és Átszervezés
* Manager közbeékelése, és beosztottak átszervezése az új manager alá manuálisan.
* Outlook -> feldobja a cég embereit beállítás

```powershell
# Beosztottak kiírása:
$DirectReports = Get-MgUserDirectReport -UserId "manager@tenant.onmicrosoft.com" -Property "id,displayName,userPrincipalName"
PS C:\Users\ME> foreach ($Report in $DirectReports) {
>> $Name = $Report.AdditionalProperties["displayName"]
>> $UPN = $Report.AdditionalProperties["userPrincipalName"]
>> Write-Host "Név: $Name | UPN: $UPN | ID: $($Report.Id)"
>> }
```
---

## 3. Problémák és Hibaelhárítás (Troubleshooting)

### 3.1. Probléma: Client Secret és Paraméter-kötési Hiba (`Cannot bind parameter`)
* **Hibajelenség:** 
  A `Connect-MgGraph` parancs futtatásakor `Cannot convert the "System.Security.SecureString" value to type "System.Management.Automation.PSCredential"` hibaüzenet jelenik meg.
* **A hiba oka:** 
  A `Connect-MgGraph` parancs `-ClientSecretCredential` paramétere nem fogad el közvetlenül `SecureString` típust, hanem egy összetett `PSCredential` vagy `Azure.Identity.ClientSecretCredential` .NET objektumot vár.

### 3.2. Probléma: AmbiguousParameterSet Hiba
* **Hibajelenség:**
  A `Connect-MgGraph` parancs `Parameter set cannot be resolved using the specified named parameters` hibával leáll.
* **A hiba oka:**
  A PowerShell modulban a `-ClientSecretCredential` paraméter nem kombinálható közvetlenül a különálló `-TenantId` és `-AppId` paraméterekkel. A modul SDK verziói között a paraméterkészletek (Parameter Sets) változnak, ami feloldhatatlan ütközéshez vezet.

### 3.3. Probléma: Téves `Tenant ID cannot be null` Hiba
* **Hibajelenség:**
  A `$TenantId` változó kitöltése ellenére a .NET osztály `ArgumentNullException` hibát dob a `tenantId` paraméterre.
* **A hiba oka:**
  Az `Azure.Identity.ClientSecretCredential` .NET osztály szigorúan `[string]` típust vár. Ha a PowerShell konverzió során a modul a háttérben nem adja át megfelelően a típust, a .NET réteg `null` értéknek érzékeli az azonosítót.

#### A 3.1., 3.2. és 3.3. Hibák Végső Megoldása (Standard `.env` Workflow):
A `.env` fájlban tárolott kulcsokat be kell tölteni a PowerShell folyamat (`Process`) szintű környezeti változóiba a szabványos `AZURE_*` elnevezéssel. Ezután a `-EnvironmentVariable` kapcsolóval a modul automatikusan és hibamentesen kapcsolódik.

**Alkalmazott megoldás:**
```powershell
Get-Content "$env:USERPROFILE\Desktop\.env" | ForEach-Object { 
    if ($_ -match '^([^=]+)=(.*)$') { 
        [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), "Process") 
    } 
}; Connect-MgGraph -EnvironmentVariable

```

> **Megjegyzés Azure környezetekhez:**
> Azure VM, Azure Function vagy Automation Account esetén a titkos kódok használata teljesen kiváltható a **Managed Identity** használatával:
> ```powershell
> Connect-MgGraph -Identity
> 
> ```
> 
> 

---

### 3.4. Probléma: "Role is not found" Hiba a PIM Hozzárendelés során

* **Hibajelenség:**
A Privileged Identity Management (PIM) felületén a `User Administrator` szerepkör `Eligible` típusú hozzárendelésekor az alábbi hibaüzenet jelenik meg:
`Role assignment failed [...] Message: The role is not found.`
* **A hiba oka:**
Az Entra ID tenantokban a címtári szerepkörök alapértelmezetten csak sablonokként (*Role Templates*) léteznek. Amíg egy szerepkört legelőször nem rendelnek hozzá legalább egy felhasználóhoz közvetlenül (vagy nem aktiválják API-n keresztül), addig a konkrét címtári objektum nem létezik a tenantban. A PIM felülete nem tud olyan szerepkörhöz `Eligible` tagságot rendelni, amelynek a címtári objektuma még nem lett példányosítva.
* **A probléma megoldási folyamata (GUI):**
1. Navigálás az **Identity** ➔ **Roles & admins** ➔ **Roles & admins** felületre.
2. A **User Administrator** szerepkör megkeresése és megnyitása.
3. A **+ Add assignments** gombra kattintva a felhasználó hozzáadása közvetlen **Active** (nem Eligible) típussal. *(Ez a lépés fizikai szinten példányosítja a szerepkört a tenantban).*
4. A szerepköri objektum létrejötte után a hozzárendelés módosítása **Active**-ról ➔ **Eligible** típusúra.

## Manager Kézbeékelése

Szituáció: A L2-es Managernek szét kell szervezni a munkáját. Létrejön egy L3 Manager, és neki kellene adni L2 összes beosztottját.

---

### Hogyan oldható meg ez tömegesen GUI-val? (Bulk Operation)

Ha a felületen maradva kellene több embert átirányítani, az Entra ID-ban erre a **Bulk operation** (Tömeges művelet) funkció szolgál:

1. Az **Entra ID Admin Center**-ben letölthető egy **Bulk edit users** vagy **Bulk update** CSV sablon.
2. Ebből a CSV-ből kivonatolhatók a felhasználók, és a `Manager` oszlopban átírható az érték `Manager Maria` UPN-jéről `Manager Mimosa` UPN-jére.
3. A feltöltés után a rendszer háttér-feladatként (batch job) pár perc alatt frissíti az összes fiókot.

---

Az alábbi PowerShell script automatikusan megkeresi **Manager Maria összes meglévő beosztottját**, és egy ciklussal átköti őket **Manager Mimosa** alá:

```powershell
# 1. Menedzserek azonosítójának lekérése
$Maria  = Get-MgUser -UserId "manager.maria@a_te_tenantod.onmicrosoft.com"
$Mimosa = Get-MgUser -UserId "manager.mimosa@a_te_tenantod.onmicrosoft.com"

# 2. Mimosa felettesének beállítása (Maria lesz Mimosa főnöke)
Set-MgUserManagerByRef -UserId $Mimosa.Id -OdataId "https://graph.microsoft.com/v1.0/users/$($Maria.Id)"

# 3. Maria ÖSSZES közvetlen beosztottjának lekérdezése
$DirectReports = Get-MgUserDirectReport -UserId $Maria.Id

# 4. Tömeges átirányítás: Mindenkit átrakunk Mimosa alá (kivéve magát Mimosát)
foreach ($Report in $DirectReports) {
    if ($Report.Id -ne $Mimosa.Id) {
        Set-MgUserManagerByRef -UserId $Report.Id -OdataId "https://graph.microsoft.com/v1.0/users/$($Mimosa.Id)"
        Write-Host "Átirányítva Mimosa alá: $($Report.Id)"
    }
}

```

| Módszer | 5 beosztottnál | 10 000 beosztottnál |
| --- | --- | --- |
| **Egyenkénti GUI kattintgatás** | Elfogadható | képtelenség / humán hiba kockázata |
| **Entra CSV Bulk Update (GUI)** | Lassú | Használható (néhány perc feltöltés) |
| **PowerShell / Graph API Script** | 5 másodperc | **Optimális és teljesen automatizálható** |

## Powershell
```powershell
# Csatlakozás a Graphoz, most nincs leírva

$Domain = "tenant.onmicrosoft.com"

#---------------------------------------------------
# 1. LÉPÉS: A három új felhasználó létrehozása

$UsersToCreate = @(
    @{ DisplayName = "Manager Meglep";    GivenName = "Meglep";   Surname = "Manager";  UPN = "manager.meglep@$Domain" },
    @{ DisplayName = "Employee Eredmeny"; GivenName = "Eredmeny"; Surname = "Employee"; UPN = "employee.eredmeny@$Domain" },
    @{ DisplayName = "Employee Erdem";    GivenName = "Erdem";    Surname = "Employee"; UPN = "employee.erdem@$Domain" }
)

$CreatedUsers = @{}

foreach ($User in$UsersToCreate) {
    # Biztonságos ideiglenes jelszó generálása
    $PasswordProfile = @{
        Password = "TempPassword123!#$((Get-Random -Minimum 1000 -Maximum 9999))"
        ForceChangePasswordNextSignIn = $true
    }

    $NewUser = New-MgUser -DisplayName$User.DisplayName `
                         -GivenName $User.GivenName `
                         -Surname $User.Surname `
                         -UserPrincipalName $User.UPN `
                         -MailNickname ($User.UPN.Split('@')[0]) `
                         -AccountEnabled:$true `
                         -PasswordProfile $PasswordProfile

    $CreatedUsers[$User.DisplayName] = $NewUser
    Write-Host "Létrehozva: $($User.DisplayName) (ID: $($NewUser.Id))" -ForegroundColor Green
}

#---------------------------------------------------
# 2. LÉPÉS: Manager Maria lekérése
$Maria = Get-MgUser -UserId "manager.maria@$Domain"

#---------------------------------------------------
# 3. LÉPÉS: Hierarchia beállítása (Manager kapcsolatok)

# Meglep -> Maria beosztottja
Set-MgUserManagerByRef -UserId $CreatedUsers["Manager Meglep"].Id `
                       -OdataId "https://graph.microsoft.com/v1.0/users/$($Maria.Id)"
Write-Host "Manager Meglep felettese beállítva: Manager Maria" -ForegroundColor Yellow

# Eredmeny -> Meglep beosztottja
Set-MgUserManagerByRef -UserId $CreatedUsers["Employee Eredmeny"].Id `
                       -OdataId "https://graph.microsoft.com/v1.0/users/$($CreatedUsers['Manager Meglep'].Id)"
Write-Host "Employee Eredmeny felettese beállítva: Manager Meglep" -ForegroundColor Yellow

# Erdem -> Meglep beosztottja
Set-MgUserManagerByRef -UserId $CreatedUsers["Employee Erdem"].Id `
                       -OdataId "https://graph.microsoft.com/v1.0/users/$($CreatedUsers['Manager Meglep'].Id)"
Write-Host "Employee Erdem felettese beállítva: Manager Meglep" -ForegroundColor Yellow

#---------------------------------------------------
# 4. LÉPÉS: Ellenőrzés
Write-Host "`n--- HIERARCHIA ELLENŐRZÉSE ---" -ForegroundColor Cyan

$MeglepReports = Get-MgUserDirectReport -UserId$CreatedUsers["Manager Meglep"].Id -Property "id,displayName,userPrincipalName"

Write-Host "Manager Meglep beosztottjai:" -ForegroundColor White
foreach ($Report in$MeglepReports) {
    $Name =$Report.AdditionalProperties["displayName"]
    $UPN  =$Report.AdditionalProperties["userPrincipalName"]
    Write-Host " - $Name ($UPN)" -ForegroundColor Green
}

#---------------------------------------------------
#---------------------------------------------------
#---------------------------------------------------
# 1. Meglep és Mimosa fiókjainak lekérése
$Meglep = Get-MgUser -UserId "manager.meglep@$Domain"
$Mimosa = Get-MgUser -UserId "manager.mimosa@$Domain"

# 2. Meglep beosztottjainak átmozgatása Mimosához (for-each)
Write-Host "--- 1. Beosztottak átmozgatása Manager Mimosához ---"

$MeglepReports = Get-MgUserDirectReport -UserId $Meglep.Id -Property "id,displayName,userPrincipalName"

foreach ($Report in $MeglepReports) {
    $ReportId   = $Report.Id
    $ReportName = $Report.AdditionalProperties["displayName"]

    # Új manager beállítása: Manager Mimosa
    Set-MgUserManagerByRef -UserId $ReportId -OdataId "https://graph.microsoft.com/v1.0/users/$($Mimosa.Id)"
    Write-Host " -> $ReportName átirányítva Manager Mimosa alá."
}

# 3. Manager Meglep letiltása és offboarding

# A. Bejelentkezés letiltása
Update-MgUser -UserId $Meglep.Id -AccountEnabled:$false
Write-Host " [x] Fiók bejelentkezése letiltva (AccountEnabled = false)."

# B. Aktív munkamenetek és refresh tokenek azonnali érvénytelenítése Graph REST API hívással
$RevokeUri = "https://graph.microsoft.com/v1.0/users/$($Meglep.Id)/revokeSignInSessions"
Invoke-MgGraphRequest -Method POST -Uri $RevokeUri | Out-Null
Write-Host " [x] Összes aktív munkamenet és token visszavonva."

# C. Licencek megvonása (ha volt hozzárendelve)
$AssignedLicenses = (Get-MgUser -UserId $Meglep.Id -Property "assignedLicenses").AssignedLicenses
if ($AssignedLicenses.Count -gt 0) {
    $RemoveLicenses = $AssignedLicenses | Select-Object -ExpandProperty SkuId
    Set-MgUserLicense -UserId $Meglep.Id -RemoveLicenses $RemoveLicenses -AddLicenses @()
    Write-Host " [x] Összes M365 licenc eltávolítva."
} else {
    Write-Host " [i] Nem volt aktív licenc a fiókon."
}

#---------------------------------------------------
# 4. Mimosa beosztottjainak kiexportálása CSV fájlba
Write-Host "--- 3. Mimosa frissített beosztottjainak exportálása CSV-be ---"

$MimosaReports = Get-MgUserDirectReport -UserId $Mimosa.Id -Property "id,displayName,userPrincipalName"

$ExportData = foreach ($Report in $MimosaReports) {
    [PSCustomObject]@{
        DisplayName       = $Report.AdditionalProperties["displayName"]
        UserPrincipalName = $Report.AdditionalProperties["userPrincipalName"]
        UserId            = $Report.Id
        Manager           = "Manager Mimosa"
    }
}

$CsvPath = "Desktop\Mimosa_Direct_Reports.csv"
$ExportData | Export-Csv -Path $CsvPath -NoTypeInformation -Encoding UTF8

Write-Host " SIKER: Mimosa beosztottjai kiexportálva ide: $CsvPath"

#---------------------------------------------------
# 5. Végső ellenőrző kiírás a konzolra
Write-Host "--- CSV FÁJL TARTALMA ---"
$ExportData | Format-Table -AutoSize
```

## Auto-apply
#### tags
Microsoft Purview, auto apply

```powershell
# 1. retention címke automatikus alkalmazására szolgáló policy létrehozása
New-RetentionCompliancePolicy -Name "AutoApply-GDPR-Policy" `
    -SharePointLocation All `
    -OneDriveLocation All

# 2. A szabály (rule) hozzáadása pl. Hitelkártya adatok detektálására
New-RetentionComplianceRule -Name "AutoApply-CreditCard-Rule" `
    -Policy "AutoApply-GDPR-Policy" `
    -ApplyComplianceTag "GDPR_3_Years_Delete" `
    -ContentMatchQuery 'ContentConcepts:"Credit Card Number"'
```

## API lekérdezések
```powershell
$me = Invoke-MgGraphRequest -Method GET -uri  https://graph.microsoft.com/v1.0/me"
 $me.userPrincipalName
valasz@tenant.onmicrosoft.com
```
