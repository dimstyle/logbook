<?php

use Illuminate\Support\Facades\Route;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckInController;

Route::prefix('attendance')
->middleware('jwt')
->group(function (){
    Route::post('/createcheckin', [CreateAttendanceCheckInController::class, 'handle']);
});