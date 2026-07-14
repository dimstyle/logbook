<?php

namespace Modules\Attendance\Services;

use Modules\Attendance\Respositories\AttendanceRepository;

class CreateAttendanceCheckInService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}
    public function handle() {

    }
}
