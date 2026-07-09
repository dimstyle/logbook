<?php

namespace Modules\Auth\Services;
use Modules\Auth\Repositories\AuthRepository;
use Modules\Auth\DTO\LoginDTO;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

class LoginService{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository
    ){}

    public function index(LoginDTO $userData){
        $email = $userData->email;
        $data = $this->authRepository->getAccountByEmail($email);

        
        $reqPassword = $userData->password;
        $password = $data->password;

        if(!$this->checkPassword($reqPassword, $password)){
            Log::warning("Invalid password or email",[
                'account_id' => $data->account_id,
                'username' => $data->username
            ]);
            throw new AuthenticationException("invalid email or password");
        }

        
    }

    private function checkPassword(string $requestPassword, string $hashedPassword): bool{
        return Hash::check($requestPassword, $hashedPassword);
    }

}