import { Auth } from './auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: unknown;
};
