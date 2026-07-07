import "@fontsource/freckle-face"
import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
    strictMode: true,
    pages: {
        path: './Pages/User',
        extension: '.tsx',
        lazy: true,
    },
});