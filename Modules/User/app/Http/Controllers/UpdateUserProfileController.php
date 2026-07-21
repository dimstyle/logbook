<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\User\Http\Requests\UpdateUserProfileRequest;
use Modules\User\Services\UpdateUserProfileService;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use OpenApi\Attributes as OA;

class UpdateUserProfileController extends Controller
{
    public function __construct(
        private UpdateUserProfileService $updateUserProfileService
    ){}

    #[OA\Patch(
        path: "/api/user/updateuserprofile",
        summary: 'Create admin information',
        tags: ['User']

    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/UpdateUserProfileRequest"
        )
    )]
    #[OA\Response(
        response: 200,
        description: 'Success to update user profile',
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
        response: 404,
        description: "User not found",
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
    public function handle(UpdateUserProfileRequest $request){
        $data = $request->validated();

        try{
            $this->updateUserProfileService->handle($data);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User not found'
            ],Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'message' => 'Success to update user profile'
        ],Response::HTTP_OK);
    }
}
