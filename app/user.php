<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 */

class User extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'nama_lengkap',
        'sekolah',
        'jurusan',
        'email',
        'nomor_telepon',
        'username',
        'password',
    ];
}
