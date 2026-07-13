<?php

namespace Modules\Auth\Console;

use Illuminate\Console\Command;

class ResetSqlite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auth:reset-sqlite {--seed : Run db:seed after migrate} {--force : Force the operation to run when in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove and recreate SQLite database file and run migrations';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $dbPath = config('database.connections.sqlite.database') ?? env('DB_DATABASE');

        if (!$dbPath) {
            $this->error('SQLite database path not configured (DB_DATABASE).');
            return 1;
        }

        if ($dbPath === ':memory:') {
            $this->error('SQLite is configured as in-memory; nothing to reset.');
            return 1;
        }

        if (strpos($dbPath, DIRECTORY_SEPARATOR) !== 0) {
            $dbPath = base_path($dbPath);
        }

        if (file_exists($dbPath)) {
            if (!@unlink($dbPath)) {
                $this->error("Failed to remove {$dbPath}.");
                return 1;
            }
        }

        if (!@touch($dbPath)) {
            $this->error("Failed to create {$dbPath}.");
            return 1;
        }

        @chmod($dbPath, 0664);

        $this->info("SQLite database reset at {$dbPath}");

        $this->call('migrate', ['--force' => true]);

        if ($this->option('seed')) {
            $this->call('db:seed', ['--force' => true]);
        }

        $this->info('Migrations completed.');

        return 0;
    }
}
