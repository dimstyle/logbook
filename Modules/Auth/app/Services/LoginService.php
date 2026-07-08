<?php

namespace Modules\Auth\Services;
use Modules\Auth\Repositories\AuthRepository;
use Modules\Auth\DTO\LoginAuthDTO;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;

class LoginService{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository
    ){}

    public function index(LoginAuthDTO $userData){
        $email = $userData->email;
        $data = $this->authRepository->getUserByEmail($email);

        
        $reqPassword = $userData->password;
        $password = $data->password;

        if(!$this->checkPassword($reqPassword, $password)){
            throw new AuthenticationException("invalid email or password");
        }
    }

    private function checkPassword(string $requestPassword, string $hashedPassword): bool{
        return Hash::check($requestPassword, $hashedPassword);
    }

}