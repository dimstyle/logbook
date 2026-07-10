<?php


use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\CreateUserInfoController;
use Modules\User\Http\Controllers\GetUserProfileController;

Route::prefix('user')
->middleware(['jwt', 'role:admin'])
->group(function (){
    Route::post('/createinfo', [CreateUserInfoController::class,'handle']);
});


Route::prefix('user')
->middleware('jwt')
->group(function (){
    Route::get('/getprofile', [GetUserProfileController::class, 'handle']);
});