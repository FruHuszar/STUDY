# Asztali alkalmazások
#### tags
asztali alkalmazások, java, encoding, utf8, assert, ant

Program írása: milyen adatokat hogyan dolgozunk fel.

```markdown
-Dstdout.encoding=UTF-8, -Dstderr.encoding=UTF-8, -ea
```

## Metódus 
két féle lehet: static és nem static és Static csak statikot lát. 
A szignatúrába nem tartozik bele a típus.
Túlterhelésnél megegyezik a nevük de eltér a paraméterek száma vagy típusa

### Paraméterek
- formális: a metódusban van
- aktuális: híváskor adjuk be

```java
//Példa a túlterhelésre
m();
m(2);
m(a, "b"); //Aktuális paraméterek

def void m(){...}
void m(){int a}
void m(){int a, string b} //Formális paraméterek
```


```java
// A Random osztályból példányosítjuk az rnd példányt
Random rnd = new Random();
```

## Függvény
return

## Eljárás
void

---

## "Gondolatolvasó" Program
### A Keverés Algoritmusa (`kever()`)

A 21 lapos kártyatrükk kulcsa a **keverési algoritmus**. A cél az, hogy a felhasználó által választott oszlopot (7 lap) **érintetlen belső sorrenddel a pakli pontos közepére** (a 8–14. pozíciók közé) mozgassuk úgy, hogy az oszlopokat alulról felfelé gyűjtjük össze.

```java
/**
 * Összegyűjti az oszlopokat alulról felfelé, és a választott oszlopot
 * garantáltan a pakli KÖZÉPSŐ (8–14.) szegmensébe helyezi.
 */
private static void kever() {
    String[] ujPakli = new String[22]; // 1-es indexelést használunk (1..21)

    switch (valasztottOszlop) {
        case 1:
            // 1-es oszlop középre -> Sorrend: 2. oszlop (alul), 1. oszlop (közép), 3. oszlop (felül)
            for (int i = 1; i <= 7; i++) {
                ujPakli[i]      = pakli[20 - (i - 1) * 3]; // 2. oszlop elemei
                ujPakli[i + 7]  = pakli[21 - (i - 1) * 3]; // 1. oszlop elemei (TARGET)
                ujPakli[i + 14] = pakli[19 - (i - 1) * 3]; // 3. oszlop elemei
            }
            break;

        case 2:
            // 2-es oszlop középre -> Sorrend: 1. oszlop (alul), 2. oszlop (közép), 3. oszlop (felül)
            for (int i = 1; i <= 7; i++) {
                ujPakli[i]      = pakli[19 - (i - 1) * 3]; // 1. oszlop elemei
                ujPakli[i + 7]  = pakli[20 - (i - 1) * 3]; // 2. oszlop elemei (TARGET)
                ujPakli[i + 14] = pakli[21 - (i - 1) * 3]; // 3. oszlop elemei
            }
            break;

        case 3:
            // 3-as oszlop középre -> Sorrend: 1. oszlop (alul), 3. oszlop (közép), 2. oszlop (felül)
            for (int i = 1; i <= 7; i++) {
                ujPakli[i]      = pakli[19 - (i - 1) * 3]; // 1. oszlop elemei
                ujPakli[i + 7]  = pakli[21 - (i - 1) * 3]; // 3. oszlop elemei (TARGET)
                ujPakli[i + 14] = pakli[20 - (i - 1) * 3]; // 2. oszlop elemei
            }
            break;
    }

    pakli = ujPakli; // Felülírjuk az eredeti tömbreferenciát
}
```

### A Matematikai Képlet Működése

Mivel a kártyák lerakása sorfolytonos (1., 2., 3. oszlopba egymás után), a kártyák indexei a `pakli` tömbben 3-as lépésközzel követik egymást.

### 1. Oszlop-visszafejtési képletek ($i = 1 \dots 7$)

Az oszlopok alulról felfelé történő felvételéhez a tömb végétől számolunk visszafelé:

* **1. oszlop elemei:** `21, 18, 15, 12, 9, 6, 3` $\rightarrow$ Képlet: `21 - (i - 1) * 3`
* **2. oszlop elemei:** `20, 17, 14, 11, 8, 5, 2` $\rightarrow$ Képlet: `20 - (i - 1) * 3`
* **3. oszlop elemei:** `19, 16, 13, 10, 7, 4, 1` $\rightarrow$ Képlet: `19 - (i - 1) * 3`

### 2. Célpozíciók az `ujPakli`-ban

Egyetlen `for` ciklus 7 iteráció alatt tölti fel a 21 elemű új tömb három szegmensét:

* `ujPakli[i]` ($1 \dots 7$): **Alsó blokk** (7 lap)
* `ujPakli[i + 7]` ($8 \dots 14$): **Középső blokk** $\leftarrow$ *Ide írjuk a kiválasztott oszlopot!*
* `ujPakli[i + 14]` ($15 \dots 21$): **Felső blokk** (7 lap)

#### Komplexitás

* **Időkomplexitás:** $\mathcal{O}(1)$ – A ciklus szigorúan 7 lépést tesz meg, függetlenül az adatoktól.
* **Térkomplexitás:** $\mathcal{O}(1)$ – Egyetlen fix, 22 elemű segédtömböt használ.
