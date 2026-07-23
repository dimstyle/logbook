<?php

use Illuminate\Support\Facades\Route;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckInController;
use Modules\Attendance\Http\Controllers\CreateAttendanceCheckOutController;
use Modules\Attendance\Http\Controllers\CreateAttendanceReportController;
use Modules\Attendance\Http\Controllers\GetAttendanceDailyController;
use Modules\Attendance\Http\Controllers\GetAttendanceHistoryController;
use Modules\Attendance\Http\Controllers\GetAttendancePhotosController;
use Modules\Attendance\Http\Controllers\UpdateAttendanceReportController;

Route::prefix('attendance')
->middleware('jwt')
->group(function (){
    Route::get('/getattendancehistory', [GetAttendanceHistoryController::class, 'handle']);
    Route::get('/getattendancedaily', [GetAttendanceDailyController::class, 'handle']);
    Route::get('/getattendancephotos', [GetAttendancePhotosController::class, 'handle']);
    Route::post('/updatereport', [UpdateAttendanceReportController::class, 'handle']);
    Route::post('/createcheckin', [CreateAttendanceCheckInController::class, 'handle']);
    Route::post('/createcheckout', [CreateAttendanceCheckOutController::class, 'handle']);
    Route::post('/createreport', [CreateAttendanceReportController::class, 'handle']);
});