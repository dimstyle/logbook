<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Http\Requests\UpdateAttendanceReportRequest;
use Modules\Attendance\Services\UpdateAttendanceReportService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UpdateAttendanceReportController extends Controller
{
    public function __construct(
        private UpdateAttendanceReportService $updateAttendanceReportService
    ) {}

    public function handle(UpdateAttendanceReportRequest $request)
    {
        $data = $request->validated();

        // try{
            $this->updateAttendanceReportService->handle($data);
        // }catch(Throwable $e) {
        //     return response()->json([
        //         'message' => 'Internal server error'
        //     ], Response::HTTP_INTERNAL_SERVER_ERROR);
        // } 

        return response()->json([
            'message' => 'Success to update user attendance',
        ],Response::HTTP_OK);
    }
}
