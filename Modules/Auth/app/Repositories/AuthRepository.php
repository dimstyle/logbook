<?php
namespace Modules\Auth\Repositories;
use Modules\Attendance\Models\Attendance;
use Modules\Auth\Models\Account;
use Modules\User\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\UniqueConstraintViolationException;
use Throwable;

class AuthRepository{
    public function createAccount(array $userData, int $adminId): ?Account{
        try{
            DB::beginTransaction();

            $account = Account::create([
                'username' => $userData['username'],
                'email' => $userData['email'],
                'password' => $userData['password'],
                'role' => 'user',
                'is_active' => true,
            ]);


            User::create([
                'account_id' => $account->id,
                'admin_id' => $adminId,
                'nama_lengkap' => $userData['nama_lengkap'],
                'sekolah' => $userData['sekolah'],
                'jurusan' => $userData['jurusan'],
                'nomor_telepon' => $userData['nomor_telepon'],
                'periode_awal' => $userData['periode_awal'],
                'periode_akhir' => $userData['periode_akhir']
            ]);

            DB::commit();

            return $account;
        }catch(UniqueConstraintViolationException $e){
            DB::rollBack();

            Log::error('email already exists',[
                'exception' => $e
            ]);
            throw $e;
        }catch(Throwable $e){
            DB::rollBack();

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

    public function deleteAccountById(int $id){
        try{
            DB::beginTransaction();

            Account::destroy($id);
            User::where('account_id',$id)->delete();
            Attendance::where('account_id',$id)->delete();

            DB::commit();
        }catch(Throwable $e){
            DB::rollBack();
            Log::error("Failed to delete account",[
                'exception' => $e
            ]);

            throw $e;
        }
    }
}