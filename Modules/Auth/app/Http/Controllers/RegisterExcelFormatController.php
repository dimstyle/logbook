<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Auth\Http\Requests\RegisterExcelFormatRequest;
use Modules\Auth\Services\RegisterExcelFormatService;
use Symfony\Component\HttpFoundation\Response;

use OpenApi\Attributes as OA;

class RegisterExcelFormatController extends Controller
{
    public function __construct(
        private RegisterExcelFormatService $registerExcelFormatService
    ) {}

     #[OA\Post(
        path: "/api/auth/register/excel",
        summary: "Register Users from Excel File",
        tags: ["Auth"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\MediaType(
            mediaType: "multipart/form-data",
            schema: new OA\Schema(
                ref: "#/components/schemas/RegisterExcelFormatRequest"
            )
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Success Process Excel File",
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
        description: "Something error on the server",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(RegisterExcelFormatRequest $request)
    {
        try {
            $result = $this->registerExcelFormatService->handle(
                $request->file('register_file')
            );

            
           
        } catch (Throwable) {
            return response()->json([
                'message' => 'Internal server error',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => $result
        ], Response::HTTP_OK);
    }
}