<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Attendance\DTO\CreateAttendanceCheckOutDTO;
use Modules\Attendance\Repositories\AttendanceRepository;

class CreateAttendanceCheckOutService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle(CreateAttendanceCheckOutDTO $checkOut) {
        $userAccount = Auth::user();

        $this->attendanceRepository->createAttendanceById(
            $userAccount->id, 
            [
                'sudah_pulang' => true,
                ...$checkOut->toArray()
            ]
        );

        Log::info('Success to create Check In',[
            'account_id' => $userAccount
        ]); 
    }
}
