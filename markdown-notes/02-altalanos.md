# Általános

## SOLID

#### tags
solid, oop, alapelv

A SOLID elvek az objektumorientált szoftverfejlesztés öt alapelvét jelentik. Céljuk, hogy a kód könnyen karbantartható, bővíthető és tesztelhető maradjon.

- **Single Responsibility Principle (Egyetlen Felelősség Elve):** Egy osztálynak csak egyetlen oka lehet a változásra, vagyis egyetlen jól körülhatárolt feladata vagy felelőssége lehet.
- **Open/Closed Principle (Nyílt/Zárt Elv):** A szoftveregységek legyenek nyitottak a bővítésre, de zártak a módosításra. Ez azt jelenti, hogy ha egy új funkciót vagy működést szeretnél hozzáadni a rendszerhez, azt a meglévő, már működő és letesztelt kód átírása nélkül, új kód vagy osztály hozzáadásával kelljen megoldani.
- **Liskov Substitution Principle (Liskov Behelyettesítési Elv):** A gyermek osztályoknak teljes mértékben helyettesíthetőknek kell lenniük a szülő osztályaikkal anélkül, hogy a program helyes működése megsérülne. Ha van egy `Madár` szülőosztályod `repül()` metódussal, és abból származtatod a `Pingvin` osztályt, a pingvin nem tud repülni, így sérül az elv.
- **Interface Segregation Principle (Interfész Elkülönítés Elve):** Egyetlen osztályt se kényszerítsünk olyan interfészek megvalósítására, amelyek metódusait az adott osztály valójában nem használja. Ahelyett, hogy egyetlen óriás interfészt hoznál létre 20 metódussal, hozz létre több kicsi, specifikus interfészt.
- **Dependency Inversion Principle (Függőségek Felcserélésének Elve):** A magas szintű modulok ne függjenek az alacsony szintű moduloktól; mindkettő absztrakcióktól függjön. Ennek gyakorlati megnyilvánulása a Dependency Injection: az osztály ne maga hozza létre a belső függőségeit, hanem kívülről, például a konstruktoron keresztül kapja meg azokat.

## OOP

#### tags
oop, alapelv

Az OOP (Object-Oriented Programming) egy olyan programozási paradigma, amely az adatokat és a rajtuk végzett műveleteket egyetlen egységbe, úgynevezett objektumokba szervezi. Négy fő alappillére van.

- **Encapsulation (Adatrejtés):** Az adatok és a rajtuk végzett műveletek egyetlen osztályba zárása, valamint az adatok közvetlen elérésének korlátozása láthatósági szintekkel (`private`, `protected`, `public`). A belső állapotot elrejtjük, és csak vezérelt, publikus metódusokon keresztül engedjük módosítani, védve az adat integritását.
- **Abstraction (Absztrakció):** A komplex belső működés elrejtése a felhasználó elől, és csak a lényegi, szükséges felület megmutatása. Amikor meghívod a `$db->getConnection()` metódust, nem kell tudnod, hogy a háttérben hány socket nyílt meg vagy hogyan épült fel a TCP csomag, csak a végeredményt használod.
- **Inheritance (Öröklődés):** Olyan mechanizmus, amely lehetővé teszi, hogy egy új osztály átvegye egy meglévő osztály adattagjait és metódusait az `extends` kulcsszóval. Segít elkerülni a kódismétlést, és hierarchikus kapcsolatot hoz létre az osztályok között.
- **Polymorphism (Többalakúság):** Azon képesség, hogy a különböző osztályokhoz tartozó objektumok reagálhatnak ugyanarra a metódushívásra, de a saját specifikus módjukon. Például ha van egy `Shape` interfészed `getArea()` metódussal, a `Circle` és a `Square` osztály is megvalósítja azt, de a területet teljesen eltérő matematikai képlettel számolják ki.
