<?php

namespace Modules\Auth\Services;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Auth\Repositories\AuthRepository;
use Modules\Auth\DTO\RegisterDTO;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Modules\User\Repositories\UserRepository;
use Throwable;

class RegisterService{
    /*
        define Services Component
    */
    public function __construct(
        private AuthRepository $authRepository,
        private UserRepository $userRepository
    ){}

    public function handle(RegisterDTO $userData): int{
        $admin = Auth::user();

        $adminId = $admin->id;

        if (! $admin) {
            throw new \RuntimeException('Authenticated admin is required to register a user.');
        }
    
        $this->MakeHashedPassword($userData);

        try{
            DB::beginTransaction();

            $account = $this->authRepository->createAccount(
                $userData->toArray(), 
                $adminId
            );
            $this->userRepository->incrementAdminByAccountId(
                $adminId, 
                'siswa_pkl'
            );
            $this->userRepository->updateAdminByAccountId(
                $adminId,
                'sekolah_mitra',
                $this->countSchools(
                    $adminId,
                    $userData
                )
            );

            DB::commit();
        }catch(Throwable $e){
            DB::rollBack();
            throw $e;
        }

        Log::info('Account Created',[
            'account_id' => $account->id
        ]);

        return $account->id;
    }

    private function MakeHashedPassword(RegisterDTO $userData){
        $HashedPassword = Hash::make($userData->password);
        $userData->password = $HashedPassword;
        return $userData;
    }



    private function countSchools(int $accountId , RegisterDTO $userData){
        $requestSchool = $userData->sekolah;
        $savedSchools = $this->userRepository->getSelectUserByAdminId(
            $accountId, "sekolah"
        )
        ->pluck('sekolah')
        ->toArray() ?? [];

        Log::Info("",$savedSchools);

        $filtered = array_map(
            fn($str) => $this->noSpace($str), 
            $savedSchools
        );

        $filtered[] = $this->noSpace($requestSchool);

        $schoolsSet = array_unique($filtered);

        return count($schoolsSet);
    }

    private function noSpace($str): string{
        return strtolower(str_replace(' ','',$str)) ?? "";
    }
}