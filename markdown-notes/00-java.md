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
package app;

public class GondolatOlvasoProgram {

    static String[] pakli = new String[22];
    static int valasztottOszlop;
    static java.util.Scanner scanner = new java.util.Scanner(System.in);

    public static void main(String[] args) {
        feltolt();
        for (int i = 0; i < 3; i++) {
            kirak();  // 1 tömb
            melyik(); // Scanner
            kever();  // középre
        }
        ezVolt(); // 11., azaz középső lap
    }

    private static void feltolt() {
        // Tiszta, rejtett karakterektől mentes szimbólumok
        String[] szinek = {"♠", "♣", "♥", "♦"};
        String[] ertekek = {"Ász", "Kir", "Fel", "X", "IX", "VIII"};
        int db = 0;
        for (String szin : szinek) {
            for (String ertek : ertekek) {
                String lap = szin + "_" + ertek;
                if (db < 21) {
                    pakli[++db] = lap;
                }
            }
        }
    }

    /**
     * tömb elemeit hármasával
     */
    private static void kirak() {
        for (int i = 1; i <= 21; i++) {
            System.out.print(szinez(pakli[i]));
            if (i % 3 == 0) {
                System.out.println();
            }
        }
    }

    private static String szinez(String lap) {
        int szelesseg = 10;
        int szokozok = szelesseg - lap.length();
        String potlas = " ".repeat(Math.max(0, szokozok));

        if (lap.contains("♥") || lap.contains("♦")) {
            // A színkódot lezáró \u001B[0m MÖGÉ tesszük a szóközöket!
            return "\u001B[31m" + lap + "\u001B[0m" + potlas;
        }
        return lap + potlas;
    }

    /**
     * Scanner 1-3 közötti szám
     */
    private static void melyik() {
        do {
            System.out.print("\nMelyik oszlopban van a lapod? (1-3): ");
            valasztottOszlop = scanner.nextInt();
        } while (valasztottOszlop < 1 || valasztottOszlop > 3);
    }

    /**
     * választott oszlop középre, a sorrendje ne változzon!
     */
    private static void kever() {
        String[] ujPakli = new String[22];

        switch (valasztottOszlop) {
            case 1 -> {
                // 1-es oszlop középre -> sorrend: 2. oszlop, 1. oszlop, 3. oszlop
                for (int i = 1; i <= 7; i++) {
                    ujPakli[i] = pakli[20 - (i - 1) * 3]; // 2. oszlop (alulra)
                    ujPakli[i + 7] = pakli[19 - (i - 1) * 3]; // 1. oszlop (középre)
                    ujPakli[i + 14] = pakli[19 - (i - 1) * 3]; // 3. oszlop (felülre)
                }
            }

            case 2 -> {
                // 2-es oszlop középre -> sorrend: 1. oszlop, 2. oszlop, 3. oszlop
                for (int i = 1; i <= 7; i++) {
                    ujPakli[i] = pakli[19 - (i - 1) * 3]; // 1. oszlop (alulra)
                    ujPakli[i + 7] = pakli[20 - (i - 1) * 3]; // 2. oszlop (középre)
                    ujPakli[i + 14] = pakli[21 - (i - 1) * 3]; // 3. oszlop (felülre)
                }
            }

            case 3 -> {
                // 3-as oszlop középre -> sorrend: 1. oszlop, 3. oszlop, 2. oszlop
                for (int i = 1; i <= 7; i++) {
                    ujPakli[i] = pakli[19 - (i - 1) * 3]; // 1. oszlop (alulra)
                    ujPakli[i + 7] = pakli[21 - (i - 1) * 3]; // 3. oszlop (középre)
                    ujPakli[i + 14] = pakli[20 - (i - 1) * 3]; // 2. oszlop (felülre)
                }
            }
        }

        pakli = ujPakli;
    }

    /**
     * visszaadjuk a középső lapot, ami 21 elemnél a [11]
     */
    private static void ezVolt() {
        System.out.println("\nA gondolt lapod: " + szinez(pakli[11]));
    }
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
