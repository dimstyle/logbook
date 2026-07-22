<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Attendance\Services\GetAttendanceDailyService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

use OpenApi\Attributes as OA;

class GetAttendanceDailyController extends Controller
{
    public function __construct(
        private GetAttendanceDailyService $getAttendanceDailyService
    ){}

    #[OA\Get(
        path: "/api/user/getattendancedaily",
        summary: "get attendace by attendance id",
        tags: ["Attendance"],
    )]
    #[OA\Parameter(
        name: "attendance_id",
        in: "query",
        description: "ID attendance data",
        required: true,
        schema: new OA\Schema(type: 'integer')
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get attendance",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetAttendanceDailyResponse"
        )
        )]
    #[OA\Response(
            response: 400,
            description: "Bad request",
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
    public function handle(Request $request){
        $id = $request->integer('attendance_id');

        if(!$id){
            return response()->json([
                'message' => 'attendance id not found'
            ], Response::HTTP_BAD_REQUEST);
        }

        try{
            $attendance = $this->getAttendanceDailyService->handle($id);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get daily attendance',
            'attendance' => $attendance
        ],Response::HTTP_OK);
    }
}
