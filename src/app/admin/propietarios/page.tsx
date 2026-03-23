'use client';

import { useState } from 'react';
import {
    HiOutlineLockClosed, HiOutlineSearch, HiOutlinePlusSm,
    HiOutlineStar, HiOutlineTrendingUp, HiOutlineCheckCircle,
    HiOutlineExclamationCircle, HiOutlineCurrencyDollar, HiArrowRight,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

type OwnerStatus = 'activo' | 'inactivo' | 'superhost';

interface Owner {
    id: number;
    name: string;
    phone: string;
    property: string;
    zone: string;
    status: OwnerStatus;
    rating: number;
    income: string;
    occupancy: string;
    since: string;
    platform: string;
}

const OWNERS: Owner[] = [
    { id: 1, name: 'Juan Pérez',       phone: '+57 314 111 2222', property: 'Finca El Paraíso',      zone: 'Vereda El Cairo',   status: 'superhost', rating: 4.96, income: '$8.4M',  occupancy: '87%', since: 'Ene 2025', platform: 'Airbnb' },
    { id: 2, name: 'Rosa Cárdenas',    phone: '+57 315 222 3333', property: 'Villa Esmeralda',        zone: 'Vía Villeta-Honda', status: 'activo',    rating: 4.82, income: '$14.2M', occupancy: '78%', since: 'Feb 2025', platform: 'Airbnb / Booking' },
    { id: 3, name: 'Alberto Mora',     phone: '+57 316 333 4444', property: 'Casa de Campo El Sol',  zone: 'Centro Villeta',    status: 'superhost', rating: 4.99, income: '$11.8M', occupancy: '92%', since: 'Mar 2024', platform: 'Airbnb' },
    { id: 4, name: 'Claudia Ruiz',     phone: '+57 317 444 5555', property: 'Finca La Panelera',     zone: 'Vereda San José',   status: 'activo',    rating: 4.75, income: '$6.9M',  occupancy: '71%', since: 'Jun 2025', platform: 'Booking' },
    { id: 5, name: 'Germán Salcedo',   phone: '+57 318 555 6666', property: 'Hacienda Los Cedros',   zone: 'Vía Nocaima',       status: 'inactivo',  rating: 4.40, income: '$0',     occupancy: '0%',  since: 'Sep 2024', platform: '—' },
];

const ST_CONF: Record<OwnerStatus, { label: string; color: string; icon: React.ReactNode }> = {
    superhost: { label: 'Superhost',  color: 'bg-amber-100 text-amber-700',   icon: <HiOutlineStar /> },
    activo:    { label: 'Activo',     color: 'bg-emerald-100 text-emerald-700', icon: <HiOutlineCheckCircle /> },
    inactivo:  { label: 'Inactivo',   color: 'bg-gray-100 text-gray-500',     icon: <HiOutlineExclamationCircle /> },
};

export default function PropietariosPage() {
    const [search, setSearch] = useState('');

    const filtered = OWNERS.filter(o =>
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.property.toLowerCase().includes(search.toLowerCase())
    );

    const totalIncome = '$41.3M';
    const avgRating = (OWNERS.reduce((a, b) => a + b.rating, 0) / OWNERS.length).toFixed(2);
    const superhosts = OWNERS.filter(o => o.status === 'superhost').length;

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A961] mb-1">Administración</p>
                    <h1 className="text-2xl font-bold text-[#10221a] flex items-center gap-2">
                        <HiOutlineLockClosed className="text-[#2C5F4F]" /> Propietarios Activos
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">Portafolio de propiedades bajo gestión de Villeta Conserje</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-[#2C5F4F] hover:bg-[#1e4538] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-md self-start sm:self-auto">
                    <HiOutlinePlusSm className="text-base" /> Agregar Propietario
                </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Propietarios',    value: OWNERS.length, color: 'text-[#10221a]',    icon: <HiOutlineLockClosed /> },
                    { label: 'Superhosts',       value: superhosts,    color: 'text-amber-600',    icon: <HiOutlineStar /> },
                    { label: 'Rating Promedio',  value: avgRating + '★', color: 'text-[#2C5F4F]', icon: <HiOutlineTrendingUp /> },
                    { label: 'Ingresos Totales', value: totalIncome,   color: 'text-emerald-600',  icon: <HiOutlineCurrencyDollar /> },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                        <div className={`text-lg mb-1 ${s.color}`}>{s.icon}</div>
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="relative">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o propiedad..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none bg-gray-50"
                    />
                </div>
            </div>

            {/* Owner Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filtered.map(o => {
                    const st = ST_CONF[o.status];
                    return (
                        <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-50">
                                <div className="w-11 h-11 rounded-full bg-[#2C5F4F]/10 text-[#2C5F4F] flex items-center justify-center font-bold text-base flex-shrink-0">
                                    {o.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-[#10221a] text-sm">{o.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{o.property} · {o.zone}</p>
                                </div>
                                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${st.color}`}>
                                    <span className="text-sm">{st.icon}</span> {st.label}
                                </span>
                            </div>
                            <div className="px-6 py-4 grid grid-cols-3 gap-4 text-center border-b border-gray-50">
                                <div>
                                    <p className="text-lg font-bold text-[#10221a]">{o.income}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Ingresos/mes</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-[#10221a]">{o.occupancy}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Ocupación</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-amber-500">{o.rating}★</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Rating</p>
                                </div>
                            </div>
                            <div className="px-6 py-3 flex items-center justify-between">
                                <div className="text-xs text-gray-400">
                                    <span className="font-semibold text-gray-600">{o.platform}</span> · Cliente desde {o.since}
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={`https://wa.me/${o.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(o.name)}%2C%20te%20escribe%20Villeta%20Conserje.`}
                                        target="_blank"
                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                                        title="WhatsApp"
                                    >
                                        <FaWhatsapp size={13} />
                                    </a>
                                    <button className="p-1.5 rounded-lg bg-[#2C5F4F]/10 text-[#2C5F4F] hover:bg-[#2C5F4F]/20 transition text-xs">
                                        <HiArrowRight size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
