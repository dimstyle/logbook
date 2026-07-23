<?php
namespace Modules\Attendance\Repositories;

use Illuminate\Support\Facades\Log;
use Modules\Attendance\Models\Attendance;
use Throwable;

class AttendanceRepository{
    public function createAttendanceById(int $accountId, array $attendanceData){
        try{
            return Attendance::where('account_id', $accountId)
            ->whereDate('created_at', now())
            ->update($attendanceData);
        }catch(Throwable $e){
            Log::error('Failed to create Check In data',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function getAttendanceChecker(int $accountId){
        try{
            return Attendance::select(
                'izin','sakit',
                'sudah_hadir', 'sudah_laporan', 'sudah_pulang'
            )
            ->where('account_id', $accountId)
            ->whereDate('created_at', now())
            ->firstOrFail();
        }catch(Throwable $e){
            Log::error('Failed to create Check In data',[
                'exception' => $e
            ]);
            throw $e;
        }
    }

    public function getAttendanceHistoryByAccountId(int $accountId)
    {
        try {
            return Attendance::select(
                'account_id', 'id',

                'jam_hadir', 'jam_pulang',

                'laporan', 'created_date'
            )
                ->where('account_id', $accountId)
                ->orderByDesc('created_date')
                ->get();
        } catch (Throwable $e) {
            Log::error('Failed to get attendance history', [
                'exception' => $e,
            ]);

            throw $e;
        }
    }

    public function getAttendanceDailyByAttendanceId(int $attendanceId, int $accountId){
        try{
            return Attendance::select(
                'account_id', 'id',

                'jam_hadir', 'jam_pulang',

                'laporan', 'created_date'
            )
            ->where('account_id',$accountId)
            ->find($attendanceId);
        }catch(Throwable $e){
            Log::error('Failed to get daily attendance',[
                'exception' => $e
            ]);

            throw $e;
        }
    }
}