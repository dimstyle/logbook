<?php

namespace Modules\User\Services;
use Illuminate\Support\Facades\Log;
use Modules\User\DTO\CreateAdminInfoDTO;
use Modules\User\Repositories\UserRepository;

class CreateAdminInfoService
{
    public function __construct(
        private UserRepository $userRepository
    ){}
    public function handle(CreateAdminInfoDTO $adminData) {
        $this->userRepository->createAdmin($adminData->toArray());

        Log::info("Success to creaet data",[
            'account_id' => $adminData->account_id
        ]);
    }
}
