<?php

namespace Modules\Auth\Console;

use Illuminate\Console\Command;

class SeedAdmins extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auth:seed-admins {--force : Force the operation to run when in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed dummy admin accounts for the Auth module';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Seeding admin accounts...');

        $class = \Modules\Auth\Database\Seeders\AdminDatabaseSeeder::class;

        $params = ['--class' => $class];
        if ($this->option('force')) {
            $params['--force'] = true;
        }

        $this->call('db:seed', $params);

        $this->info('Admin seeder finished.');

        return 0;
    }
}
