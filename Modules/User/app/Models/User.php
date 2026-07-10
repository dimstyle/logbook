<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    // account
    'account_id',

    // User info
    'sekolah','jurusan','nomor_telepon',
    'hadir','tidak_masuk','laporan',

    //range date
    'periode_awal', 'periode_akhir'
])]
class User extends Model{
    use HasFactory, Notifiable;
}