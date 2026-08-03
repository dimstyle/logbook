<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Attendance\Services\GetAttendancePhotosService;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GetAttendancePhotosController extends Controller
{
    public function __construct(
        private GetAttendancePhotosService $getAttendancePhotosService
    ){}

    #[OA\Get(
        path: "/api/attendance/getattendancephotos",
        summary: "Get attendance photos",
        tags: ["Attendance"]
    )]
    #[OA\Response(
        response: 200,
        description: "Success to get user images",
        content: new OA\JsonContent(
            ref: "#/components/schemas/GetAttendancePhotosResponse"
        )
    )]
    #[OA\Response(
        response: 500,
        description: "Internal server error",
        content: new OA\JsonContent(
            ref: "#/components/schemas/DefaultResponse"
        )
    )]
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
