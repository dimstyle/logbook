<?php

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\UserController;

Route::prefix('user')
->controller(UserController::class)
->group(function (){
    Route::post('/createinfo', 'createUserInfo');
});