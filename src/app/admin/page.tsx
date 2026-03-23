'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRoot() {
    const router = useRouter();

    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const role = getCookie('user_role');
        if (role === 'admin') router.push('/admin/crm');
        else if (role === 'owner') router.push('/admin/dashboard/owner');
        else router.push('/login');
    }, [router]);

    return null;
}
