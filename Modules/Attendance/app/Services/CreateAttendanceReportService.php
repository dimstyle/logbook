<?php

namespace Modules\Attendance\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Format;
use Intervention\Image\Laravel\Facades\Image;
use Modules\Attendance\DTO\CreateAttendanceReportDTO;
use Modules\Attendance\Repositories\AttendanceRepository;
use Storage;
use Str;

class CreateAttendanceReportService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle(CreateAttendanceReportDTO $report) {
        $user = Auth::user();
        $accountId = $user->id;

        $this->attendanceRepository->createAttendanceById(
            $accountId,
            ...$this->saveImages($report)
        );

        Log::info("Success to create attendance report",[
            'account_id' => $accountId
        ]);
    }

    private function saveImages(CreateAttendanceReportDTO $report): array {
        $result = [];
        $images = $report->images;
        
        foreach ($images as $image){
    
            $filename = Str::uuid().'.webp';
    
            $imageData = Image::decode($image)
            ->encodeUsingFormat(
                Format::WEBP,
                quality: 80
            );

            $path = 'attendance-reports/'.$filename;

            Storage::disk('local')->put(
                $path,
                $imageData
            );

            array_push($result, $path);
        }

        return $result;
    }
}
