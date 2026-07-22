<?php

namespace Modules\Attendance\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\Attendance\Models\Attendance;
use Modules\Auth\Models\Account;

class AttendanceDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = Account::query()->where('role', 'user')->get();

        if ($accounts->isEmpty()) {
            $this->command->warn('No user accounts found. Creating fallback user accounts for attendance seeding.');

            $accounts = collect(range(1, 3))->map(function (int $index): Account {
                return Account::firstOrCreate(
                    ['email' => "attendance-user{$index}@example.com"],
                    [
                        'username' => "attendance-user{$index}",
                        'password' => Hash::make('password'),
                        'role' => 'user',
                    ]
                );
            });
        }

        $today = now()->toDateString();
        $dates = [
            now()->subDays(4)->toDateString(),
            now()->subDays(3)->toDateString(),
            now()->subDays(2)->toDateString(),
            now()->subDay()->toDateString(),
            $today,
        ];

        $sampleReports = [
            'Membuat ringkasan kegiatan harian dan menyiapkan dokumentasi.',
            'Mengikuti pembelajaran mandiri dan mencatat progress tugas.',
            'Melakukan review materi dan mengerjakan latihan coding.',
            'Membuat laporan mingguan serta mempersiapkan presentasi.',
            'Membersihkan workspace dan menyusun daftar pekerjaan berikutnya.',
        ];

        foreach ($accounts as $account) {
            foreach ($dates as $index => $date) {
                $isToday = $date === $today;
                $report = $isToday
                    ? ''
                    : $sampleReports[$index % count($sampleReports)];

                Attendance::updateOrCreate(
                    [
                        'account_id' => $account->id,
                        'created_at' => $date . ' 08:00',
                    ],
                    [
                        'izin' => false,
                        'sudah_hadir' => true,
                        'jam_hadir' => $isToday ? '08:00' : ['07:30', '08:15', '09:00'][$index % 3],
                        'wfh' => false,
                        'sudah_pulang' => $isToday ? false : true,
                        'jam_pulang' => $isToday ? null : ['16:30', '17:00', '18:00'][$index % 3],
                        'sudah_laporan' => ! empty($report),
                        'laporan' => $report,
                        'images_path' => [],
                        'updated_at' => $date . '08:00',
                    ]
                );
            }
        }
    }
}
