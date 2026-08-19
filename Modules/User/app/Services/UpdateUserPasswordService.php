<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UpdateUserPasswordService
{
    public function handle(array $data): void
    {
        $user = auth()->user();

        if (!$user) {
            throw ValidationException::withMessages([
                'current_password' => 'User is not authenticated.'
            ]);
        }

        if (!Hash::check(
            $data['current_password'],
            $user->password
        )) {
            throw ValidationException::withMessages([
                'current_password' => 'Password sebelumnya salah.'
            ]);
        }

        $user->password = Hash::make(
            $data['new_password']
        );

        $user->save();

        JWTAuth::invalidate(
            JWTAuth::getToken()
        );
    }
}