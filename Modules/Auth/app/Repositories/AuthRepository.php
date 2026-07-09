<?php
namespace Modules\Auth\Repositories;
use Modules\Auth\Models\Account;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\UniqueConstraintViolationException;
use Throwable;

class AuthRepository{
    public function createUser(array $userData): ?Account{
        try{
            return Account::create($userData);
        }catch(UniqueConstraintViolationException $e){
            Log::error('email already exists',[
                'exception' => $e
            ]);
            throw $e;
        }catch(Throwable $e){
            Log::error("Failed to create account",[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function getAccountByEmail(string $email): Account{
        try{
            return Account::where('email', $email)->firstOrFail();
        }catch(ModelNotFoundException $e){
            Log::warning("Account not found",[
                'email' => $email
            ]);
            throw $e;
        }catch(Throwable $e){
            Log::error("Failed to fetch data from accounts",[
                'exception' => $e
            ]);
            throw $e;
        }


    }
}