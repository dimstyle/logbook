<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Validation\UnauthorizedException;
use Modules\Auth\DTO\RegisterDTO;
use Modules\Auth\DTO\LoginDTO;
use Modules\Auth\Services\RegisterService;
use Modules\Auth\Services\LoginService;
use Modules\Auth\Http\Requests\RegisterRequest;
use Modules\Auth\Http\Requests\LoginRequest;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Database\QueryException;     
use OpenApi\Attributes as OA;

use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;

use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /*
        define Controller's services
    */
    public function __construct(
        private RegisterService $registerService, 
        private LoginService $loginService  
    ){}


    /*
        register Controller
    */






    /*
        Refresh Token Controller
    */

}
