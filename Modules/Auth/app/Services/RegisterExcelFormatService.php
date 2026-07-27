<?php

namespace Modules\Auth\Services;


use Illuminate\Http\UploadedFile;
use Modules\Auth\DTO\RegisterDTO;
use PhpOffice\PhpSpreadsheet\IOFactory;


class RegisterExcelFormatService
{
    public function __construct(
        private RegisterService $registerService
    ) {}

    public function handle(UploadedFile $file): array
    {
        $spreadsheet = IOFactory::load(
            $file->path()
        );

        $worksheet = $spreadsheet->getActiveSheet();

        $rows = $worksheet->toArray(
            null,
            true,
            true,
            true
        );

        // Ambil header dari baris pertama
        $headers = array_map(
            fn ($header) => strtolower(trim($header)),
            array_shift($rows)
        );

        $success = 0;
        $failed = [];

        foreach ($rows as $rowNumber => $row) {
            try {
                $data = array_combine(
                    $headers,
                    array_values($row)
                );

                $registerDTO = RegisterDTO::fromArray([
                    'username' => $data['username'],
                    'email' => $data['email'],
                    'password' => $data['password'],
                    'nama_lengkap' => $data['nama_lengkap'],
                    'sekolah' => $data['sekolah'],
                    'jurusan' => $data['jurusan'],
                    'divisi' => $data['divisi'],
                    'nomor_telepon' => $data['nomor_telepon'],
                    'periode_awal' => $data['periode_awal'],
                    'periode_akhir' => $data['periode_akhir'],
                ]);

                $this->registerService->handle(
                    $registerDTO
                );

                $success++;

            } catch (\Throwable $e) {
                $failed[] = [
                    'row' => $rowNumber + 2,
                    'message' => $e->getMessage(),
                ];
            }
        }

        return [
            'success' => $success,
            'failed' => count($failed),
            'errors' => $failed,
        ];
    }
}