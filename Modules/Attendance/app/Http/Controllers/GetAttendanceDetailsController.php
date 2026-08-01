<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Modules\Attendance\Services\GetAttendanceDetailsService;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendanceDetailsController extends Controller
{
    public function __construct(
        private GetAttendanceDetailsService $getAttendanceDetailsService
    ){}

    #[OA\Get(
        path: "/api/attendance/getattendancedetails/{attendanceId}",
        summary: "Get attendance details",
        tags: ["Attendance"]
    )]
    #[OA\Parameter(name: "attendanceId", in: "path", required: true, schema: new OA\Schema(type: "integer"))]
    #[OA\Response(
        response: 200,
        description: "Success to get attendance details",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetAttendanceDetailsResponse"
        )
    )]
    #[OA\Response(response: 404, description: "Attendance not found")]
    #[OA\Response(
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle($attendanceId){

        try{
            $attendance = $this->getAttendanceDetailsService->handle($attendanceId);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'Attendance not found'
            ],Response::HTTP_NOT_FOUND); 
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get attendance details',
            'attendance' => $attendance
        ], Response::HTTP_OK);
    }
}
