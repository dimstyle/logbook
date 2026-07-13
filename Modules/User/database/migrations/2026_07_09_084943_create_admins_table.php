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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->unique()->constrained();
            $table->string('perusahaan')->default('N/A');
            $table->string('divisi')->default('N/A');
            $table->string('nomor_telepon')->default('N/A');
            $table->integer('siswa_pkl')->default(0);
            $table->integer('sekolah_mitra')->default(0);
            $table->integer('laporan_hari_ini')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
