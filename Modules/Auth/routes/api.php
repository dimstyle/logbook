<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\LoginController;
use Modules\Auth\Http\Controllers\RefreshTokenController;
use Modules\Auth\Http\Controllers\RegisterController;


Route::prefix('auth')
->group(function (){
    Route::post('/login', [LoginController::class, 'handle']);
    Route::post('/register', [RegisterController::class, 'handle'])->middleware(['jwt','role:admin']);
    Route::post('/refresh', [RefreshTokenController::class, 'handle']);
});