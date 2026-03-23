'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    HiOutlineCurrencyDollar, HiOutlineCalendar, HiOutlineStar,
    HiOutlineChat, HiOutlineClipboardList, HiOutlineTrendingUp,
    HiOutlineLockClosed, HiArrowRight, HiOutlineCheckCircle,
    HiOutlineClock, HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/lib/config/siteConfig';

// ── Mock Data ──────────────────────────────────────
const STATS = [
    { label: 'Ingresos del Mes',   value: '$8.400.000',  sub: '+12% vs mes anterior',  positive: true,  icon: <HiOutlineCurrencyDollar className="text-2xl" />, color: 'emerald' },
    { label: 'Ocupación Actual',   value: '87%',          sub: '26/30 días reservados', positive: true,  icon: <HiOutlineTrendingUp className="text-2xl" />,      color: 'blue' },
    { label: 'Próxima Reserva',    value: '29 Mar',       sub: 'Familia Rodríguez · 4 noches', positive: null, icon: <HiOutlineCalendar className="text-2xl" />,   color: 'violet' },
    { label: 'Valoración Media',   value: '4.96 ★',      sub: '47 reseñas totales',    positive: true,  icon: <HiOutlineStar className="text-2xl" />,            color: 'amber' },
];

const UPCOMING_RESERVATIONS = [
    { guest: 'Familia Rodríguez',  dates: '29 Mar – 2 Abr',   pax: 6, nights: 4, status: 'confirmed', platform: 'Airbnb' },
    { guest: 'Carlos Mejía',       dates: '5 Abr – 7 Abr',    pax: 3, nights: 2, status: 'confirmed', platform: 'Booking' },
    { guest: 'Ana Torres',         dates: '12 Abr – 14 Abr',  pax: 4, nights: 2, status: 'pending',   platform: 'Directo' },
];

const RECENT_REVIEWS = [
    { author: 'Laura P.',   rating: 5, comment: 'Impecable. Todo perfecto, la atención fue excepcional y la finca está hermosa.', date: '18 Mar 2026' },
    { author: 'Miguel A.',  rating: 5, comment: 'La mejor experiencia que hemos tenido en Villeta. Volvemos seguro.', date: '10 Mar 2026' },
    { author: 'Sofía M.',   rating: 5, comment: 'Todo estuvo listo al llegar. El jacuzzi caliente fue lo mejor del fin de semana.', date: '3 Mar 2026' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    confirmed: { label: 'Confirmada', color: 'bg-emerald-100 text-emerald-700', icon: <HiOutlineCheckCircle /> },
    pending:   { label: 'Pendiente',  color: 'bg-amber-100 text-amber-700',     icon: <HiOutlineClock /> },
    cancelled: { label: 'Cancelada',  color: 'bg-red-100 text-red-700',         icon: <HiOutlineExclamationCircle /> },
};

const COLOR_MAP: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue:    'bg-blue-50 text-blue-600',
    violet:  'bg-violet-50 text-violet-600',
    amber:   'bg-amber-50 text-amber-600',
};

// ── Component ──────────────────────────────────────
export default function OwnerDashboard() {
    const [messageForm, setMessageForm] = useState({ subject: 'Mantenimiento', priority: 'Normal', body: '' });
    const [messageSent, setMessageSent]  = useState(false);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 3000);
        setMessageForm(f => ({ ...f, body: '' }));
    };

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A961] mb-1">Panel de Propietario</p>
                    <h1 className="text-2xl font-bold text-[#10221a]">Bienvenido, Juan 👋</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Finca El Paraíso · Temporada Alta — Semana Santa 2026</p>
                </div>
                <div className="flex gap-2">
                    <a
                        href={SITE_CONFIG.contact.manager.whatsappLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
                    >
                        <FaWhatsapp /> Contactar Gestor
                    </a>
                    <Link
                        href="/admin/dashboard/owner/solicitudes"
                        className="inline-flex items-center gap-2 bg-[#2C5F4F] hover:bg-[#1e4538] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
                    >
                        <HiOutlineClipboardList /> Nueva Solicitud
                    </Link>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${COLOR_MAP[s.color]}`}>
                                {s.icon}
                            </span>
                            {s.positive !== null && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {s.positive ? '▲' : '▼'}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">{s.label}</p>
                        <p className="text-2xl font-bold text-[#10221a]">{s.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Upcoming Reservations */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="text-[#2C5F4F] text-lg" />
                            <h2 className="font-bold text-[#10221a] text-sm">Próximas Reservas</h2>
                        </div>
                        <Link href="/admin/dashboard/owner/reservas" className="text-xs text-[#C9A961] font-semibold hover:underline flex items-center gap-1">
                            Ver todas <HiArrowRight />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {UPCOMING_RESERVATIONS.map((r, i) => {
                            const st = STATUS_CONFIG[r.status];
                            return (
                                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="w-9 h-9 rounded-full bg-[#2C5F4F]/10 text-[#2C5F4F] flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {r.guest.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-[#10221a] truncate">{r.guest}</p>
                                        <p className="text-xs text-gray-400">{r.dates} · {r.pax} personas · {r.nights} noches</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${st.color}`}>
                                            {st.icon} {st.label}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium">{r.platform}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions + Contact */}
                <div className="flex flex-col gap-4">
                    {/* Quick actions */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <h3 className="font-bold text-[#10221a] text-sm mb-3 flex items-center gap-2">
                            <HiOutlineLockClosed className="text-[#C9A961]" /> Acciones Rápidas
                        </h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Bloquear fechas', href: '/admin/dashboard/owner/reservas', color: 'bg-gray-50 hover:bg-gray-100 text-gray-700' },
                                { label: 'Ver mis ingresos', href: '/admin/dashboard/owner/ingresos', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
                                { label: 'Ver reseñas', href: '/admin/dashboard/owner/resenas', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
                                { label: 'Enviar solicitud', href: '/admin/dashboard/owner/solicitudes', color: 'bg-violet-50 hover:bg-violet-100 text-violet-700' },
                            ].map(a => (
                                <Link key={a.href} href={a.href} className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${a.color}`}>
                                    {a.label} <HiArrowRight />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact card */}
                    <div className="bg-[#10221a] rounded-2xl p-5 text-white">
                        <h3 className="font-bold text-sm mb-1">¿Necesitas ayuda?</h3>
                        <p className="text-white/60 text-xs mb-4">Tu gestor está disponible de lun–sáb 8am–8pm</p>
                        <a href={SITE_CONFIG.contact.manager.whatsappLink} target="_blank" className="w-full flex items-center justify-center gap-2 bg-[#C9A961] hover:bg-[#b09355] text-[#10221a] text-xs font-bold py-2.5 rounded-xl transition-all">
                            <FaWhatsapp /> Whatsapp directo
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Reviews section ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <HiOutlineStar className="text-amber-500 text-lg" />
                        <h2 className="font-bold text-[#10221a] text-sm">Últimas Reseñas</h2>
                    </div>
                    <Link href="/admin/dashboard/owner/resenas" className="text-xs text-[#C9A961] font-semibold hover:underline flex items-center gap-1">
                        Ver todas <HiArrowRight />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-50">
                    {RECENT_REVIEWS.map((r, i) => (
                        <div key={i} className="px-6 py-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-[#C9A961]/20 text-[#C9A961] flex items-center justify-center font-bold text-xs flex-shrink-0">
                                    {r.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-xs text-[#10221a]">{r.author}</p>
                                    <p className="text-[10px] text-gray-400">{r.date}</p>
                                </div>
                                <div className="ml-auto text-amber-400 text-xs font-bold">{'★'.repeat(r.rating)}</div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed italic">"{r.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Message form ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-50">
                    <HiOutlineChat className="text-[#2C5F4F] text-lg" />
                    <h2 className="font-bold text-[#10221a] text-sm">Enviar Solicitud al Gestor</h2>
                </div>
                <div className="p-6">
                    {messageSent ? (
                        <div className="text-center py-6">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">✓</div>
                            <p className="font-bold text-[#10221a]">¡Solicitud enviada!</p>
                            <p className="text-xs text-gray-400 mt-1">Tu gestor la atenderá en menos de 2 horas.</p>
                        </div>
                    ) : (
                        <form onSubmit={sendMessage} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Asunto</label>
                                    <select
                                        value={messageForm.subject}
                                        onChange={e => setMessageForm(f => ({ ...f, subject: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none bg-gray-50"
                                    >
                                        <option>Mantenimiento</option>
                                        <option>Dudas sobre Pagos</option>
                                        <option>Bloquear Fechas (Uso Propio)</option>
                                        <option>Problema con Reserva</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Prioridad</label>
                                    <select
                                        value={messageForm.priority}
                                        onChange={e => setMessageForm(f => ({ ...f, priority: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none bg-gray-50"
                                    >
                                        <option>Normal</option>
                                        <option>Alta</option>
                                        <option>Urgente</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Mensaje</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={messageForm.body}
                                    onChange={e => setMessageForm(f => ({ ...f, body: e.target.value }))}
                                    placeholder="Describe tu solicitud con el mayor detalle posible..."
                                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none resize-none bg-gray-50"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex items-center gap-2 bg-[#2C5F4F] hover:bg-[#1e4538] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-md">
                                    Enviar Solicitud <HiArrowRight />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
