<?php
namespace Modules\User\Repositories;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Modules\Auth\Models\Account;
use Modules\User\Models\Admin;
use Modules\User\Models\User;
use Throwable;
use Illuminate\Support\Facades\Log;

class UserRepository{
    public function getUserByAccountId(int $accountId): User{
        try{
            return User::where('account_id', $accountId)->firstOrFail();
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
            return Admin::where('account_id', $accountId)->firstOrFail();
        }catch(Throwable $e){
            Log::error('Failed to get data',[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function getListUsersByAdminID(int $adminId): Collection{
        try{
            return User::where('admin_id', $adminId)
            ->rightjoin('accounts', 'users.account_id' , '=', 'accounts.id')
            ->select(
                'accounts.id',
                'users.nama_lengkap',
                'users.sekolah',
                'users.jurusan',
                'accounts.email',
                'users.profile_photo',
            )->get();
        }catch(Throwable $e){
            Log::error("Failed to get list users",[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function updateUserByAccountID(array $accountData, array $userData, int $accountId){
        try{
            DB::beginTransaction();
            
            User::where('account_id',$accountId)->update($userData);
            Account::where('id', $accountId)->update($accountData);

            DB::commit();
        }catch(Throwable $e){
            DB::rollBack();
            Log::error("Failed to create data",[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function updateAdminProfileByAccountID(array $accountData, array $adminData, int $accountId){
        try{
            DB::beginTransaction();

            Admin::where('account_id', $accountId)->update($adminData);
            Account::where('id', $accountId)->update($accountData);

            DB::commit();
        }catch(Throwable $e){
            DB::rollBack();
            Log::error("Failed to update admin profile",[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function getUserPhoto(int $id, string $role){
        try{
            if($role === "admin"){
                return Admin::select('profile_photo')
                ->where('account_id', $id)
                ->firstOrFail();
            }

            return User::select('profile_photo')
            ->where('account_id', $id)
            ->firstOrFail();
        }catch(Throwable $e){
            Log::error("Failed to get user path",[
                'exception' => $e
            ]);

            throw $e;
        }
    }
    public function incrementAdminByAccountId(int $accountId, string $column, int $inc = 1){
        try{
            Admin::where('account_id' ,$accountId)
            ->increment($column, $inc);
        }catch(Throwable $e){
            Log::error("Failed to increment value",[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function updateAdminByAccountId(int $accountId, string $column, $value){
        try{
            Admin::where('account_id', $accountId)
            ->update([
                $column => $value 
            ]);
        }catch(Throwable $e){
            Log::error("Failed to update Admin data",[
                'exceptionn' => $e
            ]);

            throw $e;
        }
    }

     public function getSelectUserByAdminId(int $accountId, string $column): Collection{
        try{
            return User::where('admin_id', $accountId)
            ->select($column)
            ->get();
        }catch(Throwable $e){
            Log::error("Failed to get data",[
                'exceptionn' => $e
            ]);

            throw $e;
        }
    }

}
