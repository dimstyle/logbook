<?php

namespace Modules\Attendance\Console;

use Illuminate\Console\Command;
use Modules\Attendance\Models\Attendance;
use Modules\User\Models\User;

class CreateDailyAttendance extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'attendance:daily-attendance';

    /**
     * The console command description.
     */
    protected $description = 'Create or refresh daily attendance rows for all users.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::all();
        $created = 0;
        $skipped = 0;

        foreach ($users as $user) {
            if (! isset($user->account_id)) {
                continue;
            }

            $attendance = Attendance::where('account_id', $user->account_id)
            ->whereDate('created_at', now())
            ->firstOr(function () use ($user) {
                return Attendance::create([
                    'account_id' => $user->id,
                    'izin' => false,
                    'alasan_tidak_masuk' => '',
                    'sakit' => false,
                    'sudah_hadir' => false,
                    'jam_hadir' => null,
                    'wfh' => false,
                    'sudah_pulang' => false,
                    'jam_pulang' => null,
                    'sudah_laporan' => false,
                    'laporan' => '',
                    'images_path' => [],
                ]);
            });

            if ($attendance->wasRecentlyCreated) {
                $created++;
            } else {
                $skipped++;
            }
        }

        $this->info("Created {$created} attendance records.");
        $this->info("Skipped {$skipped} existing attendance records.");

        return 0;
    }
}
