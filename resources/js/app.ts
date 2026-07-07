import "@fontsource/freckle-face"
import "@fontsource/fredoka-one"
import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
    strictMode: true,
    pages: {
        path: './Pages/User',
        extension: '.tsx',
        lazy: true,
    },
});