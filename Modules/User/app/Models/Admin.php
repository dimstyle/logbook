<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Modules\User\Database\Factories\AdminFactory;

#[Fillable([
    'account_id',
    'nama_lengkap',
    'perusahaan',
    'divisi',
    'nomor_telepon',
    'siswa_pkl',
    'sekolah_mitra',
    'laporan_hari_ini',
])]
class Admin extends Model
{
    use HasFactory, Notifiable;

    protected static function newFactory(): Factory
    {
        return AdminFactory::new();
    }
}
