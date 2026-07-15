<?php

namespace Modules\Attendance\Services;

use Modules\Attendance\DTO\CreateAttendanceCheckInDTO;
use Modules\Attendance\Respositories\AttendanceRepository;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateAttendanceCheckInService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle(CreateAttendanceCheckInDTO $checkIn) {
        $userAccount = Auth::user();

        Log::info('Success to create Check In',[
            'account_id' => $userAccount
        ]);
    }
}
