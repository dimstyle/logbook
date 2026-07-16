<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Modules\User\Services\GetUserProfileService;
use Symfony\Component\HttpFoundation\Response;

use OpenApi\Attributes as OA;
use Throwable;

class GetUserProfileOnAdminController extends Controller
{
    public function __construct(
        private GetUserProfileService $getUserProfileService    
    ){}




    #[OA\Get(
        path: "/api/user/getuseronadminprofile/{id}",
        summary: "get user profile data by id",
        tags: ['User'],
    )]
    #[OA\Parameter(
        name: 'id',
        description: 'ID User',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer')
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get user profile",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetUserProfileResponse"
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
    public function handle($id){
        try{
            $user = $this->getUserProfileService->handle($id);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get user data',
            'user' => $user
        ],Response::HTTP_OK);
    }
}
