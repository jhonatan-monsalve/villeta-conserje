import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/admin/DashboardSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const role = cookieStore.get('user_role')?.value as 'admin' | 'owner' | undefined;

    if (!role) redirect('/login');

    // Mock user data by role — in production this comes from DB/session
    const userData = role === 'admin'
        ? { userName: 'Yenifer Monsalve', propertyName: undefined }
        : { userName: 'Juan Pérez', propertyName: 'Finca El Paraíso' };

    return (
        <div className="flex min-h-screen bg-[#F0EFE9]">
            <DashboardSidebar
                role={role}
                userName={userData.userName}
                propertyName={userData.propertyName}
            />
            {/* Main content — with top padding on mobile for the fixed header */}
            <main className="flex-1 overflow-auto pt-14 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
