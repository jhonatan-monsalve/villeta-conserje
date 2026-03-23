'use client';

import React from 'react';
import { FaChartLine, FaCalendarAlt, FaStar, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/lib/config/siteConfig';

// Mock Stats for Owner
const OWNER_STATS = {
    occupancy: '85%',
    revenue: '$4,250.000 COP',
    nextBooking: '15 de Junio, 2024',
    rating: 4.9
};

export default function OwnerDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 font-secondary">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 py-6 px-8">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-primary text-[#1B4D3E]">Panel de Propietario</h1>
                        <p className="text-sm text-gray-500">Bienvenido, Juan Pérez | Finca "El Paraíso"</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-xs uppercase tracking-widest text-[#C9A961] font-bold">Estado de Cuenta</p>
                        <p className="text-green-600 font-bold">Al día</p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-blue-50 p-3 rounded-full text-blue-600 mb-3">
                            <FaChartLine size={24} />
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Ocupación Mes</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{OWNER_STATS.occupancy}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-green-50 p-3 rounded-full text-green-600 mb-3">
                            <span className="text-xl font-bold">$</span>
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Ingresos Estimados</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{OWNER_STATS.revenue}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-purple-50 p-3 rounded-full text-purple-600 mb-3">
                            <FaCalendarAlt size={24} />
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Próxima Reserva</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">{OWNER_STATS.nextBooking}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="bg-yellow-50 p-3 rounded-full text-yellow-600 mb-3">
                            <FaStar size={24} />
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Valoración Promedio</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{OWNER_STATS.rating}/5.0</p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Contact Info */}
                    <div className="bg-[#1B4D3E] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A961] opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                        <h3 className="text-xl font-primary mb-4">¿Necesitas ayuda urgente?</h3>
                        <p className="text-sm opacity-90 mb-6 leading-relaxed">
                            Estamos disponibles para resolver cualquier duda sobre tu propiedad o gestionar mantenimientos.
                        </p>

                        <div className="space-y-4">
                            <a href={SITE_CONFIG.contact.manager.whatsappLink} target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors cursor-pointer group">
                                <FaWhatsapp className="text-[#C9A961] text-xl group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide font-bold opacity-75">WhatsApp Directo</p>
                                    <p className="font-semibold">{SITE_CONFIG.contact.manager.phone}</p>
                                </div>
                            </a>

                            <a href={SITE_CONFIG.contact.support.emailLink} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors cursor-pointer group">
                                <FaEnvelope className="text-[#C9A961] text-xl group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="text-xs uppercase tracking-wide font-bold opacity-75">Correo Soporte</p>
                                    <p className="font-semibold">{SITE_CONFIG.contact.support.email}</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Direct Message Form */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-xl font-primary text-gray-800 mb-4">Enviar Mensaje al Administrador</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Asunto</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none">
                                        <option>Mantenimiento</option>
                                        <option>Dudas sobre Pagos</option>
                                        <option>Bloquear Fechas (Uso Propio)</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Prioridad</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none">
                                        <option>Normal</option>
                                        <option>Alta</option>
                                        <option>Urgente</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Mensaje</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe tu solicitud..."
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-[#C9A961] focus:border-[#C9A961] outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" className="bg-[#1B4D3E] hover:bg-[#153a2f] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all">
                                    Enviar Solicitud
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
