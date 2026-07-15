<?php

namespace Modules\Attendance\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AttendanceChecker
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request);
    }
}
