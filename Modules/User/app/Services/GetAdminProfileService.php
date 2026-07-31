<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Modules\Attendance\Repositories\AttendanceRepository;
use Modules\User\Repositories\UserRepository;

class GetAdminProfileService
{
    public function __construct(
        private UserRepository $userRepository,
        private AttendanceRepository $attendanceRepository
    ){}
    public function handle(int $accountId): array {
        $user = $this->userRepository->getAdminByAccountId($accountId);

        Log::info("Success to fetch Admin",[
            'account_id' => $accountId
        ]);

        $adminAccount = Auth::user();

        $amount_laporan = $this->countLaporan(
            $accountId,
            'sudah_hadir'
        );

        return [
            'username' => $adminAccount->username,
            'email' => $adminAccount->email,
            'role' => $adminAccount->role,
            'jumlah_laporan' => $amount_laporan,
            ...$user->toArray()
        ];
    }

    private function countLaporan(int $adminId, string $column): int{
        $sudah_laporan = $this->attendanceRepository->getTodayAttendanceByAdminId(
            $adminId,
            $column
        )->pluck($column)
        ->toArray() ?? [];

        $count = count(array_filter($sudah_laporan));

        return $count;
    }
}
