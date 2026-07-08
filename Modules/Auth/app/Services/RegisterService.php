<?php

namespace Modules\Auth\Services;
use Illuminate\Support\Collection;
use Modules\Auth\Repositories\AuthRepository;
use Modules\Auth\DTO\RegisterAuthDTO;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterService{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository
    ){}

    public function index(RegisterAuthDTO $userData): void{
        $this->MakeHashedPassword($userData);

        $this->authRepository->createUser($userData->toArray());
    }

    private function MakeHashedPassword(RegisterAuthDTO $userData){
        $HashedPassword = Hash::make($userData->password);
        $userData->password = $HashedPassword;
        return $userData;
    }
}