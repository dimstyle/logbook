<?php

namespace Modules\Auth\Services;
use Illuminate\Support\Facades\Auth;
use Modules\Auth\Repositories\AuthRepository;
use Modules\Auth\DTO\RegisterDTO;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterService{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository
    ){}

    public function handle(RegisterDTO $userData): int{
        $admin = Auth::user();

        if (! $admin) {
            throw new \RuntimeException('Authenticated admin is required to register a user.');
        }

        $this->MakeHashedPassword($userData);

        $account = $this->authRepository->createAccount($userData->toArray(), $admin->id);

        Log::info('Account Created',[
            'account_id' => $account->id
        ]);

        return $account->id;
    }

    private function MakeHashedPassword(RegisterDTO $userData){
        $HashedPassword = Hash::make($userData->password);
        $userData->password = $HashedPassword;
        return $userData;
    }
}