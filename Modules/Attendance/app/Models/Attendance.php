<?php

namespace Modules\Attendance\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

#[Fillable([
    'account_id',
    'date',
    'izin',
    'alasan_izin',
    'sakit',
    'sudah_hadir',
    'jam_hadir',
    'wfh',
    'sudah_pulang',
    'jam_pulang',
    'sudah_laporan',
    'laporan',
    'images_path',
])]
class Attendance extends Model
{
    protected $casts = [
        'account_id' => 'integer',
        'date' => 'date',
        'izin' => 'boolean',
        'sakit' => 'boolean',
        'sudah_hadir' => 'boolean',
        'wfh' => 'boolean',
        'sudah_pulang' => 'boolean',
        'sudah_laporan' => 'boolean',
        'images_path' => 'array',
    ];
    use HasFactory;

    protected $table = 'attendances';

}
