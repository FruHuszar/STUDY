# Laravel
A Laravel egy ingyenes és nyílt forráskódú PHP webes keretrendszer, amelyet Taylor Otwell hozott létre 2011-ben, és a Symfony alapú modell-nézet-vezérlő architektúra mintát követő webalkalmazások fejlesztésére szolgál.

#### tags
laravel, backend, php

```powershell
composer create-project laravel/laravel tasks_user //project létrehozása
php artisan make:model Task -cmf //modell fájlok létrehozása: controller, migrációs fájl és factoryvel
php artisan migrate //adatbázis migrálása
php artisan migrate:fresh //migrálás újrakezdve (eldobja a korábbi táblákat!)
php artisan serve //futatás
```

- felhasználó tábla mindig létrejön a projecttel.

```php
/**
* Run the migrations.
*/
public function up(): void
{
    Schema::create('tasks', function (Blueprint $table) {
        $table->id(); /*id, alapból autoincrement*/
        $table->string('title'); /*szöveg*/
        $table->text('description')->nullable(); /*szöveg, és nullázható*/
        $table->date('end_Date')->nullable(); /*dátum, nullázható*/
        $table->foreignId('user_id')->constrained() /*külső kulcs*/
        $table->boolean('status')->default(false); /*alapból hamis*/
        $table->timestamps(); /*created_at etc*/
    });
}

/**
 * Reverse the migrations.
 */
public function down(): void
{
    Schema::dropIfExists('tasks'); /*drops the table on down*/
}
```
