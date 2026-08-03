<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Services\GetAttendanceListService;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendanceListController extends Controller
{
    public function __construct(
        private GetAttendanceListService $getAttendanceListService
    ){}

    #[OA\Get(
        path: "/api/attendance/getattendancelist",
        summary: "Get attendance list",
        tags: ["Attendance"]
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get attendance list",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetAttendanceListResponse"
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
            $attendances = $this->getAttendanceListService->handle();
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get attendance list',
            'attendances' => $attendances
        ],Response::HTTP_OK);
    }
}
