<?php
namespace Modules\Attendance\Repositories;

use Illuminate\Database\Eloquent\Collection;
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

    public function incrementAttendanceByAccountId(int $accountId ,string $column, int $inc = 1){
        try{
            User::where('account_id', $accountId)
            ->increment($column, $inc);
        }catch(Throwable $e){
            Log::error('Failed to increment data' ,[
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

                'jam_hadir', 'jam_pulang', 'images',

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


    public function getAttendanceImagesPathByAttendanceId(int $attendanceId){
        try{
            return Attendance::select('images')
            ->findOrFail($attendanceId);
        }catch(Throwable $e){
            Log::error('Failed to get images path',[
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
            ->orderBy('attendances.created_at','desc')
            ->get();
        }catch(Throwable $e){
            Log::error('Failed to get attendances list',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function getAttendanceDetailsByAttendanceId(int $attendanceId, int $adminId){
        try{
            return User::where('admin_id',$adminId)
            ->join('accounts', 'users.account_id' ,'=', 'accounts.id')
            ->join('attendances', 'attendances.account_id', '=', 'accounts.id')
            ->where('attendances.id', $attendanceId)
            ->select(
                'users.nama_lengkap',
                'users.sekolah',
                'users.jurusan',
                'users.divisi',
                'users.profile_photo',

                'attendances.sudah_hadir',
                'attendances.sakit',
                'attendances.izin',
                'attendances.keterangan',
                'attendances.wfh',
                'attendances.jam_hadir',
                'attendances.sudah_laporan',
                'attendances.laporan',
                'attendances.images',
                'attendances.sudah_pulang',
                'attendances.jam_pulang',
                'attendances.created_date',
            )
            ->firstOrFail();
        }catch(Throwable $e){
            Log::error('Failed to fetch attendance details',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function updateAttendanceReportByAttendanceId(int $attendanceId, array $data){
        try{
            Attendance::where('id', $attendanceId)
            ->update($data);
        }catch(Throwable $e){
            Log::error('Failed to update report attendance',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

    public function getTodayAttendanceByAdminId(int $adminId, string $column): Collection{
        try{
            return User::where('admin_id',$adminId)
            ->join('attendances', 'attendances.account_id', '=', 'users.account_id')
            ->whereDate('attendances.created_at', now())
            ->select($column)
            ->get();
        }catch(Throwable $e){
            Log::error('Failed to get attendance',[
                'exception' => $e
            ]);

            throw $e;
        }
    }

}