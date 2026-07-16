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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained()->onDelete('cascade');
            $table->date('date');

            $table->boolean('izin')->default(false);
            $table->string('alasan_izin')->default('');

            $table->boolean('sakit')->default(false);

            $table->boolean('sudah_hadir')->default(false);
            $table->time('jam_hadir')->nullable();
            $table->boolean('wfh')->default(false);
                
            $table->boolean('sudah_pulang')->default(false);
            $table->time('jam_pulang')->nullable();

            $table->boolean('sudah_laporan')->default(false);
            $table->string('laporan')->default('');
            $table->json('images_path')->default('[]');
    
            $table->timestamps();

            $table->unique(['account_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
