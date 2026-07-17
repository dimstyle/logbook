<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class LogoutController extends Controller
{
    public function handle(){
        return response()->json([
            'message' => 'Success to logout'
        ],Response::HTTP_OK)
        ->withCookie(Cookie::forget('access_token'));
    }
}
