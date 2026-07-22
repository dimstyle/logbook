<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Auth\Services\DeleteAccountService;
use PHPUnit\TextUI\Output\SummaryPrinter;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use OpenApi\Attributes as OA;

class DeleteAccountController extends Controller
{
    public function __construct(
        private DeleteAccountService $deleteAccountService
    ){}


    #[OA\Post(
        path: "/api/auth/deleteaccount",
        summary: "Delete user account",
        tags: ["Auth"],
    )]
    #[OA\Response(
        response: 204,
        description: "Success to delete account",
        content: new OA\JsonContent(
            ref: "#/components/schemas/RefreshTokenResponse",
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
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle($id){   
        try{    
            $this->deleteAccountService->handle($id);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to delete user'
        ], Response::HTTP_NO_CONTENT);
    }
}
