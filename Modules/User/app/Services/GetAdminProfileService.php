<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Modules\User\Repositories\UserRepository;

class GetAdminProfileService
{
    public function __construct(
        private UserRepository $userRepository
    ){}
    public function handle(int $accountId): array {
        $user = $this->userRepository->getAdminByAccountId($accountId);

        Log::info("Success to fetch Admin",[
            'account_id' => $accountId
        ]);

        $adminAccount = Auth::user();

        return [
            'username' => $adminAccount->username,
            'email' => $adminAccount->email,
            ...$user->toArray()
        ];
    }
}
