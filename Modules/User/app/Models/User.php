<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Modules\User\Database\Factories\UserFactory;

#[Fillable([
    // account
    'account_id', 'admin_id',

    // User info
    'nama_lengkap','sekolah','jurusan','nomor_telepon',
    'hadir','tidak_masuk','laporan',

    //range date
    'periode_awal', 'periode_akhir'
])]
class User extends Model{
    use HasFactory, Notifiable;

    protected static function newFactory(): Factory
    {
        return UserFactory::new();
    }
}