import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const role = req.cookies.get('user_role')?.value; // 'admin' | 'owner' | undefined

    const isAdminRoute = path.startsWith('/admin');

    // 1. No session → login
    if (isAdminRoute && !role) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (role && isAdminRoute) {
        // 2. Owner trying to access admin-only pages → redirect to their dashboard
        const adminOnlyPaths = ['/admin/crm', '/admin/propietarios', '/admin/blog'];
        const isAdminOnly = adminOnlyPaths.some(p => path.startsWith(p));

        if (isAdminOnly && role === 'owner') {
            return NextResponse.redirect(new URL('/admin/dashboard/owner', req.url));
        }

        // 3. Old URL compatibility: /admin/panel/propietario → /admin/dashboard/owner
        if (path.startsWith('/admin/panel/propietario')) {
            return NextResponse.redirect(new URL('/admin/dashboard/owner', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
