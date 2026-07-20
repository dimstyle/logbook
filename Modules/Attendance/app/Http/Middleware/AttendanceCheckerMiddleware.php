<?php

namespace Modules\Attendance\Http\Middleware;

use Closure;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Attendance\Services\AttendanceCheckerService;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AttendanceCheckerMiddleware
{
    public function __construct(
        private AttendanceCheckerService $attendanceCheckerService
    ){}

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        try{
            $attendanceChecker = $this->attendanceCheckerService->handle();
    
    
            Inertia::share([
                'izin' => $attendanceChecker->izin,
                'sakit' => $attendanceChecker->sakit,
                'sudah_hadir' => $attendanceChecker->sudah_hadir, 
                'sudah_laporan' => $attendanceChecker->sudah_laporan, 
                'sudah_pulang' => $attendanceChecker->sudah_pulang
            ]);
    
            return $next($request);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'Attendance not found'
            ],Response::HTTP_NOT_FOUND);
        }catch(Throwable $e){
            return response()->json([
                'message' => 'Internal server error'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
