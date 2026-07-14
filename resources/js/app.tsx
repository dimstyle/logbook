import "@fontsource/freckle-face"
import "@fontsource/fredoka-one"
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import React from 'react';
import { createRoot } from "react-dom/client";

interface InertiaSetupArgs {
  el: HTMLElement;
  App: React.ComponentType<any>;
  props: Record<string, any>;
}


createInertiaApp({
    strictMode: true,
    resolve: (name: string) => resolvePageComponent(
        `./Pages/${name}.tsx`, import.meta.glob<any>('./Pages/**/*.tsx')
    ),

    setup({ el, App, props }: InertiaSetupArgs) {
        createRoot(el).render(<App {...props} />);
    },
});