'use client';

import { ReactNode, useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ClientNavbarWrapper from './ClientNavbarWrapper';
import { Footer } from './footer';

export default function ClientWrapper({ children }: { children: ReactNode }) {
    const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <SessionContextProvider supabaseClient={supabase}>
            <ClientNavbarWrapper />
            <main>{children}</main>
            <Footer />
        </SessionContextProvider>
    );
}
