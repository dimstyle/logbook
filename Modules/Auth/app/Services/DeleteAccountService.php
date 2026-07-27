<?php

namespace Modules\Auth\Services;

use Illuminate\Support\Facades\Log;
use Modules\Auth\Repositories\AuthRepository;
use Modules\User\Repositories\UserRepository;
use Storage;

class DeleteAccountService
{
    public function __construct(
        private AuthRepository $authRepository,
        private UserRepository $userRepository
    ){}

    public function handle(int $id) {
        $this->deletePhotoProfile($id, 'user');
        $this->authRepository->deleteAccountById($id);

        Log::info("Success to delete user",[
            'account_id', $id
        ]);
    }

    private function deletePhotoProfile(int $id, string $role){
        $photo_path = $this->userRepository->getUserPhoto($id, $role);
        Storage::disk('public')->delete($photo_path);

        Storage::disk('local')->deleteDirectory('attendance-reports/'.$id);
    }
}
