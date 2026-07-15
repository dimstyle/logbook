<?php
namespace Modules\Attendance\Repositories;

use Illuminate\Support\Facades\Log;
use Modules\Attendance\Models\Attendance;
use Throwable;

class AttendanceRepository{
    public function createCheckInById(int $accountId){
        try{
            return Attendance::where('account_id', $accountId)
            ->update();
        }catch(Throwable $e){
            Log::error('Failed to create Check In data',[
                'exception' => $e
            ]);
        }
    }
}