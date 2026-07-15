<?php

namespace Modules\Auth\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Auth\Models\Account;
use Modules\User\Models\Admin;

class AdminDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'email' => 'admin@example.com',
                'username' => 'admin',
                'nama_lengkap' => 'Super Admin',
                'perusahaan' => 'Acme Corp',
                'divisi' => 'IT',
                'nomor_telepon' => '081234000000',
            ],
            [
                'email' => 'admin2@example.com',
                'username' => 'admin2',
                'nama_lengkap' => 'Admin Two',
                'perusahaan' => 'Acme Corp',
                'divisi' => 'Operations',
                'nomor_telepon' => '081234000001',
            ],
            [
                'email' => 'admin3@example.com',
                'username' => 'admin3',
                'nama_lengkap' => 'Admin Three',
                'perusahaan' => 'Acme Corp',
                'divisi' => 'Support',
                'nomor_telepon' => '081234000002',
            ],
        ];

        foreach ($admins as $data) {
            $account = Account::firstOrCreate(
                ['email' => $data['email']],
                Account::factory()->raw([
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'role' => 'admin',
                ])
            );

            Admin::firstOrCreate(
                ['account_id' => $account->id],
                Admin::factory()->raw([
                    'account_id' => $account->id,
                    'nama_lengkap' => $data['nama_lengkap'] ?? 'N/A',
                    'perusahaan' => $data['perusahaan'] ?? 'N/A',
                    'divisi' => $data['divisi'] ?? 'N/A',
                    'nomor_telepon' => $data['nomor_telepon'] ?? 'N/A',
                ])
            );
        }
    }
}
