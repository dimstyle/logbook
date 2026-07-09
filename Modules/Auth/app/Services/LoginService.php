<?php

namespace Modules\Auth\Services;
use Illuminate\Validation\UnauthorizedException;
use Modules\Auth\Repositories\AuthRepository;
use Modules\Auth\DTO\LoginDTO;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LoginService{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository
    ){}

    public function handle(LoginDTO $userData): string{
        if(!$access_token = Auth::attempt($userData->toArray())){
            Log::warning("Invalid password or email");
            throw new UnauthorizedException("Invalid password or email");
        }   

        Log::info("User authorized");

        return $access_token;
    }
}