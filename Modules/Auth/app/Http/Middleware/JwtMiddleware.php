<?php

namespace Modules\Auth\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Log;

class JwtMiddleware extends Authenticate
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, Closure $next)
    {   
        $token = $request->cookie('access_token');

        if(! $token){
            return response()->json([
                'message' => 'Token Not Found'
            ],Response::HTTP_UNAUTHORIZED);
        }

        $request->headers->set('Authorization', 'Bearer '.$token);
        return parent::handle($request, $next);
    }
}
