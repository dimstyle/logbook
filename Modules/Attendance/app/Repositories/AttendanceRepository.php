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
        }
    }
}