<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Services\GetAttendanceHistoryService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendanceHistoryController extends Controller
{
    public function __construct(
        private GetAttendanceHistoryService $getAttendanceHistoryService
    ) {}

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
