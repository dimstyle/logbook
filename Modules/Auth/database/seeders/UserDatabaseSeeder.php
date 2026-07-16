<?php

namespace Modules\Auth\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\Auth\Models\Account;
use Modules\User\Models\User;

class UserDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'email' => 'user@example.com',
                'username' => 'user',
                'nama_lengkap' => 'Sample User',
                'sekolah' => 'SMK Negeri 1',
                'jurusan' => 'RPL',
                'nomor_telepon' => '081234000010',
                'password' => 'password1',
                'admin_id' => 1,
            ],
            [
                'email' => 'user2@example.com',
                'username' => 'user2',
                'nama_lengkap' => 'User Two',
                'sekolah' => 'SMK Negeri 2',
                'jurusan' => 'TKJ',
                'nomor_telepon' => '081234000011',
                'password' => 'password2',
                'admin_id' => 1,
            ],
            [
                'email' => 'user3@example.com',
                'username' => 'user3',
                'nama_lengkap' => 'User Three',
                'sekolah' => 'SMK Negeri 3',
                'jurusan' => 'DKV',
                'nomor_telepon' => '081234000012',
                'password' => 'password3',
                'admin_id' => 1,
            ],
        ];

        foreach ($users as $data) {
            $account = Account::firstOrCreate(
                ['email' => $data['email']],
                [
                    'username' => $data['username'],
                    'password' => $data['password'],
                    'role' => 'Siswa',
                ]
            );

            User::firstOrCreate(
                ['account_id' => $account->id],
                [
                    'admin_id' => $data['admin_id'] ?? 1,
                    'nama_lengkap' => $data['nama_lengkap'] ?? 'N/A',
                    'sekolah' => $data['sekolah'] ?? 'N/A',
                    'jurusan' => $data['jurusan'] ?? 'N/A',
                    'nomor_telepon' => $data['nomor_telepon'] ?? 'N/A',
                    'password' => $data['password'] ?? 'N?A',
                    'hadir' => 0,
                    'tidak_masuk' => 0,
                    'laporan' => 0,
                ]
            );
        }
    }
}
