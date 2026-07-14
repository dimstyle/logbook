<?php

namespace Modules\User\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\User\Repositories\UserRepository;

class GetListUsersInfoService
{

    public function __construct(
        private UserRepository $userRepository
    ){}

    public function handle(): Collection{
        $adminAccount = Auth::user();

        $listUsers = $this->userRepository->getListUsersByAdminID($adminAccount->id);

        Log::info('Success to get list users',[
            'admin_id' => $adminAccount->id
        ]);

        return $listUsers;
    }
}
