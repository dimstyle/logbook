<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\User\Repositories\UserRepository;

class GetUserProfileService
{
    public function __construct(
        private UserRepository $userRepository
    ){}

    public function handle(int $accountId): array {

        $user = $this->userRepository->getUserByAccountId($accountId);
       
        Log::info('Success to get user',[
            'account_id' => $accountId
        ]);
        

        Log::info($user);

        $userAccount = Auth::user();

        return [
            'username'=> $userAccount->username,
            'email' => $userAccount->email,
            'role' => $userAccount->role,
            ...$user->toArray()
        ];
    }
}
