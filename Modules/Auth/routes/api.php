<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\AuthController;

Route::prefix('auth')
->controller(AuthController::class)
->group(function (){
    Route::post('/login','login');
    Route::post('/register','register');
});