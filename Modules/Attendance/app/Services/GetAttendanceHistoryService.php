<?php

namespace Modules\Attendance\Services;

use Modules\Attendance\Repositories\AttendanceRepository;

class GetAttendanceHistoryService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ) {}

    public function handle(int $accountId): array
    {
        return $this->attendanceRepository
            ->getAttendanceHistory($accountId)
            ->map(function ($attendance) {
                $recordDate = $attendance->created_date instanceof \Carbon\Carbon
                    ? $attendance->created_date->toDateString()
                    : (string) $attendance->created_date;

                return [
                    'id' => $attendance->id,
                    'account_id' => $attendance->account_id,
                    'date' => $recordDate,
                    'activity' => $attendance->laporan ?: 'Belum ada laporan',
                    'laporan' => $attendance->laporan ?? '',
                    'clockin' => $attendance->jam_hadir ?? '-',
                    'clockout' => $attendance->jam_pulang ?? '-',
                    'sudah_hadir' => (bool) $attendance->sudah_hadir,
                    'sudah_pulang' => (bool) $attendance->sudah_pulang,
                    'sudah_laporan' => (bool) $attendance->sudah_laporan,
                    'images_path' => $attendance->images_path ?? [],
                ];
            })
            ->all();
    }
}
