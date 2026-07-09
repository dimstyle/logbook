<?php

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\UserController;

Route::prefix('user')
->middleware(['jwt', 'role:admin'])
->controller(UserController::class)
->group(function (){
    Route::post('/createinfo', 'createUserInfo');
});
