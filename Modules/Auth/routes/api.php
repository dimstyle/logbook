<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\DeleteAccountController;
use Modules\Auth\Http\Controllers\LoginController;
use Modules\Auth\Http\Controllers\LogoutController;
use Modules\Auth\Http\Controllers\RefreshTokenController;
use Modules\Auth\Http\Controllers\RegisterController;


Route::prefix('auth')
->group(function (){
    Route::post('/login', [LoginController::class, 'handle']);
    Route::post('/refresh', [RefreshTokenController::class, 'handle']);
    Route::post('/logout', [LogoutController::class, 'handle']);

    Route::middleware(['jwt','role:admin'])
    ->group(function (){
        Route::post('/register', [RegisterController::class, 'handle']);
        Route::post('/deleteaccount/{id}',[DeleteAccountController::class, 'handle']);
    });
});