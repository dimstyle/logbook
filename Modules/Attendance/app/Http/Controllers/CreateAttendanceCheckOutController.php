<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Modules\Attendance\DTO\CreateAttendanceCheckOutDTO;
use Modules\Attendance\Http\Requests\CreateAttendanceCheckOutRequest;
use Modules\Attendance\Services\CreateAttendanceCheckOutService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

use OpenApi\Attributes as OA;

class CreateAttendanceCheckOutController extends Controller
{
    public function __construct(
        private CreateAttendanceCheckOutService $createAttendanceCheckOutService
    ){}


    #[OA\Post(
        path: "/api/attendance/createcheckout",
        summary: "User check out",
        tags: ["Attendance"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/CreateAttendanceCheckOutRequest"
        )
    )]
    #[OA\Response(
        response: 200, 
        description: "Success to check out",
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
    public function handle(CreateAttendanceCheckOutRequest $request){
        $data = CreateAttendanceCheckOutDTO::fromArray($request->validated());
        
        try{
            $this->createAttendanceCheckOutService->handle($data);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);

        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to create check in'
        ],Response::HTTP_CREATED);
    }
}
