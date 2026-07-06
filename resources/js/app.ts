import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
    strictMode: true,
    pages: {
        path: './Pages',
        extension: '.tsx',
        lazy: true,
    },
});