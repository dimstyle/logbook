<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendaces', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained();

            $table->boolean('sudah_hadir');
            $table->time('jam_hadir');
                
            $table->boolean('sudah_pulang');
            $table->time('jam_pulang');
            
            $table->boolean('wfh');
            
            $table->boolean('sudah_laporan');
            $table->string('laporan');
            $table->json('images_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendaces');
    }
};
