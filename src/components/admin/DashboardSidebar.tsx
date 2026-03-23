'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    HiOutlineHome, HiOutlineUsers, HiOutlineCalendar,
    HiOutlineCurrencyDollar, HiOutlineStar, HiOutlineChat,
    HiOutlinePencilAlt, HiOutlineCog, HiOutlineLogout,
    HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineLockClosed,
    HiOutlineClipboardList, HiMenuAlt2,
} from 'react-icons/hi';
import { Logo } from '@/components/ui/Logo';

type Role = 'admin' | 'owner';

interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
    // Admin items
    { href: '/admin/crm',           label: 'CRM / Leads',       icon: <HiOutlineUsers />,          roles: ['admin'], badge: '12' },
    { href: '/admin/propietarios',  label: 'Propietarios',      icon: <HiOutlineLockClosed />,     roles: ['admin'] },
    { href: '/admin/blog',          label: 'Blog',              icon: <HiOutlinePencilAlt />,      roles: ['admin'] },
    // Owner items
    { href: '/admin/dashboard/owner',           label: 'Mi Dashboard',      icon: <HiOutlineHome />,           roles: ['owner', 'admin'] },
    { href: '/admin/dashboard/owner/reservas',  label: 'Reservas',          icon: <HiOutlineCalendar />,       roles: ['owner'], badge: '3' },
    { href: '/admin/dashboard/owner/ingresos',  label: 'Ingresos',          icon: <HiOutlineCurrencyDollar />, roles: ['owner'] },
    { href: '/admin/dashboard/owner/resenas',   label: 'Reseñas',           icon: <HiOutlineStar />,           roles: ['owner'] },
    { href: '/admin/dashboard/owner/solicitudes', label: 'Solicitudes',     icon: <HiOutlineClipboardList />,  roles: ['owner'] },
    { href: '/admin/dashboard/owner/mensajes',  label: 'Mensajes',          icon: <HiOutlineChat />,           roles: ['owner'] },
];

interface Props { role: Role; userName: string; propertyName?: string; }

export function DashboardSidebar({ role, userName, propertyName }: Props) {
    const pathname  = usePathname();
    const router    = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(role));

    const handleLogout = () => {
        document.cookie = 'user_role=; path=/; max-age=0';
        router.push('/login');
    };

    const roleLabel = role === 'admin' ? 'Administrador' : 'Propietario';
    const roleBadgeColor = role === 'admin'
        ? 'bg-red-100 text-red-700'
        : 'bg-emerald-100 text-emerald-700';

    const SidebarContent = () => (
        <div className={`flex flex-col h-full bg-[#10221a] text-white transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}>

            {/* Logo + Collapse toggle */}
            <div className={`flex items-center border-b border-white/10 ${collapsed ? 'justify-center px-3 py-4' : 'justify-between px-5 py-4'}`}>
                {!collapsed && (
                    <Link href="/" className="block">
                        <Logo className="h-10 w-auto brightness-0 invert" />
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white/70 hover:text-white transition-all flex-shrink-0"
                    title={collapsed ? 'Expandir' : 'Colapsar'}
                >
                    {collapsed ? <HiOutlineChevronRight size={14} /> : <HiOutlineChevronLeft size={14} />}
                </button>
            </div>

            {/* User info */}
            <div className={`border-b border-white/10 ${collapsed ? 'px-2 py-4 text-center' : 'px-5 py-4'}`}>
                <div className={`flex ${collapsed ? 'flex-col items-center gap-1' : 'items-center gap-3'}`}>
                    <div className="w-9 h-9 rounded-full bg-[#C9A961] flex items-center justify-center text-[#10221a] font-bold text-sm flex-shrink-0">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    {!collapsed && (
                        <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">{userName}</p>
                            {propertyName && <p className="text-white/50 text-xs truncate">{propertyName}</p>}
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <span className={`mt-2 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${roleBadgeColor}`}>
                        {roleLabel}
                    </span>
                )}
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                {!collapsed && (
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 px-3 mb-2">
                        {role === 'admin' ? 'Administración' : 'Mi Propiedad'}
                    </p>
                )}
                {visibleItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin/dashboard/owner' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            title={collapsed ? item.label : undefined}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                                isActive
                                    ? 'bg-[#C9A961] text-[#10221a]'
                                    : 'text-white/60 hover:text-white hover:bg-white/8'
                            }`}
                        >
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            {!collapsed && <span className="truncate">{item.label}</span>}
                            {!collapsed && item.badge && (
                                <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#10221a]/20 text-[#10221a]' : 'bg-[#C9A961] text-[#10221a]'}`}>
                                    {item.badge}
                                </span>
                            )}
                            {/* Tooltip when collapsed */}
                            {collapsed && (
                                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="border-t border-white/10 p-2 space-y-0.5">
                <Link
                    href="/admin/configuracion"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
                    title={collapsed ? 'Configuración' : undefined}
                >
                    <HiOutlineCog className="text-lg flex-shrink-0" />
                    {!collapsed && <span>Configuración</span>}
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-950/40 transition-all"
                    title={collapsed ? 'Cerrar sesión' : undefined}
                >
                    <HiOutlineLogout className="text-lg flex-shrink-0" />
                    {!collapsed && <span>Cerrar sesión</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile header bar */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#10221a] text-white fixed top-0 left-0 right-0 z-50 border-b border-white/10">
                <Logo className="h-8 w-auto brightness-0 invert" />
                <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg bg-white/10">
                    <HiMenuAlt2 size={20} />
                </button>
            </div>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute left-0 top-0 bottom-0 flex" onClick={e => e.stopPropagation()}>
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:flex h-screen sticky top-0 flex-shrink-0">
                <SidebarContent />
            </div>
        </>
    );
}
