<?php

namespace Modules\User\Services;
use Modules\User\DTO\CreateUserInfoDTO;
use Modules\User\Repositories\UserRepository;
use Illuminate\Support\Facades\Log;

class CreateUserInfoService
{
    public function __construct(
        private UserRepository $userRepository
    ){}


    public function handle(CreateUserInfoDTO $userData){
        $this->userRepository->createUser($userData->toArray()); 

        Log::info("Success to create user info",$userData->toArray());
    }   
}
