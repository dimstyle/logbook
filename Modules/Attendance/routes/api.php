<?php

use Illuminate\Support\Facades\Route;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckInController;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckOutController;

Route::prefix('attendance')
->middleware('jwt')
->group(function (){
    Route::post('/createcheckin', [CreateAttendanceCheckInController::class, 'handle']);
    Route::post('/createcheckout', [CreateAttendanceCheckOutController::class, 'handle']);
});