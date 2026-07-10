<?php

namespace Modules\Auth\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\Auth\Models\Account;
use Modules\User\Models\Admin;

class AdminDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $account = Account::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'username' => 'admin',
                'password' => Hash::make('password'),
                'role' => 'admin'
            ]
        );
        Admin::firstOrCreate(
            ['account_id' => $account->id]
        );

    }
}
