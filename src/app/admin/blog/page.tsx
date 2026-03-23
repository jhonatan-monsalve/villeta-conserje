'use client';

import {
    HiOutlinePencilAlt, HiOutlineEye, HiOutlinePlusSm,
    HiOutlineCalendar, HiOutlineTag, HiOutlineTrendingUp,
} from 'react-icons/hi';
import Link from 'next/link';

const POSTS = [
    { slug: 'semana-santa-villeta-2026-finca',         title: 'Semana Santa en Villeta 2026',            category: 'Temporada Alta',  date: '22 Mar 2026', status: 'published', views: 342 },
    { slug: 'agroturismo-villeta-experiencias-finca',  title: '7 Experiencias de Agroturismo en Villeta', category: 'Agroturismo',     date: '22 Mar 2026', status: 'published', views: 218 },
    { slug: 'duplicar-ingresos-finca-superhost',       title: 'Cómo Duplicar los Ingresos: Superhost',    category: 'Rentabilidad',    date: '20 Ene 2026', status: 'published', views: 189 },
    { slug: 'nuevo-estandar-airbnb-villeta',           title: 'El Nuevo Estándar de Airbnb en Villeta',   category: 'Gestión',         date: '25 Ene 2026', status: 'published', views: 156 },
];

const STATUS_CONF: Record<string, { label: string; color: string }> = {
    published: { label: 'Publicado', color: 'bg-emerald-100 text-emerald-700' },
    draft:     { label: 'Borrador',  color: 'bg-gray-100 text-gray-500' },
};

export default function AdminBlogPage() {
    const totalViews = POSTS.reduce((a, b) => a + b.views, 0);

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A961] mb-1">Administración</p>
                    <h1 className="text-2xl font-bold text-[#10221a] flex items-center gap-2">
                        <HiOutlinePencilAlt className="text-[#2C5F4F]" /> Gestión del Blog
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">Publica y gestiona el contenido editorial del sitio</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-[#2C5F4F] hover:bg-[#1e4538] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all shadow-md self-start sm:self-auto">
                    <HiOutlinePlusSm className="text-base" /> Nueva Entrada
                </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Artículos publicados', value: POSTS.length, icon: <HiOutlinePencilAlt />, color: 'text-[#2C5F4F]' },
                    { label: 'Vistas totales',        value: totalViews,  icon: <HiOutlineTrendingUp />, color: 'text-blue-600' },
                    { label: 'Categorías',            value: new Set(POSTS.map(p => p.category)).size, icon: <HiOutlineTag />, color: 'text-violet-600' },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                        <div className={`text-lg mx-auto mb-1 flex justify-center ${s.color}`}>{s.icon}</div>
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Posts table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-400">
                                <th className="px-6 py-3 text-left">Artículo</th>
                                <th className="px-6 py-3 text-left hidden md:table-cell">Categoría</th>
                                <th className="px-6 py-3 text-left hidden lg:table-cell">Fecha</th>
                                <th className="px-6 py-3 text-left">Estado</th>
                                <th className="px-6 py-3 text-right hidden sm:table-cell">Vistas</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {POSTS.map(post => {
                                const st = STATUS_CONF[post.status];
                                return (
                                    <tr key={post.slug} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-[#10221a] text-sm leading-tight">{post.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 font-mono">/blog/{post.slug}</p>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-xs bg-[#2C5F4F]/10 text-[#2C5F4F] px-2 py-1 rounded-full font-medium flex items-center gap-1 w-fit">
                                                <HiOutlineTag size={10} /> {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <HiOutlineCalendar size={12} /> {post.date}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${st.color}`}>
                                                {st.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right hidden sm:table-cell">
                                            <span className="text-xs font-bold text-gray-600 flex items-center justify-end gap-1">
                                                <HiOutlineTrendingUp className="text-emerald-500" /> {post.views}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                                    title="Ver publicación"
                                                >
                                                    <HiOutlineEye size={14} />
                                                </Link>
                                                <button
                                                    className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                                                    title="Editar"
                                                >
                                                    <HiOutlinePencilAlt size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
