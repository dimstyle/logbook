<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/login', fn() => Inertia::render('Login'));
<<<<<<< HEAD
Route::get('/reportedit', fn() => Inertia::render('EditReport'));
=======
Route::get('/clock-in', fn() => Inertia::render('Attendance_Clock-In'));
>>>>>>> bdfde927e2ef4200dc3c107465982ba9d93231de
