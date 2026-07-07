<?php

use App\Modules\Auth\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix("auth")
->middleware("auth")
->controller(AuthController::class)
->group(function(){
    Route::post('/register', 'register');
    Route::post('/login','login');
});