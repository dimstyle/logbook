<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Services\GetAttendanceListService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendanceListController extends Controller
{
    public function __construct(
        private GetAttendanceListService $getAttendanceListService
    ){}

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
