<?php
namespace Modules\User\Repositories;
use Modules\User\Models\Admin;
use Modules\User\Models\User;
use Throwable;
use Illuminate\Support\Facades\Log;

class UserRepository{
    public function createUser(array $userData){
        try{
            User::where('account_id',$userData['account_id'])->update($userData);
        }catch(Throwable $e){
            Log::error("Failed to create data",[
                'exception' => $e 
            ]);
            throw $e;
        }
    }

    public function getUserByAccountId(int $accountId): User{
        try{
            return User::select('account_id', $accountId)->firstOrFail();
        }catch(Throwable $e){
            Log::error('Failed to get data',[
                'exception' => $e
            ]);
            throw $e;
        }
    }


    public function createAdmin(array $adminData){
        try{
            Admin::where('account_id',$adminData['account_id'])->update($adminData);
        }catch(Throwable $e){
            Log::error("Failed to create data",[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function getAdminByAccountId(int $accountId): Admin{
        try{
            return Admin::select('account_id', $accountId)->firstOrFail();
        }catch(Throwable $e){
            Log::error('Failed to get data',[
                'exception' => $e
            ]);
            throw $e;
        }
    }
}