<?php
namespace Modules\Attendance\Repositories;

use Illuminate\Support\Facades\Log;
use Modules\Attendance\Models\Attendance;
use Modules\User\Models\User;
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

    public function getPhotosByAccountId(int $accountId){
        try{
            return Attendance::select('images')
            ->where('account_id', $accountId)
            ->whereDate('created_at', now())
            ->get();
        }catch(Throwable $e){
            Log::error('Failed to get report photos',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function getAttendanceListByAdminId(int $adminId){
        try{
            return User::where('admin_id', $adminId)
            ->join('attendances','users.account_id','=','attendances.account_id')
            ->join('accounts', 'users.account_id', '=', 'accounts.id')
            ->select(
                'accounts.id as account_id',
                'attendances.id as attendance_id',

                'users.nama_lengkap',
                'users.sekolah',
                'users.jurusan',
                'users.profile_photo',

                'attendances.sudah_hadir',
                'attendances.sudah_laporan',
                'attendances.sudah_pulang',
                'attendances.izin',
                'attendances.sakit',
                'attendances.wfh',
                'attendances.created_date',
                'attendances.updated_at'
            )
            ->get();
        }catch(Throwable $e){
            Log::error('Failed to get attendances list',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

}