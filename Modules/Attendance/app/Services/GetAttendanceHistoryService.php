<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Attendance\Repositories\AttendanceRepository;

class GetAttendanceHistoryService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ) {}

    public function handle()
    {   
        $user = Auth::user();

        $accountId = $user->id;

        $attendances = $this->attendanceRepository->getAttendanceHistoryByAccountId($accountId);

        Log::info("Success to get User attendances",[
            'account_id' => $accountId
        ]);

        return $attendances;
    }
}
