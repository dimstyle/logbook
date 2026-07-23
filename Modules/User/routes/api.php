<?php


use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\GetAdminProfileController;
use Modules\User\Http\Controllers\GetListUsersInfoController;
use Modules\User\Http\Controllers\GetUserProfileController;
use Modules\User\Http\Controllers\GetUserProfileOnAdminController;
use Modules\User\Http\Controllers\GetUserProfilePhotoController;
use Modules\User\Http\Controllers\UpdateAdminProfileController;
use Modules\User\Http\Controllers\UpdateUserProfileController;

Route::prefix('user')
->middleware('jwt')
->group(function (){
    Route::get('/getuserprofilephoto', [GetUserProfilePhotoController::class, 'handle']);
});

Route::prefix('user')
->middleware(['jwt', 'role:admin'])
->group(function (){
    Route::get('/getadminprofile',[GetAdminProfileController::class, 'handle']);
    Route::get('/getlistusersinfo',[GetListUsersInfoController::class, 'handle']);
    Route::get('/getuserprofileonadmin/{id}', [GetUserProfileOnAdminController::class, 'handle']);
    Route::patch('/updateadminprofile', [UpdateAdminProfileController::class, 'handle']);

});

Route::prefix('user')
->middleware(['jwt','role:user'])
->group(function (){
    Route::get('/getuserprofile', [GetUserProfileController::class, 'handle']);
    Route::patch('/updateuserprofile', [UpdateUserProfileController::class, 'handle']);
});