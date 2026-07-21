<?php
namespace Modules\Attendance\Repositories;

use Illuminate\Support\Facades\Log;
use Modules\Attendance\Models\Attendance;
use Throwable;

class AttendanceRepository{
    public function createCheckInById(int $accountId, array $checkIn){
        try{
            return Attendance::where('account_id', $accountId)
            ->update($checkIn);
        }catch(Throwable $e){
            Log::error('Failed to create Check In data',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function createCheckOutById(int $accountId, array $checkOut){
         try{
            return Attendance::where('account_id', $accountId)
            ->update($checkOut);
        }catch(Throwable $e){
            Log::error('Failed to create Check In data',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function createReportById(int $accountId, array $report){
         try{
            return Attendance::where('account_id', $accountId)
            ->update($report);
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

    public function getAttendanceHistory(int $accountId)
    {
        try {
            return Attendance::select(
                'id',
                'account_id',
                'created_date',
                'laporan',
                'jam_hadir',
                'jam_pulang',
                'sudah_hadir',
                'sudah_pulang',
                'sudah_laporan',
                'images_path'
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
}