<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Storage;
use Symfony\Component\HttpFoundation\Response;

class GetAttendanceImageController extends Controller
{
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
