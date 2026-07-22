<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Auth\Http\Requests\RefreshTokenRequest;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpFoundation\Response;

use OpenApi\Attributes as OA;
use Throwable;

class RefreshTokenController extends Controller
{
    #[OA\Post(
        path: "/api/auth/refresh",
        summary: "Refresh access token",
        tags: ["Auth"],
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref : "#/components/schemas/RefreshTokenRequest"
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Success re-create token",
        content: new OA\JsonContent(
            ref: "#/components/schemas/RefreshTokenResponse",
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Unauthorized",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(RefreshTokenRequest $request){
        try{
            $data = $request->validated();

            $oldToken = $data['token'];
            /** @var JWTGuard $auth */
            $auth = auth();
            
            // $auth = setToken($data['token']);
            $newToken = $auth->setToken($oldToken)->refresh();

            return response()->json([
                'message' => 'success to get token',
                'access_token' => $newToken,
            ], Response::HTTP_OK);
        }catch (TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token expired',
            ], Response::HTTP_UNAUTHORIZED);

        }catch (TokenBlacklistedException $e) {
            return response()->json([
                'message' => 'Token blacklisted',
            ], Response::HTTP_UNAUTHORIZED);

        }catch (TokenInvalidException $e) {
            return response()->json([
                'message' => 'Token invalid',
            ], Response::HTTP_UNAUTHORIZED);

        }catch (JWTException $e) {
            return response()->json([
                'message' => 'Token missing',
            ], Response::HTTP_UNAUTHORIZED);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
