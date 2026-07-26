<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Format;
use Intervention\Image\Laravel\Facades\Image;
use Modules\User\Repositories\UserRepository;
use Storage;
use Str;

class UpdateAdminProfileService
{

    public function __construct(
        private UserRepository $userRepository  
    ){}
    public function handle(array $updateData) {
        $account = Auth::user();
        $id = $account ->id;
        $role = $account->role;

        if(array_key_exists('password', $updateData)){
            $updateData['password'] = Hash::make($updateData['password']);
        }

        if(array_key_exists('profile_photo', $updateData)){

            $encoded = $this->loadAndCompressPhoto($updateData);

            $path = 'profile-photos/'.$id.'/'. Str::uuid() . '.webp';

            $old_path = $this->userRepository->getUserPhoto($id, $role);
            
            Storage::disk('public')->delete($old_path);

            Storage::disk('public')->put(
                $path,
                $encoded
            );

            $updateData['profile_photo'] = $path;
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
            'nomor_telepon',
            'profile_photo'
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

    private function loadAndCompressPhoto(array $updateData){
        $image = Image::decode($updateData['profile_photo']);

        $encoded = $image->encodeUsingFormat(
            Format::WEBP,
            quaility: 80
        );

        return $encoded;
    }
}
