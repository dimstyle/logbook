<?php

namespace Modules\User\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\User\Models\Admin;

class AdminFactory extends Factory
{
    protected $model = Admin::class;

    public function definition(): array
    {
        return [
            'account_id' => null,
            'nama_lengkap' => $this->faker->name(),
            'perusahaan' => $this->faker->company(),
            'divisi' => $this->faker->jobTitle(),
            'nomor_telepon' => $this->faker->phoneNumber(),
            'siswa_pkl' => 0,
            'sekolah_mitra' => 0,
            'laporan_hari_ini' => 0,
        ];
    }
}
