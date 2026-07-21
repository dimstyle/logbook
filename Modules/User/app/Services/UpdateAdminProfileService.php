<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Modules\User\Repositories\UserRepository;

class UpdateAdminProfileService
{

    public function __construct(
        private UserRepository $userRepository  
    ){}
    public function handle(array $updateData) {
        $account = Auth::user();
        $id = $account ->id;

        if(array_key_exists('password', $updateData)){
            $updateData['password'] = Hash::make($updateData['password']);
        }

        $accountData = $this->filterData([
            'username' ,
            'email',
            'password'
        ], $updateData);

        $adminData = $this->filterData([
            'nama_lengkap',
            'perusahaan',
            'divisi',
            'nomor_telepon'
        ],$updateData);

        $this->userRepository->updateAdminProfileByAccountID($accountData, $adminData, $id);

        Log::info('Success to update user Profile', [
            'account_id' => $id
        ]);
    }

    private function filterData(array $keys, array $data): array
    {
        $result = [];

        foreach ($keys as $key) {
            if (array_key_exists($key, $data)) {
                $result[$key] = $data[$key];
            }
        }

        return $result;
    }
}
