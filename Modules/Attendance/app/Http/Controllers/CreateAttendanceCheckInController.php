<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Http\Requests\CreateAttendanceCheckInRequest;
use Modules\Attendance\Services\CreateAttendanceCheckInService;
use Symfony\Component\HttpFoundation\Response;

class CreateAttendanceCheckInController extends Controller
{
    public function __construct(
        private CreateAttendanceCheckInService $createAttandanceCheckInService
    ){}

    public function handle(CreateAttendanceCheckInRequest $request){
        return response()->json([
            'message' => 'Success to create check in'
        ],Response::HTTP_CREATED);
    }
}
