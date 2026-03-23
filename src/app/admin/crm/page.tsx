'use client';

import { useState } from 'react';
import {
    HiOutlineSearch, HiOutlineFilter, HiOutlineUsers,
    HiOutlinePlusSm, HiOutlineCheckCircle, HiOutlineClock,
    HiOutlineXCircle, HiOutlinePhone, HiOutlineMail,
    HiOutlineChevronDown, HiArrowRight,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

type LeadStatus = 'activo' | 'negociacion' | 'cerrado' | 'perdido';

interface Lead {
    id: number;
    name: string;
    phone: string;
    email: string;
    property: string;
    zone: string;
    status: LeadStatus;
    source: string;
    date: string;
    estimated: string;
    notes: string;
}

const LEADS: Lead[] = [
    { id: 1,  name: 'Carlos Ramírez',   phone: '+57 312 345 6789', email: 'carlos@email.com',  property: 'Finca con piscina 4 hab', zone: 'Vereda El Cairo',    status: 'negociacion', source: 'WhatsApp',  date: '20 Mar 2026', estimated: '$12M/mes',  notes: 'Quiere empezar en mayo' },
    { id: 2,  name: 'María López',      phone: '+57 315 234 5678', email: 'maria@email.com',   property: 'Casa finca 6 habitaciones', zone: 'Vía Villeta-Honda', status: 'activo',      source: 'Web',       date: '19 Mar 2026', estimated: '$18M/mes',  notes: 'Muy interesada, solicitó valoración' },
    { id: 3,  name: 'Juan Hernández',   phone: '+57 317 456 7891', email: 'juan@email.com',    property: 'Finca con jacuzzi y lago', zone: 'Vereda La Esmeralda', status: 'cerrado',   source: 'Referido',  date: '15 Mar 2026', estimated: '$15M/mes',  notes: 'Contrato firmado — empieza abril' },
    { id: 4,  name: 'Sofía Castro',     phone: '+57 318 567 8901', email: 'sofia@email.com',   property: 'Cabaña 3 hab + piscina', zone: 'Centro Villeta',     status: 'activo',      source: 'Instagram', date: '18 Mar 2026', estimated: '$8M/mes',   notes: 'Solicita reunión virtual' },
    { id: 5,  name: 'Pedro Morales',    phone: '+57 310 678 9012', email: 'pedro@email.com',   property: 'Finca ganadera con hacienda', zone: 'Vía Nocaima',   status: 'perdido',     source: 'Facebook',  date: '10 Mar 2026', estimated: '$22M/mes',  notes: 'Prefirió gestión directa' },
    { id: 6,  name: 'Ana Jiménez',      phone: '+57 311 789 0123', email: 'ana@email.com',     property: 'Finca boutique 5 hab',   zone: 'Vereda Guatavita',   status: 'negociacion', source: 'Web',       date: '17 Mar 2026', estimated: '$14M/mes',  notes: 'Revisando contrato' },
    { id: 7,  name: 'Luis Gómez',       phone: '+57 313 890 1234', email: 'luis@email.com',    property: 'Villa lujo con helipuerto', zone: 'Carretera principal', status: 'activo',  source: 'Referido',  date: '21 Mar 2026', estimated: '$35M/mes',  notes: 'Lead premium — prioritario' },
    { id: 8,  name: 'Elena Vargas',     phone: '+57 316 901 2345', email: 'elena@email.com',   property: 'Finca panelera con tour', zone: 'Vereda San José',   status: 'cerrado',     source: 'Web',       date: '12 Mar 2026', estimated: '$10M/mes',  notes: 'Modelo agroturismo activo' },
];

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; icon: React.ReactNode }> = {
    activo:       { label: 'Activo',       color: 'bg-blue-100 text-blue-700',    icon: <HiOutlineClock /> },
    negociacion:  { label: 'Negociación',  color: 'bg-amber-100 text-amber-700',  icon: <HiArrowRight /> },
    cerrado:      { label: 'Cerrado',      color: 'bg-emerald-100 text-emerald-700', icon: <HiOutlineCheckCircle /> },
    perdido:      { label: 'Perdido',      color: 'bg-red-100 text-red-700',      icon: <HiOutlineXCircle /> },
};

const SUMMARY = [
    { label: 'Total Leads',  value: LEADS.length,                                        color: 'text-[#10221a]' },
    { label: 'Activos',      value: LEADS.filter(l => l.status === 'activo').length,      color: 'text-blue-600' },
    { label: 'Negociación',  value: LEADS.filter(l => l.status === 'negociacion').length, color: 'text-amber-600' },
    { label: 'Cerrados',     value: LEADS.filter(l => l.status === 'cerrado').length,     color: 'text-emerald-600' },
];

export default function CRMPage() {
    const [search,        setSearch]        = useState('');
    const [filterStatus,  setFilterStatus]  = useState<string>('all');
    const [expandedId,    setExpandedId]    = useState<number | null>(null);

    const filtered = LEADS.filter(l => {
        const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                            l.property.toLowerCase().includes(search.toLowerCase()) ||
                            l.zone.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || l.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A961] mb-1">Administración</p>
                    <h1 className="text-2xl font-bold text-[#10221a] flex items-center gap-2">
                        <HiOutlineUsers className="text-[#2C5F4F]" /> CRM — Leads de Propietarios
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">Gestiona y da seguimiento a cada prospecto desde un solo lugar</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-[#2C5F4F] hover:bg-[#1e4538] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-md self-start sm:self-auto">
                    <HiOutlinePlusSm className="text-base" /> Nuevo Lead
                </button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {SUMMARY.map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                        <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wide">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, propiedad o zona..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none bg-gray-50"
                    />
                </div>
                <div className="relative">
                    <HiOutlineFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none bg-gray-50 appearance-none cursor-pointer"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="negociacion">Negociación</option>
                        <option value="cerrado">Cerrado</option>
                        <option value="perdido">Perdido</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-400">
                                <th className="px-6 py-3 text-left">Lead</th>
                                <th className="px-6 py-3 text-left hidden md:table-cell">Propiedad / Zona</th>
                                <th className="px-6 py-3 text-left hidden lg:table-cell">Fuente</th>
                                <th className="px-6 py-3 text-left">Estado</th>
                                <th className="px-6 py-3 text-left hidden lg:table-cell">Potencial</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(lead => {
                                const st = STATUS_CONFIG[lead.status];
                                const isExpanded = expandedId === lead.id;
                                return (
                                    <>
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : lead.id)}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#2C5F4F]/10 text-[#2C5F4F] flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                        {lead.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#10221a]">{lead.name}</p>
                                                        <p className="text-xs text-gray-400">{lead.date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <p className="font-medium text-gray-700 text-xs">{lead.property}</p>
                                                <p className="text-xs text-gray-400">{lead.zone}</p>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">{lead.source}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${st.color}`}>
                                                    <span className="text-base">{st.icon}</span>{st.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell font-bold text-emerald-600 text-xs">{lead.estimated}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a
                                                        href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(lead.name)}%2C%20soy%20de%20Villeta%20Conserje.`}
                                                        target="_blank"
                                                        onClick={e => e.stopPropagation()}
                                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                                                        title="WhatsApp"
                                                    >
                                                        <FaWhatsapp size={14} />
                                                    </a>
                                                    <a
                                                        href={`mailto:${lead.email}`}
                                                        onClick={e => e.stopPropagation()}
                                                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                                        title="Email"
                                                    >
                                                        <HiOutlineMail size={14} />
                                                    </a>
                                                    <button
                                                        onClick={e => { e.stopPropagation(); setExpandedId(isExpanded ? null : lead.id); }}
                                                        className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
                                                    >
                                                        <HiOutlineChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr key={`expanded-${lead.id}`} className="bg-gray-50">
                                                <td colSpan={6} className="px-6 py-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                                        <div>
                                                            <p className="font-bold text-gray-400 uppercase tracking-wide mb-1">Contacto</p>
                                                            <p className="text-gray-700 flex items-center gap-1"><HiOutlinePhone /> {lead.phone}</p>
                                                            <p className="text-gray-700 flex items-center gap-1 mt-0.5"><HiOutlineMail /> {lead.email}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-400 uppercase tracking-wide mb-1">Propiedad</p>
                                                            <p className="text-gray-700">{lead.property}</p>
                                                            <p className="text-gray-500">{lead.zone} · {lead.estimated}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-400 uppercase tracking-wide mb-1">Notas</p>
                                                            <p className="text-gray-700 italic">"{lead.notes}"</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <HiOutlineUsers className="text-4xl mx-auto mb-2" />
                            <p className="font-medium">No hay leads que coincidan con la búsqueda</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
