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

        $rawAttendances = $this->attendanceRepository->getAttendanceHistoryByAccountId($accountId);

        $attendances = $rawAttendances->filter(function ($item) {
            return $item->sudah_hadir == true 
                || $item->izin == true 
                || $item->sakit == true 
                || !is_null($item->jam_hadir) 
                || ($item->laporan !== '' && !is_null($item->laporan));
            })->values();

        Log::info("Success to get User attendances",[
            'account_id' => $accountId
        ]);

        return $attendances;
    }
}
