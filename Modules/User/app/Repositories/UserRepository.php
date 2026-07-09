<?php
namespace Modules\User\Repositories;
use Modules\User\Models\User;
use Throwable;
use Illuminate\Support\Facades\Log;

class UserRepository{
    public function createUser(array $userData): ?User{
        try{
            User::create($userData);
        }catch(Throwable $e){
            Log::error("Failed to create data",[
                'exception' => $e 
            ]);
        }
    }
}