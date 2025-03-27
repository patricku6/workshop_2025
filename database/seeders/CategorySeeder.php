<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $heren = new Category();
        $heren->name = 'Heren fietsen';
        $heren->save();

        $dames = new Category();
        $dames->name = 'Dames fietsen';
        $dames->save();

        $kinder = new Category();
        $kinder->name = 'Kinder fietsen';
        $kinder->save();
    }
}
