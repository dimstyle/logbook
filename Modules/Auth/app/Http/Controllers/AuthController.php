<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Auth\DTO\RegisterDTO;
use Modules\Auth\DTO\LoginDTO;
use Modules\Auth\Services\RegisterService;
use Modules\Auth\Services\LoginService;
use Modules\Auth\Http\Requests\RegisterRequest;
use Modules\Auth\Http\Requests\LoginRequest;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\UniqueConstraintViolationException;
use OpenApi\Attributes as OA;
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
        try{
            $data = RegisterDTO::fromArray($request->validated());
        }catch(UniqueConstraintViolationException $e){
            Log::error('email already exist', [
                'exception' => $e
            ]);
            throw $e;
        }
      
        
        try{
            $account_id = $this->registerService->index($data);
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
            $this->loginService->index($data);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User Not Found'
            ], Response::HTTP_NOT_FOUND);
        }catch(AuthenticationException $e){
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
        ], Response::HTTP_OK);
    }
}
