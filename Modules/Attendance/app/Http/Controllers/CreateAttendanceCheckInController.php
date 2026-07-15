<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\DTO\CreateAttendanceCheckInDTO;
use Modules\Attendance\Http\Requests\CreateAttendanceCheckInRequest;
use Modules\Attendance\Services\CreateAttendanceCheckInService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CreateAttendanceCheckInController extends Controller
{
    public function __construct(
        private CreateAttendanceCheckInService $createAttandanceCheckInService
    ){}

    public function handle(CreateAttendanceCheckInRequest $request){
        $data = CreateAttendanceCheckInDTO::fromArray($request->validated());

        try{
            $this->createAttandanceCheckInService->handle($data);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to create check in'
        ],Response::HTTP_CREATED);
    }
}
