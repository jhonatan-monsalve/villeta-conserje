'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/admin/DashboardSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<'admin' | 'owner' | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // En un export estático, leemos de cookies desde el navegador (cliente)
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const currentRole = getCookie('user_role') as 'admin' | 'owner' | undefined;
        
        if (!currentRole) {
            router.push('/login');
        } else {
            setRole(currentRole);
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <div className="min-h-screen bg-[#F0EFE9] flex items-center justify-center">Cargando...</div>;
    }

    // Mock user data by role
    const userData = role === 'admin'
        ? { userName: 'Yenifer Monsalve', propertyName: undefined }
        : { userName: 'Juan Pérez', propertyName: 'Finca El Paraíso' };

    return (
        <div className="flex min-h-screen bg-[#F0EFE9]">
            <DashboardSidebar
                role={role!}
                userName={userData.userName}
                propertyName={userData.propertyName}
            />
            <main className="flex-1 overflow-auto pt-14 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
