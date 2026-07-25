<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Modules\Attendance\Services\GetAttendanceDailyService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendanceDetailsController extends Controller
{
    public function __construct(
        private GetAttendanceDailyService $getAttendanceDailyService
    ){}

    public function handle($attendanceId){
        try{
            $attendance = $this->getAttendanceDailyService->handle($attendanceId);
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
