<?php

namespace Modules\User\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\User\Models\User;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'account_id' => null,
            'admin_id' => null,
            'nama_lengkap' => $this->faker->name(),
            'sekolah' => $this->faker->company() . ' School',
            'jurusan' => $this->faker->randomElement(['RPL', 'TKJ', 'TKR', 'Multimedia']),
            'nomor_telepon' => $this->faker->phoneNumber(),
            'hadir' => 0,
            'tidak_masuk' => 0,
            'laporan' => 0,
            'periode_awal' => now()->subDays(7)->toDateString(),
            'periode_akhir' => now()->toDateString(),
        ];
    }
}
