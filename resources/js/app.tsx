import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name: string) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const normalizedName = name.replace(/\\/g, '/').toLowerCase();
        const key = Object.keys(pages).find(k => k.toLowerCase() === `./pages/${normalizedName}.tsx`);
        
        if (!key) {
             throw new Error(`Page not found: ${name}. Available pages: ${Object.keys(pages).join(', ')}`);
        }

        const page = (pages[key] as any).default;
        
        // If layout is a metadata object, wrap it!
        if (page.layout && typeof page.layout !== 'function' && !Array.isArray(page.layout)) {
            const metadata = page.layout;
            const breadcrumbs = metadata.breadcrumbs || [];
            
            if (name.startsWith('auth/')) {
                page.layout = (children: React.ReactNode) => (
                    <AuthLayout title={metadata.title} description={metadata.description}>{children}</AuthLayout>
                );
            } else if (name.startsWith('settings/')) {
                page.layout = (children: React.ReactNode) => (
                    <AppLayout breadcrumbs={breadcrumbs}><SettingsLayout>{children}</SettingsLayout></AppLayout>
                );
            } else {
                page.layout = (children: React.ReactNode) => (
                    <AppLayout breadcrumbs={breadcrumbs}>{children}</AppLayout>
                );
            }
        } 
        // If layout is missing (except for welcome), apply a default wrapper
        else if (!page.layout && name !== 'welcome') {
             page.layout = (children: React.ReactNode) => <AppLayout>{children}</AppLayout>;
        }

        return page;
    },
    strictMode: true,
    // @ts-ignore
    setup({ el, App, props }) {
        createRoot(el as HTMLElement).render(
            <TooltipProvider delayDuration={0}>
                <App {...props} />
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
