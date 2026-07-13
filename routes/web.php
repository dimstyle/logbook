<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// User

Route::get('/', fn() => Inertia::render('User/Home'));
Route::get('/login', fn() => Inertia::render('User/Login'));
Route::get('/clock-in', fn() => Inertia::render('User/Attendance_Clock-In'));
Route::get('/user_profile', fn() => Inertia::render('User/User_Profile'));
Route::get('/report', fn() => Inertia::render('User/Attendance_ActivityReport'));
Route::get('/clock-out', fn() => Inertia::render('User/Attendance_Clock-Out'));
Route::get('/edit_report', fn() => Inertia::render('User/EditReport'));
Route::get('/view_report', fn() => Inertia::render('User/ViewReport'));

// Admin

Route::get('/admin/login', fn() => Inertia::render('Admin/Login'));
Route::get('/admin/daily-attendance', fn() => Inertia::render('Admin/Daily_Attendance'));
Route::get('/admin/profile', fn() => Inertia::render('Admin/Admin_Profile'));
Route::get('/admin/user-registration', fn() => Inertia::render('Admin/User_Registration'));
Route::get('/admin/user-report', fn() => Inertia::render('Admin/AdminUserReport'));
Route::get('/admin/user-list', fn() => Inertia::render('Admin/User_List'));
