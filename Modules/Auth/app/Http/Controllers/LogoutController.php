<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

use OpenApi\Attributes as OA;
class LogoutController extends Controller
{
    #[OA\Post(
        path: "/api/auth/logout",
        summary: "Logout from account",
        tags: ["Auth"]  
    )]
    #[OA\Response(
        response: 200,
        description: "Success logout",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse",
        )
    )]
    public function handle(){
        return response()->json([
            'message' => 'Success to logout'
        ],Response::HTTP_OK)
        ->withCookie(Cookie::forget('access_token'));
    }
}
