<?php

namespace Modules\User\Services;

use Modules\User\Repositories\UserRepository;

class UpdateAdminProfileService
{

    public function __construct(
        private UserRepository $userRepository  
    ){}
    public function handle() {
        
    }
}
