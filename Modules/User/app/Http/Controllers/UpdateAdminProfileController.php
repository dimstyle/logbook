<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\User\Services\UpdateAdminProfileService;

class UpdateAdminProfileController extends Controller
{
    public function  __construct(
        private UpdateAdminProfileService $updateAdminProfileService
    ){}

    public function handle(){}
}
