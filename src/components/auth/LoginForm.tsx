'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowRight, FaSpinner, FaUser } from 'react-icons/fa';

import { supabase } from '@/lib/supabaseClient';

export function LoginForm() {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const clearMessages = () => {
        setErrorMsg('');
        setSuccessMsg('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        clearMessages();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setIsLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            // Check status via ProtectedRoute redirect, or just redirect to dashboard
            router.push('/dashboard'); // Change to whatever the admin dashboard route is
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        clearMessages();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        });

        setIsLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Registro exitoso. Tu cuenta está en revisión.');
            setMode('login');
            setEmail('');
            setPassword('');
        }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        clearMessages();

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        setIsLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Revisa tu correo para restablecer tu contraseña.');
            setMode('login');
            setEmail('');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-primary text-gray-800 mb-2">
                    {mode === 'login' ? 'Acceso Propietarios' : mode === 'register' ? 'Crear Cuenta' : 'Recuperar Contraseña'}
                </h2>
                <p className="text-sm text-gray-500">
                    {mode === 'login' ? 'Gestiona tu propiedad con Villeta Conserje.' : mode === 'register' ? 'Únete a Villeta Conserje.' : 'Ingresa tu correo para recibir instrucciones.'}
                </p>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                    {errorMsg}
                </div>
            )}

            {successMsg && (
                <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm text-center">
                    {successMsg}
                </div>
            )}

            <form onSubmit={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleForgot} className="space-y-6">
                
                {mode === 'register' && (
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            Nombre Completo
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all font-secondary text-gray-700 outline-none"
                                placeholder="Tu Nombre"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Correo Electrónico
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

                {mode !== 'forgot' && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Contraseña
                            </label>
                            {mode === 'login' && (
                                <button
                                    type="button"
                                    onClick={() => { setMode('forgot'); clearMessages(); }}
                                    className="text-xs text-[#C9A961] hover:text-[#b09355] font-semibold transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            )}
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
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1B4D3E] hover:bg-[#143d30] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                    {isLoading
                        ? <FaSpinner className="animate-spin" />
                        : <><span>{mode === 'login' ? 'Ingresar' : mode === 'register' ? 'Registrarse' : 'Enviar Instrucciones'}</span><FaArrowRight size={12} /></>
                    }
                </button>
            </form>

            <div className="mt-6 text-center pt-6 border-t border-gray-50">
                {mode === 'login' ? (
                    <p className="text-xs text-gray-400">
                        ¿No tienes cuenta?{' '}
                        <button onClick={() => { setMode('register'); clearMessages(); }} className="text-[#C9A961] font-bold hover:underline ml-1">
                            Regístrate
                        </button>
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={() => { setMode('login'); clearMessages(); }}
                        className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider transition-colors"
                    >
                        ← Volver al inicio de sesión
                    </button>
                )}
            </div>
            
            {mode === 'login' && (
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                        ¿Aún no eres cliente?{' '}
                        <Link href="/#contacto" className="text-[#C9A961] font-bold hover:underline ml-1">
                            Contáctanos para gestionar tu finca
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
