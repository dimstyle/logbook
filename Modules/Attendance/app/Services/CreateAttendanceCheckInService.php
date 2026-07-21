<?php

namespace Modules\Attendance\Services;

use Hamcrest\Type\IsBoolean;
use Modules\Attendance\DTO\CreateAttendanceCheckInDTO;
use Modules\Attendance\Repositories\AttendanceRepository;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateAttendanceCheckInService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle(CreateAttendanceCheckInDTO $checkIn) {
        $userAccount = Auth::user();

        $accountId = $userAccount->id;

        $this->attendanceRepository->createCheckInById(
            $accountId,
            $this->makeArrayUpdate($checkIn)
        );

        Log::info('Success to create Check In',[
            'account_id' => $accountId
        ]);

    }

    private function isCheckIn(string $status): bool {
        $status = strtolower($status);
        return $status === 'wfo' || $status === 'wfh';
    }

    private function makeArrayUpdate(CreateAttendanceCheckInDTO $checkIn): array{
        $result = [];
        $status = $checkIn->status;

        if ($this->isCheckIn($status)){
            $result['sudah_hadir'] = true;
            $result['jam_hadir'] = $checkIn->jam_hadir;
        }else{
            $result['alasan_tidak_masuk'] = $checkIn->alasan;
        }

        switch($checkIn->status){
            case 'wfo':
                $result['wfh'] = false;
                break;
            case 'wfh':
                $result['wfh'] = true;
                break;
            case 'sakit':
                $result['sakit'] = true;
                break;
            case 'izin':
                $result['izin'] = true;
                break;
        }

        return $result;
    }
}
