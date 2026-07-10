<?php

namespace Modules\User\Services;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\User\Repositories\UserRepository;
use Modules\User\Models\User;
class GetUserProfileService
{
    public function __construct(
        private UserRepository $userRepository
    ){}

    public function handle(): User {
        $user = Auth::user();


        $accountId = $user->id;
        $user = $this->userRepository->getUserByAccountId($accountId);
       
        Log::info('Success to get user',[
            'account_id' => $accountId
        ]);

        return $user;
    }
}
