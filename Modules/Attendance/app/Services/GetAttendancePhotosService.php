<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Attendance\Repositories\AttendanceRepository;

class GetAttendancePhotosService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle() {
        $user = Auth::user();
        $accountId = $user->id;

        $photos = $this->attendanceRepository->getPhotosByAccountId($accountId);

        Log::info("Success to get photos",[
            "account_id" => $accountId
        ]);

        return $photos;


    }
}
