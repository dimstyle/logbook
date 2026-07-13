<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Modules\User\Services\GetAdminProfileService;

use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAdminProfileController extends Controller
{
    public function __construct(
        private GetAdminProfileService $getAdminProfileService
    ){}

    #[OA\Get(
        path: "/api/user/getadminprofile",
        summary: "get admin profile data",
        tags: ['User']
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get user profile",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetAdminProfileResponse"
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
            $admin = $this->getAdminProfileService->handle(Auth::user()->id);
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
            'message' => 'Success to get Admin info',
            'admin' => $admin
        ]);
    }
}
