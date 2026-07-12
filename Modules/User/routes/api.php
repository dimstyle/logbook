<?php


use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\CreateUserInfoController;
use Modules\User\Http\Controllers\GetAdminProfileController;
use Modules\User\Http\Controllers\GetUserProfileController;
use Modules\User\Http\Controllers\CreateAdminInfoController;

Route::prefix('user')
->middleware(['jwt', 'role:admin'])
->group(function (){
    Route::post('/createuserinfo', [CreateUserInfoController::class,'handle']);
    Route::post('/createadmininfo',[CreateAdminInfoController::class, 'handle']);
    Route::post('/getadminprofile',[GetAdminProfileController::class, 'handle']);
});


Route::prefix('user')
->middleware('jwt')
->group(function (){
    Route::get('/getuserprofile', [GetUserProfileController::class, 'handle']);
});