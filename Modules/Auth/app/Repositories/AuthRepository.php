<?php
namespace Modules\Auth\Repositories;
use Modules\Auth\Models\Account;
use Modules\User\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\UniqueConstraintViolationException;
use Throwable;

class AuthRepository{
    public function createAccount(array $userData): ?Account{
        try{
            $account = Account::create($userData);
            User::create([
                'account_id' => $account->id
            ]);
            return $account;
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