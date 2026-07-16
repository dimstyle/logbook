<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Modules\Attendance\DTO\CreateAttendanceCheckOutDTO;
use Modules\Attendance\Http\Requests\CreateAttendanceCheckOutRequest;
use Modules\Attendance\Services\CreateAttendanceCheckOutService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CreateAttendanceCheckOutController extends Controller
{
    public function __construct(
        private CreateAttendanceCheckOutService $createAttendanceCheckOutService
    ){}



    public function handle(CreateAttendanceCheckOutRequest $request){
        $data = CreateAttendanceCheckOutDTO::fromArray($request->validated());
        
        try{
            $this->createAttendanceCheckOutService->handle($data);
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
            'message' => 'Success to create check in'
        ],Response::HTTP_CREATED);
    }
}
