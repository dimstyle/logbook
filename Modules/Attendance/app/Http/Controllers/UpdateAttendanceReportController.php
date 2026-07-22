<?php

namespace Modules\Attendance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Attendance\Models\Attendance;
use Modules\Attendance\Repositories\AttendanceRepository;
use Symfony\Component\HttpFoundation\Response;

class UpdateAttendanceReportController extends Controller
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ) {}

    public function handle(Request $request)
    {
        $account = Auth::user();

        if (! $account) {
            return response()->json([
                'message' => 'Unauthorized',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $validated = $request->validate([
            'attendance_id' => ['required', 'integer', 'exists:attendances,id'],
            'laporan' => ['nullable', 'string'],
        ]);

        $attendance = Attendance::where('id', $validated['attendance_id'])
            ->where('account_id', $account->id)
            ->first();

        if (! $attendance) {
            return response()->json([
                'message' => 'Attendance record not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $reportData = [
            'laporan' => $validated['laporan?'] ?? '',
            'sudah_laporan' => ! empty($validated['laporan']),
        ];

        $this->attendanceRepository->createReportById($account->id, $reportData);

        return response()->json([
            'message' => 'Success',
        ], Response::HTTP_OK);
    }
}
