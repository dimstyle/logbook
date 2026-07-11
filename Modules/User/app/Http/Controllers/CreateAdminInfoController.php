<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\User\DTO\CreateAdminInfoDTO;
use Modules\User\Http\Requests\CreateAdminInfoRequest;
use Modules\User\Services\CreateAdminInfoService;

use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;


class CreateAdminInfoController extends Controller
{
    public function __construct(
        private CreateAdminInfoService $createAdminInfoservice
    ){}


    #[OA\Post(
        path: "/api/user/createadmininfo",
        summary: 'Create admin information',
        tags: ['User']

    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/CreateAdminInfo"
        )
    )]
    #[OA\Response(
        response: 201,
        description: 'Success to create admin info',
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
        response: 409,
        description: "Conflict admin account",
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
    public function handle(CreateAdminInfoRequest $request){
        $data = $request->validated();
        $user = Auth::user();

        try{
            $this->createAdminInfoservice->handle(CreateAdminInfoDTO::fromArray(
                collect([
                    'account_id' => $user->id,
                    ...$data
                ])->toArray()
            ));
        }catch(UniqueConstraintViolationException $e){
            return response()->json([
                "message" => "User already exist"
            ],Response::HTTP_CONFLICT);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server erro'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to create admin info'
        ], Response::HTTP_CREATED);
    }
}
