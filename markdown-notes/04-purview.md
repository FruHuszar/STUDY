
# Microsoft Purview

## 1. Purview alaparchitektúra és szerepkörök

A Microsoft Purview az M365 ökoszisztéma adatvédelmi, megfelelőségi és információirányítási platformja. Míg az Entra ID az **identitást**, az Intune pedig az **eszközt** védi, a Purview magát az **adatot (fájlokat, e-maileket, chateket)** védi és szabályozza – függetlenül attól, hogy hol tárolják vagy hová küldik azt.

### Architekturális pillérek

```
[ Microsoft Purview Platform ]
       │
       ├── Information Protection (Sensitivity Labels, Titkosítás, Osztályozás)
       ├── Data Loss Prevention (Exchange, SharePoint/OneDrive, Teams, Endpoint DLP)
       ├── Data Lifecycle & Retention (Adatmegőrzési és törlési szabályok)
       ├── Risk & Compliance (Audit Log, eDiscovery, Compliance Boundaries)
       └── Information Barriers & Insider Risk (Belső kockázatkezelés)

```

---

### RBAC és jogosultsági modell (Purview vs. Entra ID)

A Purview **saját, független Role-Based Access Control (RBAC)** modellt használ. A sima **Global Administrator** vagy **Intune Administrator** szerepkör nem biztosít automatikus hozzáférést a Purview adatvédelmi funkcióihoz.

| Szerepkörcsoport (Role Group) | Hatókör és jogosultságok |
| --- | --- |
| **Compliance Administrator** | Teljes hozzáférés a DLP, Retention és Compliance szabályok kezeléséhez. |
| **Information Protection Admin** | Érzékenységi címkék (Sensitivity Labels) és publikálási szabályok (Label Policies) kezelése. |
| **eDiscovery Manager / Admin** | Keresések és adatkikérések lefolytatása jogi vizsgálatokhoz. |
| **Compliance Data Administrator** | Címkék és szabályok megtekintése, de nem módosíthatja azokat. |

> **Audit & Logging:** A tenant-szintű Unified Audit Log (UAL) naplózza az összes Purview-ban végrehajtott adminisztrátori és felhasználói műveletet. Bekapcsolása és megléte elengedhetetlen a megfelelőségi vizsgálatokhoz.

---

## 2. Information Protection (Sensitivity Labels)

A Sensitivity Label (Érzékenységi címke) a dokumentumokhoz és e-mailekhez rögzített metaadat, amelyhez védelmi logikák (titkosítás, vízjelezés, hozzáférés-korlátozás) társulnak.

```
┌────────────────────────┐
│  Sensitivity Label     │  (Definíció: Vízjel, Titkosítás, Jogok)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│  Sensitivity Policy    │  (Publikálás: Mely felhasználók látják a címkét?)
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│  Office App / File     │  (Alkalmazás: Word, Excel, Outlook, SharePoint)
└────────────────────────┘

```

### Címkeállomány struktúrája (Label Taxonomy)

* **Public:** Nyilvános adatok. Nincs titkosítás vagy korlátozás.
* **General:** Általános céges adatok. Nincs titkosítás, de a cég tulajdonát képezi.
* **Confidential:** Bizalmas üzleti adatok.
* *All Employees:* Céges Azure AD fiókkal rendelkező userek nyithatják meg.
* *Restricted:* Csak megadott csoportok (pl. Pénzügy, Vezetőség) érhetik el.


* **Highly Confidential:** Szigorúan bizalmas adatok. Titkosítás, másolás/nyomtatás tiltása, egyedi vízjelek.

---

## 3. Data Loss Prevention (DLP) és Endpoint DLP

A DLP megakadályozza a bizalmas adatok (személyi számok, bankkártya adatok, belső kódok) jogosulatlan kiszivárgását.

### Védettségi adatforrások (Data Sources)

1. **Exchange Online:** Kimenő és belső e-mailek és mellékletek szűrése.
2. **SharePoint & OneDrive:** Fájlok valós idejű és háttérbeli pásztázása.
3. **Teams Chat & Channel Messages:** Bizalmas információk küldésének tiltása chatben.
4. **Endpoint DLP (Windows 11):** Az Intune által kezelt gépeken futó fájlműveletek ellenőrzése:
* Pendrive-ra / külső adathordozóra másolás tiltása.
* Vágólapra másolás (Copy/Paste) blokkolása.
* Nem engedélyezett felhőtárhelyre (pl. személyes Google Drive, Dropbox) vagy nem jóváhagyott böngészőbe való feltöltés tiltása.
* Hálózati nyomtatás tiltása.



---

## 4. Compliance Boundaries és Search Permissions Filters

Bizonyos szervezeti felépítéseknél (pl. leányvállalatok, HR vs. IT) követelmény, hogy egy eDiscovery Manager ne láthassa a teljes tenant összes postafiókját és fájlját, csak egy meghatározott kört.

### Működési logika

A **Compliance Boundaries** keretrendszer nem a GUI gombjait rejti el, hanem a háttérben futó eDiscovery keresési lekérdezést módosítja automatikusan a **Search Permissions Filter** segítségével.

```
[ eDiscovery Manager keresést indít ] 
                  │
                  ▼
┌──────────────────────────────────────────────────┐
│  Search Permissions Filter (Automatikus becsatolás)│
│  "AND (Recipient -eq 'department_marketing')"    │
└─────────────────┬────────────────────────────────┘
                  │
                  ▼
[ Eredmény: Csak a Marketing osztály adatai jelennek meg ]

```

---

## 5. M365 Business Premium keretek és korlátok

A Business Premium licenccel elérhető Purview funkciók és az Enterprise E5 különbségei:

| Funkció | Business Premium (SPB) | Enterprise E5 / Purview E5 |
| --- | --- | --- |
| **Sensitivity Label Címkézés** | **Manuális** (A felhasználó választja ki) | **Automatikus** (AI/Szabály alapú automatikus rásütés) |
| **DLP Terjedelem** | Exchange, SPO, ODB, Teams, Endpoint DLP | Kibővített szűrők, On-premises scanner |
| **Audit Log Megőrzés** | 180 nap | 1 év vagy több |
| **Retention Policies** | Alapvető megőrzési szabályok | Eszközalapú rekordkezelés és eseményalapú törlés |

---

## 6. Teljes PowerShell Munkamenet és Szabálykezelés

A Purview felületét nem a standard Microsoft Graph SDK-val, hanem a **Security & Compliance PowerShell** felületen keresztüli REST munkamenettel kezeljük (`Connect-IPPSSession`).

```powershell
# ==============================================================================
# 1. CSATLAKOZÁS A SECURITY & COMPLIANCE (PURVIEW) MUNKAMENETHEZ
# ==============================================================================
Import-Module ExchangeOnlineManagement

# REST-alapú munkamenet indítása (RPS elavult, a háttérben REST API fut)
Connect-IPPSSession -UserPrincipalName "admin@company91.onmicrosoft.com"

# ==============================================================================
# 2. ÉRZÉKENYSÉGI CÍMKÉK (SENSITIVITY LABELS) LEKÉRDEZÉSE ÉS BEÁLLÍTÁSA
# ==============================================================================
# Tenantban lévő összes címke lekérése
Get-Label | Select-Object Name, DisplayName, ContentType, Disabled

# Új bizalmas címke létrehozása titkosítási definícióval
New-Label -Name "Confidential-Internal" `
          -DisplayName "Confidential | Internal Only" `
          -ToolTip "Céges belső használatra korlátozott dokumentumok." `
          -Comment "A dokumentumot csak a cég belső munkatársai nyithatják meg."

# Címke publikálása a felhasználóknak (Label Policy)
New-LabelPolicy -Name "Global-Sensitivity-Publish-Policy" `
                -Labels "Confidential-Internal" `
                -ApplyTo "All"

# ==============================================================================
# 3. DATA LOSS PREVENTION (DLP) SZABÁLYOK KEZELÉSE
# ==============================================================================
# Létező DLP házirendek lekérése
Get-DlpCompliancePolicy | Select-Object Name, Enabled, Mode

# Új DLP Házirend létrehozása hitelkártya adatok védelmére (Exchange + SPO/ODB)
New-DlpCompliancePolicy -Name "DLP-Protect-CreditCardData" `
                        -ExchangeLocation All `
                        -SharePointLocation All `
                        -OneDriveLocation All `
                        -Mode Enable

# DLP Szabály létrehozása a házirendhez (Pénzügyi adat érzékelése és blokkolása)
New-DlpComplianceRule -Name "Rule-Block-CreditCard-External" `
                      -Policy "DLP-Protect-CreditCardData" `
                      -ContentContainsSensitiveInformation @(@{Name="Credit Card Number"; MinCount="1"}) `
                      -AccessScope NotInOrganization `
                      -BlockAccess $true

# ==============================================================================
# 4. COMPLIANCE BOUNDARIES ÉS SEARCH PERMISSIONS FILTER BEÁLLÍTÁSA
# ==============================================================================
# Keresési szűrő létrehozása: Korlátozzuk az eDiscovery Manager-t egy megadott fiókkörre
New-ComplianceSecurityFilter -FilterName "RestrictToMarketingDepartment" `
                             -Users "eDiscoveryManagerGroup@company91.onmicrosoft.com" `
                             -Filters "Mailbox_Department -eq 'Marketing'" `
                             -Action All

# Meglévő szűrők ellenőrzése
Get-ComplianceSecurityFilter

```
