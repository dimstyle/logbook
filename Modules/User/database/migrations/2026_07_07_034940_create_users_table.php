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
            $table->string('username');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('sekolah');
            $table->string('jurusan');
            $table->string('nomor_telepon');
            $table->integer('hadir')->default(0);
            $table->integer('tidak_masuk')->default(0);
            $table->integer('laporan')->default(0);
            $table->date('periode_awal');
            $table->date('periode_akhir');
            $table->string('role')->default('user');
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
