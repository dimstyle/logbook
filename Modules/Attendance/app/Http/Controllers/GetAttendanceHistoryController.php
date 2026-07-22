<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Attendance\Services\GetAttendanceHistoryService;
use Symfony\Component\HttpFoundation\Response;

class GetAttendanceHistoryController extends Controller
{
    public function __construct(
        private GetAttendanceHistoryService $getAttendanceHistoryService
    ) {}

    public function handle()
    {
        $account = Auth::user();

        if (! $account) {
            return response()->json([
                'message' => 'Unauthorized',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $this->getAttendanceHistoryService->handle($account->id),
        ], Response::HTTP_OK);
    }
}
