<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\User\Services\GetListUsersInfoService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

use OpenApi\Attributes as OA;

class GetListUsersInfoController extends Controller
{
    public function __construct(
        private GetListUsersInfoService $getListUsersInfoService
    ){}

    #[OA\Get(
        path: "/api/user/getlistusersinfo",
        summary: "get admin profile data",
        tags: ['User']
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get user profile",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetListUsersInfoResponse"
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
        response: 404,
        description: "Not Found",
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
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(){
        try{
            $listUsers = $this->getListUsersInfoService->handle();
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get List Users',
            'users' => $listUsers
        ],Response::HTTP_OK);

    }
}
