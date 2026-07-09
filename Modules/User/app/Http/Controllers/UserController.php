<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\User\Services\CreateUserInfoService;
use Modules\User\Http\Requests\CreateUserInfoRequest;
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
    public function createUserInfo(CreateUserInfoRequest $request){
        $data = CreateUserInfoDTO::fromArray($request->validated());
        
        $this->createUserInfoService->handle($data);
    }
}
