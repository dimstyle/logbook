<?php

namespace Modules\Auth\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Auth\Models\Account;
use Modules\User\Models\Admin;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_register_a_user(): void
    {
        $adminAccount = Account::create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        Admin::create([
            'account_id' => $adminAccount->id,
            'nama_lengkap' => 'Admin',
        ]);

        $this->actingAs($adminAccount, 'api');

        $response = $this->postJson('/api/auth/register', [
            'username' => 'newuser',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'nama_lengkap' => 'New User',
            'sekolah' => 'Example School',
            'jurusan' => 'RPL',
            'nomor_telepon' => '081234567890',
            'periode_awal' => '2026-01-01',
            'periode_akhir' => '2026-01-31',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('message', 'success to create user');

        $this->assertDatabaseHas('accounts', ['email' => 'newuser@example.com']);
        $this->assertDatabaseHas('users', ['nama_lengkap' => 'New User']);
    }
}
