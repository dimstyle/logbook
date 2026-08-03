<?php

namespace Modules\Auth\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LoginPageGuard
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {   
        $token = $_COOKIE['access_token'] ?? null;

        $request->headers->set('Authorization', 'Bearer ' . $token);

        $role = ""; 
        if($token){
            $user = auth()->user();
            $role = $user->role;
        }

        if($role === 'admin' && $request->is('admin/login')) return redirect($this->resolvePath($role));
        if($role === 'user' && $request->is('login')) return redirect($this->resolvePath($role));

        return $next($request);
    }

    private function resolvePath(string $role){
        return $role === 'admin' ? '/admin/daily_attendance' : '/clock-in';
    }
}
