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
