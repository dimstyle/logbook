<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;

use Modules\Auth\DTO\RegisterDTO;
use Modules\Auth\Http\Requests\RegisterRequest;
use Modules\Auth\Services\RegisterService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

use OpenApi\Attributes as OA;

class RegisterController extends Controller
{
    public function __construct(
        private RegisterService $registerService
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
    #[OA\Response(
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(RegisterRequest $request){
        $data = RegisterDTO::fromArray($request->validated());
        
        try{
            $account_id = $this->registerService->handle($data);
        }catch(QueryException){
            return response()->json([
                'message' => 'internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'success to create user',
            'account_id' => $account_id

        ], Response::HTTP_CREATED);
    }
}
