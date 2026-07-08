<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Auth\DTO\RegisterAuthDTO;
use Modules\Auth\Services\RegisterService;
use Modules\Auth\Services\LoginService;
use Modules\Auth\Http\Requests\RegisterRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;
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
        description: "Success to Create User",
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
        response: 500,
        description: "Something error on the server",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function register(RegisterRequest $request){
        
        $data = RegisterAuthDTO::fromArray($request->validated());
      
        
        try{
            $this->registerService->index($data);
        }catch(QueryException){
            return response()->json([
                'message' => 'internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'success'
        ], Response::HTTP_CREATED);
    }

    /*
        login Controller
    */
    public function login(){
        return Response()->json([
            "message" => "haha",
        ]);
    }
}
