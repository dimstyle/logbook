<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /*
        Register Controller
    */
    public function register(){

    }

    /*
        login Controller
    */
    public function login(){
        return Response()->json([
            "message" => "haha",
        ]);
    }
}
