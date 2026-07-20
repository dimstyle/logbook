<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Modules\Attendance\Repositories\AttendanceRepository;

class AttendanceCheckerService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle() {
        $user = Auth::user();

        $accountId= $user->id;

        $checker = $this->attendanceRepository->getAttendanceChecker($accountId);

        Log::info('Success to get attendance checker',[
            'account_id' => $accountId
        ]);

        return $checker;

    }
}
