<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Validation\UnauthorizedException;

use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;

use Modules\Auth\Services\LoginService;
use Modules\Auth\DTO\LoginDTO;
use Modules\Auth\Http\Requests\LoginRequest;
use Throwable;
class LoginController extends Controller
{
    public function __construct(
        private LoginService $loginService
    ){}

   #[OA\Post(
        path: "/api/auth/login",
        summary: "authenticate account",
        tags: ["Auth"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/LoginRequestSchema"
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Success",
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
        response: 404,
        description: "Not Found",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    #[OA\Response(
        response: 401,
        description: "Unauthorized (password or email not valid)",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Something error on the server",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(LoginRequest $request){
        $data = LoginDTO::fromArray($request->validated());

        try{
            $token = $this->loginService->handle($data);
        }catch(UnauthorizedException $e){
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_UNAUTHORIZED);
        }catch(QueryException $e){
            return response()->json([
                'message' => 'Something error on the server '  
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }catch(Throwable $e){
            return response()->json([
                'messsage' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'login successfull'
        ], Response::HTTP_OK)
         ->cookie(
                'access_token',
                $token,
                60,
                '/',
                null,
                false,
                true,
                false,
                'Lax'
         );
    }
}
