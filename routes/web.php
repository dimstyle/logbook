<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/login', fn() => Inertia::render('Login'));
Route::get('/clock-in', fn() => Inertia::render('Attendance_Clock-In'));
Route::get('/user_profile', fn() => Inertia::render('User_Profile'));