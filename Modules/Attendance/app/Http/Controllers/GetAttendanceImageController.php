<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;
use Storage;
use Symfony\Component\HttpFoundation\Response;

class GetAttendanceImageController extends Controller
{
    #[OA\Get(
        path: "/api/attendance/attendance-reports/{targetId}/{filename}",
        summary: "Get attendance image",
        tags: ["Attendance"]
    )]
    #[OA\Parameter(name: "targetId", in: "path", required: true, schema: new OA\Schema(type: "integer"))]
    #[OA\Parameter(name: "filename", in: "path", required: true, schema: new OA\Schema(type: "string"))]
    #[OA\Response(
        response: 200,
        description: "Attendance image",
        content: new OA\MediaType(
            mediaType: "image/*",
            schema: new OA\Schema(ref: "#/components/schemas/GetAttendanceImageResponse")
        )
    )]
    #[OA\Response(response: 403, description: "Forbidden")]
    #[OA\Response(response: 404, description: "Image not found")]
    public function handle($targetId, $filename ){
        $user = Auth::user();
        $accountId = $user->id;
        $role = $user->role;

        $path = 'attendance-reports/'.$targetId.'/'.$filename;

        abort_if(
            $targetId != $accountId && $role !== 'admin',
            Response::HTTP_FORBIDDEN
        );
        
        abort_if(
          !Storage::disk('local')->exists($path),
          Response::HTTP_NOT_FOUND  
        );


        return response()->file(
            Storage::disk('local')->path($path)
        );
    }
}
