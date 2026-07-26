<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Attendance\Repositories\AttendanceRepository;

class GetAttendanceDetailsService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}
    public function handle($attendanceId) {
        $user = Auth::user();
        $adminId =  $user->id;

        $attendance = $this->attendanceRepository->getAttendanceDetailsByAttendanceId(
            $attendanceId, $adminId
        );

        Log::info('Success to get attendance details', [
            'account_id' => $adminId
        ]);

        return $attendance;

    }
}
