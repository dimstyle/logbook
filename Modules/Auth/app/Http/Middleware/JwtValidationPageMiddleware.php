<?php

namespace Modules\Auth\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\UnauthorizedException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class JwtValidationPageMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        $token = $_COOKIE['access_token'] ?? null;

        if (! $token) {
            $this->logAuthFailure('JWT token missing.', $request, 'warning', [
                'reason' => 'token_missing',
            ]);

            return $this->respondWithError($request, Response::HTTP_UNAUTHORIZED, 'Please login first to continue.', $this->resolveBackPath($request));
        }

        $request->headers->set('Authorization', 'Bearer ' . $token);

        try {
            $user = auth()->user();

            if (!$user || $user->role !== $role) {
                Log::warning("Unauthorized account",[
                    'username' => $user->username,
                    'role' => $user->role,
                    'ip' => $request->ip()
                ]);
                throw new UnauthorizedException("Unauthorized");
            }

            if (! $user) {
                throw new TokenInvalidException('User not authenticated');
            }
            
            return $next($request);
        } catch (TokenExpiredException $e) {

            if (!$token) {
                $this->logAuthFailure('JWT token expired while refreshing.', $request, 'warning', [
                    'reason' => 'token_expired',
                ]);

                return $this->respondWithError($request, Response::HTTP_UNAUTHORIZED, 'Your session has expired. Please login again.', $this->resolveBackPath($request));
            }

            try {
                $refreshResponse = Http::post(url('/api/auth/refresh'),[
                    'token' => $token
                ]);

                if ($refreshResponse->successful()) {
                    $newToken = data_get($refreshResponse->json(), 'access_token');

                    if ($newToken) {
                        $request->headers->set('Authorization', 'Bearer ' . $newToken);
                        $request->cookies->set('access_token', $newToken);

                        $response = $next($request);

                        $response->headers->setCookie(new Cookie(
                            'access_token',
                            $newToken,
                            now()->addMinutes(60)->timestamp,
                            '/',
                            null,
                            false,
                            true,
                            false,
                            'Lax'
                        ));

                        return $response;
                    }
                }
            } catch (Throwable $refreshException) {
                report($refreshException);
                $this->logAuthFailure('JWT refresh failed.', $request, 'error', [
                    'reason' => 'refresh_failed',
                    'exception' => $refreshException->getMessage(),
                ]);
            }

            $this->logAuthFailure('JWT token expired after refresh attempt.', $request, 'warning', [
                'reason' => 'token_expired_after_refresh',
            ]);

            return $this->respondWithError($request, Response::HTTP_UNAUTHORIZED, 'Your session has expired. Please login again.', $this->resolveBackPath($request));
        } catch (TokenInvalidException $e) {
            $this->logAuthFailure('JWT token is invalid.', $request, 'warning', [
                'reason' => 'token_invalid',
                'exception' => $e->getMessage(),
            ]);

            return $this->respondWithError($request, Response::HTTP_UNAUTHORIZED, 'Invalid token. Please login again.', $this->resolveBackPath($request));
        } catch (JWTException $e) {
            $this->logAuthFailure('JWT validation exception.', $request, 'warning', [
                'reason' => 'jwt_exception',
                'exception' => $e->getMessage(),
            ]);

            return $this->respondWithError($request, Response::HTTP_UNAUTHORIZED, 'Your login token could not be validated. Please login again.', $this->resolveBackPath($request));
        } catch (Throwable $e) {
            report($e);
            $this->logAuthFailure('Unexpected JWT middleware failure.', $request, 'error', [
                'reason' => 'unexpected_error',
                'exception' => $e->getMessage(),
            ]);

            return $this->respondWithError($request, Response::HTTP_INTERNAL_SERVER_ERROR, 'Something went wrong. Please try again later.', $this->resolveBackPath($request));
        }
    }

    private function resolveBackPath(Request $request): string
    {
        return $request->is('admin*') ? '/admin/login' : '/login';
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
