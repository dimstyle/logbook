<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/login', fn() => Inertia::render('Login'));
Route::get('/editreport', fn() => Inertia::render('EditReport'));
Route::get('/clock-in', fn() => Inertia::render('Attendance_Clock-In'));
Route::get('/report', fn() => Inertia::render('Attendance_ActivityReport'));
Route::get('/clock-out', fn() => Inertia::render('Attendance_Clock-Out'));