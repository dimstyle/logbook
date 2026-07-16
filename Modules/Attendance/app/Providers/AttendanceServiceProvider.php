<?php

namespace Modules\Attendance\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class AttendanceServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Attendance';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'attendance';

    /**
     * Command classes to register.
     *
     * @var string[]
     */
    protected array $commands = [
        \Modules\Attendance\Console\CreateDailyAttendance::class,
    ];

    /**
     * Provider classes to register.
     *
     * @var string[]
     */
    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];

    /**
     * Define module schedules.
     * 
     * @param Schedule $schedule
     */
    protected function configureSchedules(Schedule $schedule): void
    {
        $schedule->command('attendance:daily-attendance')->dailyAt('06:00');
    }
}

