<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Http\Requests\CreateAttendanceReportRequest;
use Modules\Attendance\Services\CreateAttendanceReportService;

use OpenApi\Attributes as OA;

class CreateAttendanceReportController extends Controller
{
    public function __construct(
        private CreateAttendanceReportService $createAttendanceReportService
    ){}

    #[OA\Post(
        path: "/api/attendance/createreport",
        summary: "User report",
        tags: ["Attendance"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            ref: "#/components/schemas/CreateAttendanceReportRequest"
        )
    )]
    #[OA\Response(
        response: 200, 
        description: "Success to report",
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
    public function handle(CreateAttendanceReportRequest $request){

    }
}
