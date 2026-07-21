<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\User\Http\Requests\UpdateAdminProfileRequest;
use Modules\User\Services\UpdateAdminProfileService;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use OpenApi\Attributes as OA;

class UpdateAdminProfileController extends Controller
{
    public function  __construct(
        private UpdateAdminProfileService $updateAdminProfileService
    ){}

    #[OA\Patch(
        path: "/api/user/updateadminprofile",
        summary: 'Create admin information',
        tags: ['Admin']

    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/UpdateAdminProfileRequest"
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
    public function handle(UpdateAdminProfileRequest $request){
        $data = $request->validated();

        try{
            $this->updateAdminProfileService->handle($data);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User Not Found'
            ],Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'message' => 'Succes to update user profile'
        ],Response::HTTP_OK);
    }
}
