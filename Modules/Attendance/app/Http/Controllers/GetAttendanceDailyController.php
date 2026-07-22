<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Attendance\Services\GetAttendanceDailyService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendanceDailyController extends Controller
{
    public function __construct(
        private GetAttendanceDailyService $getAttendanceDailyService
    ){}

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
