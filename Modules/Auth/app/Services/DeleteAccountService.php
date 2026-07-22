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
        $this->deletePhotoProfile($id);
        $this->authRepository->deleteAccountById($id);

        Log::info("Success to delete user",[
            'account_id', $id
        ]);
    }

    private function deletePhotoProfile(int $id){
        $photo_path = $this->userRepository->getUserPhoto($id);
        Storage::disk('public')->delete($photo_path);
    }
}
