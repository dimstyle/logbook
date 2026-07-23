<?php

namespace Modules\Auth\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;
use Modules\Attendance\Models\Attendance;
use Modules\Auth\DTO\LoginDTO;
use Modules\Auth\Models\Account;
use Modules\Auth\Repositories\AuthRepository;

class LoginService
{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository
    ) {}

    public function handle(LoginDTO $userData): string
    {
        if (! $access_token = Auth::attempt($userData->toArray())) {
            Log::warning('Invalid password or email');
            throw new UnauthorizedException('Invalid password or email');
        }

        Log::info('User authorized');

        return $access_token;
    }
}