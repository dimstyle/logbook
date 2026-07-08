<?php
namespace Modules\Auth\Repositories;
use Modules\User\Models\User;

class AuthRepository{
    public function createUser(array $userData): ?User{
        return User::create($userData);
    }

    public function getUserByEmail(string $email): User{
        return User::where('email', $email)->firstOrFail();
    }
}