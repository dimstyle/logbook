<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Auth\Models\Account;
use Modules\User\Models\Admin;
use Modules\User\Models\User;

class UserDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminAccount = Account::where('role', 'admin')->first();

        if (! $adminAccount) {
            $adminAccount = Account::create(
                Account::factory()->raw([
                    'role' => 'admin',
                    'username' => 'seed-admin',
                    'email' => 'seed-admin@example.com',
                ])
            );

            Admin::create(
                Admin::factory()->raw([
                    'account_id' => $adminAccount->id,
                    'nama_lengkap' => 'Seed Admin',
                ])
            );
        }

        for ($i = 1; $i <= 3; $i++) {
            $account = Account::firstOrCreate(
                ['email' => "user{$i}@example.com"],
                Account::factory()->raw([
                    'username' => "user{$i}",
                    'email' => "user{$i}@example.com",
                    'role' => 'user',
                ])
            );

            User::firstOrCreate(
                ['account_id' => $account->id],
                User::factory()->raw([
                    'account_id' => $account->id,
                    'admin_id' => $adminAccount->id,
                ])
            );
        }
    }
}
