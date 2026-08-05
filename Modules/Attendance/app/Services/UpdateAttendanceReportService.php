<?php

namespace Modules\Attendance\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Format;
use Intervention\Image\Laravel\Facades\Image;
use Modules\Attendance\Repositories\AttendanceRepository;
use Storage;
use Str;

class UpdateAttendanceReportService
{
    public function __construct(
        private AttendanceRepository $attendanceRepository
    ){}

    public function handle(array $data) {

        Log::info('update data' , $data);

        $user = Auth::user();
        $userId = $user->id;

        $imagesPath = $this->saveReportImages($userId, $data);

        $updateData = [
            'images' => $imagesPath,
            'laporan' => $data['laporan']
        ];
        
        $this->attendanceRepository->updateAttendanceReportByAttendanceId(
            $data['attendance_id'],
            $updateData    
        );

        Log::info('Success to edit attendance data',[
            'attendance_id' => $data['attendance_id']
        ]);
    }

    private function saveReportImages(int $accountId,array $data){    

        $stringFromDb = $this->attendanceRepository
        ->getAttendanceImagesPathByAttendanceId($data['attendance_id'])['images'];

        $imagesPath = json_decode($stringFromDb, true);
        
        $changed_path = [];
        $new_path = [];

        if(array_key_exists('changed_images', $data)){
            $changed_path = $data['changed_images'];
        }
        
        if(array_key_exists('new_images', $data)){
            $new_path = $data['new_images'];
        }

        foreach ($changed_path as $fileImage){
            $index = intval($fileImage['id']);
            $file = $fileImage['images'];

            $path = $this->saveImageToStorage($accountId, $file);

            $this->deleteImageFromStorage($imagesPath[$index]);

            $imagesPath[$index] = $path;
        }

        foreach($new_path as $fileImage){
            $file = $fileImage['images'];

            $path = $this->saveImageToStorage($accountId, $file);

            $imagesPath[] = $path;

        }

        return $imagesPath;
    }

    private function saveImageToStorage(int $accountId, UploadedFile $file){
        $filename = Str::uuid().'.webp';

        $imageData = Image::decode($file)
        ->encodeUsingFormat(
            Format::WEBP,
            quality: 80
        );

        $path = 'attendance-reports/'.$accountId.'/'.$filename;

        Storage::disk('local')->put(
            $path,
            $imageData
        );

        return $path;
    }

    private function deleteImageFromStorage(string $path){
        Storage::disk('local')->delete($path);
    }
}
