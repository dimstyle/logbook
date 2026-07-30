<?php

namespace Modules\Auth\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\Auth\DTO\LoginDTO;
use Modules\Auth\Repositories\AuthRepository;
use Nwidart\Modules\Exceptions\ModuleNotFoundException;
use Str;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AuthGateRoleFilterMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function __construct(
        private AuthRepository $authRepository
    ){}

    public function handle(Request $request, Closure $next, string $role)
    {  
        $data = LoginDTO::fromArray($request->all());

        try{
            $user = $this->authRepository->getAccountByEmail(
                $data->email
            );

            $roleUser = $user['role'];

            $backPath = $roleUser === 'admin' ? '/admin/login' : '/login';

            if($roleUser !== $role){
                throw new AuthorizationException('role doesn\'t match');
            }
        }catch(AuthorizationException $e){
            report($e);
            $this->logAuthFailure('Role not match', $request, 'error',[
                'reason' => 'forbiden',
                'exception' => $e->getMessage()
            ]);

            return $this->respondWithError(
                $request, Response::HTTP_FORBIDDEN,
                'forbiden error unauthorization', $backPath);
        }catch(ModuleNotFoundException $e){
            report($e);
            $this->logAuthFailure('User not found', $request, 'error', [
                'reason' => 'not_found',
                'exception' => $e->getMessage()
            ]);

            return $this->respondWithError(
                $request, Response::HTTP_NOT_FOUND, 
                'User not found', $backPath
            );
        }catch(Throwable $e){
            report($e); 
            $this->logAuthFailure('Internal server error', $request, 'error',[
                'reason' => 'internal_error',
                'exception' => $e->getMessage()
            ]);

            return $this->respondWithError(
                $request, Response::HTTP_INTERNAL_SERVER_ERROR,
                'Internal server error', $backPath
            );
        }



        return $next($request);
    }

    private function logAuthFailure(string $message, Request $request, string $level, array $context = []): void
    {
        $baseContext = [
            'path' => $request->path(),
            'method' => $request->method(),
            'ip' => $request->ip(),
        ];

        match ($level) {
            'warning' => Log::warning($message, array_merge($baseContext, $context)),
            default => Log::error($message, array_merge($baseContext, $context)),
        };
    }

    private function respondWithError(Request $request, int $status, string $message, string $backPath)
    {
        if ($request->expectsJson() || Str::startsWith($request->path(), 'api/')) {
            return response()->json([
                'message' => $message,
                'status' => $status,
            ], $status);
        }

        return redirect($backPath);
    }
}
