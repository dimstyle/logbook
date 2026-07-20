<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Modules\Auth\Http\Middleware\JwtMiddleware;
use Modules\Auth\Http\Middleware\RoleMiddleware;
use Modules\Auth\Http\Middleware\JwtValidationPageMiddleware;
use Modules\Attendance\Http\Middleware\AttendanceCheckerMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'jwt' => JwtMiddleware::class,
            'role' => RoleMiddleware::class,
            'jwt.page.validation' => JwtValidationPageMiddleware::class,
            'attendancechecker' => AttendanceCheckerMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
    })->create();
