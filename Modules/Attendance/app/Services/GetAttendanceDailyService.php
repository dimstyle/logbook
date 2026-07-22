<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Attendance\Repositories\AttendanceRepository;

class GetAttendanceDailyService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}
    public function handle(int $id) {
        $user = Auth::user();

        $accountId = $user->id;

        $attendance = $this->attendanceRepository->getAttendanceDailyByAttendanceId($id, $accountId);

        Log::info("Success to get daily attendance",[
            'account_id' => $accountId,
            'attendance_id' => $id
        ]);

        return $attendance;
    }
}
