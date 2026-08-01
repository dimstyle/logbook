<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Http\Requests\UpdateAttendanceReportRequest;
use Modules\Attendance\Services\UpdateAttendanceReportService;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UpdateAttendanceReportController extends Controller
{
    public function __construct(
        private UpdateAttendanceReportService $updateAttendanceReportService
    ) {}

    #[OA\Post(
        path: "/api/attendance/updatereport",
        summary: "Update attendance report",
        tags: ["Attendance"]
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\MediaType(
            mediaType: "multipart/form-data",
            schema: new OA\Schema(ref: "#/components/schemas/UpdateAttendanceReportRequest")
        )
    )]
    #[OA\Response(
        response: 200,
        description: "Success to update user attendance",
        content: new OA\JsonContent(
            ref: "#/components/schemas/UpdateAttendanceReportResponse"
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
    public function handle(UpdateAttendanceReportRequest $request)
    {
        $data = $request->validated();

        try{
            $this->updateAttendanceReportService->handle($data);
        }catch(Throwable $e) {
            return response()->json([
                'message' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } 

        return response()->json([
            'message' => 'Success to update user attendance',
        ],Response::HTTP_OK);
    }
}
