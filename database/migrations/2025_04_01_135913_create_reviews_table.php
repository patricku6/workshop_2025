<?php
// filepath: c:\Users\nick\OneDrive\Desktop\workshop_2025\database\migrations\xxxx_xx_xx_xxxxxx_create_reviews_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('reviews');
    }
};