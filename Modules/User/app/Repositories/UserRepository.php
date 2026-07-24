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
            ->join('accounts', 'users.account_id' , '=', 'accounts.id')
            ->leftJoin('attendances', function ($join) {
                $join->on('users.account_id', '=', 'attendances.account_id')
                    ->whereDate('attendances.created_date', now()->toDateString());
            })
            ->select(
                'accounts.id',
                'users.nama_lengkap',
                'users.sekolah',
                'users.jurusan',
                'accounts.email',
                'users.profile_photo',
                DB::raw('COALESCE(attendances.izin, 0) as izin'),
                DB::raw('COALESCE(attendances.sakit, 0) as sakit'),
                DB::raw('COALESCE(attendances.sudah_hadir, 0) as sudah_hadir'),
                DB::raw('COALESCE(attendances.wfh, 0) as wfh'),
                DB::raw('COALESCE(attendances.sudah_pulang, 0) as sudah_pulang'),
                DB::raw('COALESCE(attendances.sudah_laporan, 0) as sudah_laporan'),
                DB::raw('attendances.jam_hadir as jam_hadir'),
                DB::raw('attendances.jam_pulang as jam_pulang'),
                DB::raw('COALESCE(attendances.laporan, "") as laporan'),
                DB::raw('attendances.created_date as created_date')
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


}
