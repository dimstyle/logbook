<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Services\GetAttendancePhotosService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;


class GetAttendancePhotosController extends Controller
{
    public function __construct(
        private GetAttendancePhotosService $getAttendancePhotosService
    ){}

    public function handle(){
        try{
            $photos = $this->getAttendancePhotosService->handle();
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Success to get user images',
            'photos' => $photos
        ],Response::HTTP_OK);
    }
}
