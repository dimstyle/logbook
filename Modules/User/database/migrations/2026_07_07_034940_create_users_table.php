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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->unique()->constrained()->onDelete('cascade');
            $table->foreignId('admin_id')->constrained('accounts');
            $table->string('nama_lengkap')->default('N/A');
            $table->string('sekolah')->default('N/A');
            $table->string('jurusan')->default('N/A');
            $table->string('nomor_telepon')->default('N/A');
            $table->integer('hadir')->default(0);
            $table->integer('tidak_masuk')->default(0);
            $table->integer('laporan')->default(0);
            $table->date('periode_awal')->default('');
            $table->date('periode_akhir')->default('');
            $table->string('profile_photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
