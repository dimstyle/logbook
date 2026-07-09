<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Validation\UnauthorizedException;
use Modules\Auth\DTO\RegisterDTO;
use Modules\Auth\DTO\LoginDTO;
use Modules\Auth\Services\RegisterService;
use Modules\Auth\Services\LoginService;
use Modules\Auth\Http\Requests\RegisterRequest;
use Modules\Auth\Http\Requests\LoginRequest;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Database\QueryException;     
use OpenApi\Attributes as OA;

use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;

use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /*
        define Controller's services
    */
    public function __construct(
        private RegisterService $registerService, 
        private LoginService $loginService  
    ){}


    /*
        register Controller
    */
    #[OA\Post(
        path: "/api/auth/register",
        summary: "Create User Account",
        tags: ["Auth"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/RegisterRequest"
        )
    )]
    #[OA\Response(
        response: 201,
        description: "Success Create Data",
        content: new OA\JsonContent(
            ref: "#/components/schemas/RegisterResponse"
        )
    )]
    #[OA\Response(
        response: 422,
        description: "Unprocessable Content",
        content: new OA\JsonContent(
            ref: "#/components/schemas/MessageWithErrorResponse"
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Something error on the server",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function register(RegisterRequest $request){
        $data = RegisterDTO::fromArray($request->validated());
        
        try{
            $account_id = $this->registerService->handle($data);
        }catch(QueryException){
            return response()->json([
                'message' => 'internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'success to create user',
            'account_id' => $account_id

        ], Response::HTTP_CREATED);
    }






    /*
        login Controller
    */
    #[OA\Post(
        path: "/api/auth/login",
        summary: "authenticate account",
        tags: ["Auth"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/LoginRequestSchema"
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Success",
        headers: [
            new OA\Header(
                header: "Authorization",
                description: "JWT access token",
                schema: new OA\Schema(
                    type: "string",
                    example: "Bearer eyJ..."    
                )
            )
        ],
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    #[OA\Response(
        response: 422,
        description: "Unprocessable Content",
        content: new OA\JsonContent(
            ref: "#/components/schemas/MessageWithErrorResponse"
        )
    )]
    #[OA\Response(
        response: 404,
        description: "Not Found",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Unauthorized (password or email not valid)",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Something error on the server",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function login(LoginRequest $request){
        $data = LoginDTO::fromArray($request->validated());

        try{
            $token = $this->loginService->handle($data);
        }catch(UnauthorizedException $e){
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_UNAUTHORIZED);
        }catch(QueryException $e){
            return response()->json([
                'message' => 'Something error on the server '  
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'login successfull'
        ], Response::HTTP_OK)
        ->header('Authorization', 'Bearer '. $token);
    }


    /*
        Refresh Token Controller
    */
    #[OA\Post(
        path: "/api/auth/refresh",
        tags: ["Auth"],
        security: [
            ["bearerAuth" => []]
        ],
        parameters: [
            new OA\Parameter(
                name: "Authentication",
                in: "header",
                required: true,
                description: "Client jwt access token",
                schema: new OA\Schema(
                    type: "string"
                )
            )
        ]

    )]
    #[OA\Response(
        response: 200,
        description: "Success re-create token",
        headers: [
            new OA\Header(
                header: "Authorization",
                description: "JWT access token",
                schema: new OA\Schema(
                    type: "string",
                    example: "Bearer eyJ..."    
                )
            )
        ],
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse",
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Unauthorized",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function refreshToken(){
        try{
            /** @var JWTGuard $auth */
            $auth = auth();
            
            return response()->json([
                'message' => 'success to get token'
            ],Response::HTTP_OK)
            ->header('Authorization','Bearer '.$auth->refresh());
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
        }
            }
}
