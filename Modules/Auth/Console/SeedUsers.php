<?php

namespace Modules\Auth\Console;

use Illuminate\Console\Command;

class SeedUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auth:seed-users {--force : Force the operation to run when in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed dummy user accounts for the Auth module';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Seeding user accounts...');

        $class = \Modules\User\Database\Seeders\UserDatabaseSeeder::class;

        $params = ['--class' => $class];
        if ($this->option('force')) {
            $params['--force'] = true;
        }

        $this->call('db:seed', $params);

        $this->info('User seeder finished.');

        return 0;
    }
}
