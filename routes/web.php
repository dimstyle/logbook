<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

$mockuser = [
    [ 'id' => 1 , 'name' => "Udin", 'username' => "testwoy1945", 'role' => "Siswa SMK" , 'email' => "udin1945@gmail.com", 'school' => "SMK Letris 2 Pamulang", 'major' => "Rekayasa Perangkat Lunak", 'noHP' => "0821", 'password' => "Hytam", 'attendance' => 20, 'notPresent' => 80, 'report' => 0 ],
    [ 'id' => 2 , 'name' => "Tono", 'username' => "testwoy1945", 'role' => "Siswa SMK" , 'email' => "tono1945@gmail.com", 'school' => "SMK Letris 2 Pamulang", 'major' => "Rekayasa Perangkat Lunak", 'noHP' => "0821", 'password' => "Hytam", 'attendance' => 0, 'notPresent' => 100, 'report' => 9 ],
    [ 'id' => 3 , 'name' => "Tony", 'username' => "testwoy1945", 'role' => "Siswa SMK" , 'email' => "tony1945@gmail.com", 'school' => "SMK Letris 2 Pamulang", 'major' => "Rekayasa Perangkat Lunak", 'noHP' => "0821", 'password' => "Hytam", 'attendance' => 10, 'notPresent' => 90, 'report' => 1 ],
    [ 'id' => 4 , 'name' => "Ucup", 'username' => "testwoy1945", 'role' => "Siswa SMK" , 'email' => "ucup1945@gmail.com", 'school' => "SMK Letris 2 Pamulang", 'major' => "Rekayasa Perangkat Lunak", 'noHP' => "0821", 'password' => "Hytam", 'attendance' => -20, 'notPresent' => 100, 'report' => -10 ],
    [ 'id' => 5 , 'name' => "Ucok", 'username' => "testwoy1945", 'role' => "Siswa SMK" , 'email' => "ucok1945@gmail.com", 'school' => "SMK Letris 2 Pamulang", 'major' => "Rekayasa Perangkat Lunak", 'noHP' => "0821", 'password' => "Hytam", 'attendance' => 90, 'notPresent' => 10, 'report' => 1000 ],
];

$currentUserId = 1;

// User
Route::get('/login', fn() => Inertia::render('User/Login'));


Route::prefix('/')
->middleware('jwt.page.validation:user')
->group(function (){
    global $mockuser, $currentUserId;
    
    Route::get('/', fn() => Inertia::render('User/Home'));
    Route::get('/clock-in', fn() => Inertia::render('User/Attendance_Clock-In'));
    Route::get('/user_profile',fn() => Inertia::render('User/User_Profile'));

    Route::get('/user_profile/edit', function () use ($mockuser, $currentUserId) {
        $updatedName = session('updated_name');
    
        $user = collect($mockuser)->firstWhere('id', $currentUserId);
        if ($updatedName) {
            $user['name'] = $updatedName;
        }
    
        return Inertia::render('User/User_Profile_Edit', [
            'user' => $user
        ]);
    });
    Route::post('/user/profile', function (Request $request) use ($mockuser, $currentUserId) {
        $newName = trim($request->input('name'));
    
        if (empty($newName)) {
            return back()->withErrors(['name' => 'Nama tidak boleh kosong']);
        }
    
        $isDuplicate = collect($mockuser)->contains(function ($user) use($newName, $currentUserId) {
            return $user['id'] !== $currentUserId && strtolower($user['name']) === strtolower($newName);
        });
    
        if ($isDuplicate) {
            return back()->withErrors(['name' => 'Nama ini sudah digunakan oleh pengguna lain.']);
        }
    
        session(['updated_name' => $newName]);
    
        return redirect('/user_profile');
    });
    Route::get('/report', fn() => Inertia::render('User/Attendance_ActivityReport'));
    Route::get('/clock-out', fn() => Inertia::render('User/Attendance_Clock-Out'));
    Route::get('/edit_report', fn() => Inertia::render('User/EditReport'));
    Route::get('/view_report', fn() => Inertia::render('User/ViewReport'));
});

// Admin
Route::prefix('admin')
->group(function (){
    Route::get('/login', fn() => Inertia::render('Admin/Login'));
});

Route::prefix('admin')
->middleware('jwt.page.validation:admin')
->group(function (){
    
    Route::get('/profile', fn() => Inertia::render('Admin/Admin_Profile'));
    Route::get('/daily_attendance', fn() => Inertia::render('Admin/Daily_Attendance'));
    Route::get('/profile/edit', fn() => Inertia::render('Admin/Admin_Profile_Edit'));
    Route::get('/user-report/{name}', function ($name) {
        return Inertia::render('Admin/AdminUserReport', [
            'studentName' => urldecode($name),
            'attendanceData' => request()->all()
        ]);
    });
    Route::get('/user_registration', fn() => Inertia::render('Admin/User_Registration'));
    Route::get('/user_list', fn() => Inertia::render('Admin/User_List'));
    Route::get('/user_profile/{id}', fn() => Inertia::render('Admin/User_Profile'));
});
