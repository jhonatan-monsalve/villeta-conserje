import type { Metadata } from 'next';
import AdminShell from './AdminShell';

// El panel es privado: no debe aparecer en buscadores.
export const metadata: Metadata = {
    title: 'Panel',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminShell>{children}</AdminShell>;
}
