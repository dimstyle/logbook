<?php

namespace Modules\Attendance\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Attendance\Models\Attendance;
use Modules\Auth\Models\Account;

class AttendanceDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = Account::query()->where('role', 'user')->get();

        if ($accounts->isEmpty()) {
            $this->command->warn('No user accounts found. Skipping attendance seeding.');

            return;
        }

        $today = now()->toDateString();
        $dates = [
            now()->subDays(2)->toDateString(),
            now()->subDay()->toDateString(),
            $today,
        ];

        foreach ($accounts as $account) {
            foreach ($dates as $index => $date) {
                $isToday = $date === $today;

                Attendance::updateOrCreate(
                    [
                        'account_id' => $account->id,
                        'created_date' => $date,
                    ],
                    [
                        'izin' => false,
                        'alasan_tidak_masuk' => '',
                        'sudah_hadir' => true,
                        'jam_hadir' => $isToday ? '08:00:00' : ['07:30:00', '08:15:00', '09:00:00'][$index % 3],
                        'wfh' => false,
                        'sudah_pulang' => $isToday ? false : true,
                        'jam_pulang' => $isToday ? null : ['16:30:00', '17:00:00', '18:00:00'][$index % 3],
                        'sudah_laporan' => ! $isToday,
                        'laporan' => $isToday
                            ? ''
                            : 'Kegiatan ' . ($account->username ?? 'user') . ' pada ' . $date,
                        'images_path' => [],
                        'created_at' => $date . ' 08:00:00',
                        'updated_at' => $date . ' 08:00:00',
                    ]
                );
            }
        }
    }
}
