<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Services\GetAttendanceHistoryService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

use OpenApi\Attributes as OA;

class GetAttendanceHistoryController extends Controller
{
    public function __construct(
        private GetAttendanceHistoryService $getAttendanceHistoryService
    ) {}

    #[OA\Get(
        path: "/api/user/getattendancehistory",
        summary: "get list of attendace",
        tags: ["Attendance"],
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get attendances",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetAttendanceDailyResponse"
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
    public function handle()
    {

        try{
            $attendances = $this->getAttendanceHistoryService->handle();
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get attendance history',
            'attendances' => $attendances,
        ], Response::HTTP_OK);
    }
}
