<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;


use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

use Modules\User\Services\GetUserProfileService;
use OpenApi\Attributes as OA;
use Throwable;

class GetUserProfileController extends Controller
{
    public function __construct(
        private GetUserProfileService $getUserProfileService
    ){}


    #[OA\Get(
        path: "/api/user/getprofile",
        summary: "get user profile data",
        tags: ['User']
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get user profile",
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
    #[OA\Response(
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(){
        try{
            $user = $this->getUserProfileService->handle();
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'message' => 'Success to get user data',
            'user' => $user
        ],Response::HTTP_OK);
    }
}
