<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeModuleComponent extends Command
{
    protected $signature = 'make:module-component 
                            {module}
                            {type}
                            {name}';

    protected $description = 'Create a component inside module';

    public function handle(): int
    {
        $module = ucfirst($this->argument('module'));
        $type = strtolower($this->argument('type'));
        $name = $this->argument('name');

        $components = [
            'controller' => 'Controllers',
            'service' => 'Services',
            'request' => 'Requests',
            'dto' => 'DTOs',
            'model' => 'Models',
            'repository' => 'Repositories',
        ];

        if (!isset($components[$type])) {
            $this->error(
                'Available: ' . implode(', ', array_keys($components))
            );

            return self::FAILURE;
        }


        $folder = $components[$type];


        $path = app_path(
            "Modules/{$module}/{$folder}"
        );


        File::ensureDirectoryExists($path);


        $namespace =
            "App\\Modules\\{$module}\\{$folder}";


        $stubPath = base_path(
            "stubs/{$type}.stub"
        );


        if (!File::exists($stubPath)) {
            $this->error(
                "Stub {$type}.stub not found"
            );

            return self::FAILURE;
        }


        $stub = File::get($stubPath);


        $stub = str_replace(
            [
                '{{ namespace }}',
                '{{ class }}',
            ],
            [
                $namespace,
                $name,
            ],
            $stub
        );


        File::put(
            "{$path}/{$name}.php",
            $stub
        );


        $this->info(
            "{$type} {$name} created!"
        );


        return self::SUCCESS;
    }
}