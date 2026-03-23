'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowRight, FaSpinner, FaWhatsapp, FaShieldAlt } from 'react-icons/fa';

import { SITE_CONFIG } from '@/lib/config/siteConfig';

// Usa el enlace centralizado de soporte (mismo que el resto de la web)
const WHATSAPP_URL = SITE_CONFIG.contact.support.whatsappLink;


export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [mode, setMode] = useState<'login' | 'forgot' | 'blocked'>('login');

    // Al intentar iniciar sesión → siempre muestra pantalla bloqueada
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setMode('blocked');
        }, 1200);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setResetSent(true);
        }, 1500);
    };

    // ── PANTALLA: Acceso Bloqueado ────────────────────────────────────────────
    if (mode === 'blocked') {
        return (
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent" />

                <div className="text-center">
                    {/* Icono escudo */}
                    <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center">
                        <FaShieldAlt className="text-red-400 text-3xl" />
                    </div>

                    {/* Badge de estado */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 mb-5">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                            Acceso no disponible
                        </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        Portal Temporalmente Cerrado
                    </h2>

                    <p className="text-sm text-gray-500 leading-relaxed mb-8">
                        El acceso al portal de propietarios está{' '}
                        <strong className="text-gray-700">temporalmente restringido</strong>{' '}
                        mientras realizamos mejoras de seguridad.
                        <br /><br />
                        Si necesitas acceder a tu cuenta o tienes una urgencia,
                        contáctanos directamente y te atenderemos de inmediato.
                    </p>

                    {/* Botón WhatsApp */}
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-100 transition-all transform hover:-translate-y-0.5 mb-4"
                    >
                        <FaWhatsapp className="text-2xl" />
                        Contactar por WhatsApp
                    </a>

                    {/* Volver al formulario */}
                    <button
                        onClick={() => { setMode('login'); setEmail(''); setPassword(''); }}
                        className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
                    >
                        ← Volver al formulario
                    </button>
                </div>
            </div>
        );
    }

    // ── PANTALLA: Recuperar Contraseña ────────────────────────────────────────
    if (mode === 'forgot') {
        return (
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-primary text-gray-800 mb-2">Recuperar Contraseña</h2>
                    <p className="text-sm text-gray-500">Ingresa tu correo y te enviaremos las instrucciones.</p>
                </div>

                {resetSent ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                            ✓
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">¡Correo Enviado!</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Revisa tu bandeja de entrada para restablecer tu acceso.
                        </p>
                        <button
                            onClick={() => { setMode('login'); setResetSent(false); }}
                            className="text-[#C9A961] font-semibold hover:underline text-sm"
                        >
                            Volver al inicio de sesión
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Email Corporativo
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-secondary text-gray-700 outline-none"
                                    placeholder="nombre@ejemplo.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#C9A961] hover:bg-[#b09355] text-white font-bold py-3 rounded-lg shadow-lg shadow-yellow-100 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <FaSpinner className="animate-spin" /> : 'Enviar Instrucciones'}
                        </button>

                        <div className="text-center border-t border-gray-100 pt-6">
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider transition-colors"
                            >
                                Cancelar y volver
                            </button>
                        </div>
                    </form>
                )}
            </div>
        );
    }

    // ── PANTALLA: Login (visible pero siempre bloqueado al enviar) ────────────
    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-primary text-gray-800 mb-2">Acceso Propietarios</h2>
                <p className="text-sm text-gray-500">Gestiona tu propiedad con Villeta Conserje.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Usuario
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-secondary text-gray-700 outline-none"
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Contraseña
                        </label>
                        <button
                            type="button"
                            onClick={() => setMode('forgot')}
                            className="text-xs text-[#C9A961] hover:text-[#b09355] font-semibold transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-secondary text-gray-700 outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1B4D3E] hover:bg-[#143d30] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                    {isLoading
                        ? <FaSpinner className="animate-spin" />
                        : <><span>Ingresar</span><FaArrowRight size={12} /></>
                    }
                </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-gray-50">
                <p className="text-xs text-gray-400">
                    ¿Aún no eres cliente?{' '}
                    <Link href="/#contacto" className="text-[#C9A961] font-bold hover:underline ml-1">
                        Contáctanos para gestionar tu finca
                    </Link>
                </p>
                <div className="mt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
