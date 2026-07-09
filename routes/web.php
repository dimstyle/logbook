<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/login', fn() => Inertia::render('Login'));
Route::get('/clock-in', fn() => Inertia::render('Attendance_Clock-In'));
Route::get('/user_profile', fn() => Inertia::render('User_Profile'));
Route::get('/report', fn() => Inertia::render('Attendance_ActivityReport'));
Route::get('/clock-out', fn() => Inertia::render('Attendance_Clock-Out'));
Route::get('/edit_report', fn() => Inertia::render('EditReport'));
Route::get('/view_report', fn() => Inertia::render('ViewReport'));
