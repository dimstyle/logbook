<?php

namespace Modules\Auth\Services;
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

    public function index(RegisterDTO $userData): int{
        $this->MakeHashedPassword($userData);

        $account = $this->authRepository->createUser($userData->toArray());

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