<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeModule extends Command
{
    protected $signature = 'make:module {name}';

    protected $description = 'Create a feature module';

    public function handle(): int
    {
        $name = ucfirst($this->argument('name'));

        $base = app_path("Modules/{$name}");

        if (File::exists($base)) {
            $this->error("Module {$name} already exists");

            return self::FAILURE;
        }


        $folders = [
            'Http/Controllers',
            'Models',
            'Providers',
        ];


        foreach ($folders as $folder) {
            File::ensureDirectoryExists(
                "{$base}/{$folder}"
            );
        }


        $this->createFromStub(
            'model',
            "{$base}/Models/{$name}.php",
            "App\\Modules\\{$name}\\Models",
            $name
        );


        $this->createFromStub(
            'provider',
            "{$base}/Providers/{$name}ServiceProvider.php",
            "App\\Modules\\{$name}\\Providers",
            "{$name}ServiceProvider"
        );


        $this->createFromStub(
            'controller',
            "{$base}/Http/Controllers/{$name}Controller.php",
            "App\\Modules\\{$name}\\Http\\Controllers",
            "{$name}Controller"
        );


        $this->info("Module {$name} created!");

        return self::SUCCESS;
    }


    private function createFromStub(
        string $stub,
        string $destination,
        string $namespace,
        string $class
    ): void {

        $template = File::get(
            base_path("stubs/{$stub}.stub")
        );


        $template = str_replace(
            [
                '{{ namespace }}',
                '{{ class }}',
            ],
            [
                $namespace,
                $class,
            ],
            $template
        );


        File::put(
            $destination,
            $template
        );
    }
}