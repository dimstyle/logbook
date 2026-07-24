<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Modules\Attendance\DTO\CreateAttendanceReportDTO;
use Modules\Attendance\Http\Requests\CreateAttendanceReportRequest;
use Modules\Attendance\Services\CreateAttendanceReportService;

use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

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
        response: 201, 
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
        $data = CreateAttendanceReportDTO::fromArray($request->validated());

        try{
            $this->createAttendanceReportService->handle($data);
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
            'message' => 'Success to create report'
        ], Response::HTTP_CREATED);
    }
}
