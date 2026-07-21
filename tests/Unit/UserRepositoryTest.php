<?php

namespace Tests\Unit;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Modules\Auth\Models\Account;
use Modules\User\Models\Admin;
use Modules\User\Models\User;
use Modules\User\Repositories\UserRepository;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role')->default('user');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->foreignId('admin_id')->constrained('accounts');
            $table->string('nama_lengkap')->default('N/A');
            $table->string('sekolah')->default('N/A');
            $table->string('jurusan')->default('N/A');
            $table->string('nomor_telepon')->default('N/A');
            $table->timestamps();
        });

        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->string('nama_lengkap')->default('N/A');
            $table->string('perusahaan')->default('N/A');
            $table->string('divisi')->default('N/A');
            $table->string('nomor_telepon')->default('N/A');
            $table->timestamps();
        });
    }

    public function test_admin_profile_fields_are_saved_to_admin_table(): void
    {
        $account = Account::create([
            'username' => 'admin1',
            'email' => 'admin1@example.com',
            'password' => bcrypt('secret'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::create([
            'account_id' => $account->id,
            'admin_id' => $account->id,
            'nama_lengkap' => 'Old Name',
        ]);

        Admin::create([
            'account_id' => $account->id,
            'nama_lengkap' => 'Old Name',
            'perusahaan' => 'Old Company',
        ]);

        $repository = new UserRepository();

        $repository->updateAdminProfileByAccountID(
            ['email' => 'updated@example.com'],
            ['perusahaan' => 'New Company'],
            $account->id
        );

        $this->assertSame('updated@example.com', $account->fresh()->email);
        $this->assertSame('New Company', Admin::where('account_id', $account->id)->first()->perusahaan);
    }
}
