<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\User\Services\CreateUserInfoService;
use Modules\User\Http\Requests\CreateUserInfoRequest;
use Symfony\Component\HttpFoundation\Response;

use Modules\User\DTO\CreateUserInfoDTO;
use OpenApi\Attributes as OA;


class UserController extends Controller{
    /*
        define Controller's Services
    */
    public function __construct(
        private CreateUserInfoService $createUserInfoService
    ){}

    #[OA\Post(
        path: "/api/user/createinfo",
        summary:  "create user info",
        tags: ["User"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/CreateUserInfoRequest"
        )
    )]
    #[OA\Response(
        response: 201,
        description: "Success Create User Data",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
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
        response: 422,
        description: "Unprocessable Content",
        content: new OA\JsonContent(
            ref: "#/components/schemas/MessageWithErrorResponse"
        )
    )]
    public function createUserInfo(CreateUserInfoRequest $request){
        $data = CreateUserInfoDTO::fromArray($request->validated());
        
        try{
            $this->createUserInfoService->handle($data);
        }catch(UniqueConstraintViolationException $e){
            return response()->json([
                "message" => "User already exist"
            ],Response::HTTP_CONFLICT);
        }

        return response()->json([
            'message' => 'Success to create user info'
        ],Response::HTTP_CREATED);
    }
}
