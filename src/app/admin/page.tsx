import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Smart entry point: redirect to role-appropriate dashboard
export default function AdminRoot() {
    const role = cookies().get('user_role')?.value;
    if (role === 'admin') redirect('/admin/crm');
    if (role === 'owner') redirect('/admin/dashboard/owner');
    redirect('/login');
}
