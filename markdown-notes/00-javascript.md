# Javascript ismétlés
#### tags
js, javascript, es6, ismétlés, suli, mvc, modell, controller, view

## MVC modell

### Részletes leírás pontokba szedve:

* **Index:** Belépési pont, csak importál és meghívja a controllert.
* **Modell (Model):** Kizárólag az adatokért felelős. Logikailag független a megjelenítéstől (se HTML DOM, se CSS nem tartozik hozzá). Olyan műveleteket végez, mint a változók frissítése, listák kezelése, szűrés vagy rendezés.
* **Vezérlő (Controller):** Az összekötő elem. Itt iratkozunk fel a nézetből érkező eseményekre (például kattintásokra), és itt példányosítjuk a nézetet (meghívja a modell megfelelő tagfügvényeit).
* **Nézet (View):** A vizuális felület, amely csak a kijelzésért és az állapot megjelenítéséért felel, adatokat közvetlenül nem módosíthat.
"""

| Komponens | Fő felelősség / Szerep | Mit CSINÁLHAT? (Engedélyezett) | Mit NEM csinálhat? (Tiltott) |
| :--- | :--- | :--- | :--- |
| **Modell** *(Model)* | Adatkezelés és üzleti logika | • Adatok kezelése<br>• Lista- és változómódosítás<br>• Szűrés, rendezés | • HTML DOM módosítása<br>• CSS formázás<br>• Kommunikáció a View-val |
| **Vezérlő** *(Controller)* | Kapcsolatteremtő és koordinátor | • Feliratkozás a View eseményeire<br>• View példányosítása<br>• Híd a Modell és a View között | • UI közvetlen kirajzolása<br>• Önáló adatmódosítás |
| **Nézet** *(View)* | Állapotmegjelenítés és UI | • A program állapotának kijelzése<br>• Vizuális felület biztosítása | • Adatmódosítás |

## Rendezés
```javascript
    rendezLista(){
        return this.#lista.sort((elem1,elem2)=>{
            return elem1.nev > elem2.nev ? 1 : -1;
        });
    }
```

## Szűrés
```javascript
    szuresLista(){
        const SZURTLISTA = this.#lista.filter((elem)=>{
            return elem.ertek == true;
        });

        return SZURTLISTA;
    }
```
