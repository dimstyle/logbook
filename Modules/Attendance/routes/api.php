<?php

use Illuminate\Support\Facades\Route;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckInController;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckOutController;
use Modules\Attendance\Http\Controllers\GetAttendanceHistoryController;
use Modules\Attendance\Http\Controllers\UpdateAttendanceReportController;

Route::prefix('attendance')
->middleware('jwt')
->group(function (){
    Route::get('/history', [GetAttendanceHistoryController::class, 'handle']);
    Route::post('/update-report', [UpdateAttendanceReportController::class, 'handle']);
    Route::post('/createcheckin', [CreateAttendanceCheckInController::class, 'handle']);
    Route::post('/createcheckout', [CreateAttendanceCheckOutController::class, 'handle']);
});