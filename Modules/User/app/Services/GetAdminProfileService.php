<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Log;
use Modules\User\Models\Admin;
use Modules\User\Repositories\UserRepository;

class GetAdminProfileService
{
    public function __construct(
        private UserRepository $userRepository
    ){}
    public function handle(int $accountId): Admin {
        $user = $this->userRepository->getAdminByAccountId($accountId);

        Log::info("Success to fetch Admin",[
            'account_id' => $accountId
        ]);

        return $user;
    }
}
