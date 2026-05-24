'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaShieldAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

import { supabase } from '@/lib/supabaseClient';
import { SITE_CONFIG } from '@/lib/config/siteConfig';
import type { UserProfile, UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Rol mínimo requerido para acceder a la vista. Si no se especifica, basta con estar activo. */
  requiredRole?: UserRole;
}

/**
 * Componente guardián de rutas.
 * Verifica sesión activa y estado del perfil del usuario.
 * - Sin sesión → redirige a /login.
 * - Status 'pendiente' → pantalla premium de espera de aprobación.
 * - Status 'suspendido' → pantalla de cuenta suspendida.
 * - Rol insuficiente → acceso denegado.
 * - Todo OK → renderiza los hijos.
 */
export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Verificar si hay sesión activa
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.replace('/login');
        return;
      }

      // 2. Obtener el perfil del usuario desde la tabla profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || !data) {
        router.replace('/login');
        return;
      }

      setProfile(data as UserProfile);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // ── Estado de carga ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1B4D3E] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // ── Cuenta pendiente de aprobación ──────────────────────────────────────
  if (profile?.status === 'pendiente') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C9A961] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#1B4D3E] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
          {/* Barra superior decorativa */}
          <div className="h-1.5 bg-gradient-to-r from-[#1B4D3E] via-[#C9A961] to-[#1B4D3E]" />

          <div className="p-8 text-center">
            {/* Icono animado */}
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-100 flex items-center justify-center">
              <FaClock className="text-[#C9A961] text-3xl animate-pulse" />
            </div>

            {/* Badge de estado */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C9A961] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Cuenta en revisión
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Tu cuenta está en espera de aprobación
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              La administración de <strong className="text-gray-700">Villeta Conserje</strong> revisará
              tu solicitud y asignará tu rol de acceso.
              <br /><br />
              Recibirás acceso completo una vez que tu cuenta sea activada.
              Si necesitas asistencia, contáctanos directamente.
            </p>

            {/* Botón de contacto WhatsApp */}
            <a
              href={SITE_CONFIG.contact.support.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-100 transition-all transform hover:-translate-y-0.5 mb-4"
            >
              <FaWhatsapp className="text-2xl" />
              Contactar Soporte
            </a>

            {/* Cerrar sesión */}
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace('/login');
              }}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Cuenta suspendida ──────────────────────────────────────────────────
  if (profile?.status === 'suspendido') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
          <div className="p-8 text-center">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center">
              <FaShieldAlt className="text-red-400 text-3xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Cuenta Suspendida</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Tu acceso ha sido deshabilitado por la administración.
              Contacta al soporte para más información.
            </p>
            <a
              href={SITE_CONFIG.contact.support.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-6 rounded-xl transition-all mb-4"
            >
              <FaWhatsapp className="text-xl" />
              Contactar Soporte
            </a>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace('/login');
              }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Verificación de rol ────────────────────────────────────────────────
  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#1B4D3E] via-[#C9A961] to-[#1B4D3E]" />
          <div className="p-8 text-center">
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
              <FaShieldAlt className="text-gray-400 text-3xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Acceso Restringido</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              No tienes los permisos necesarios para acceder a esta sección.
            </p>
            <button
              onClick={() => router.back()}
              className="w-full bg-[#1B4D3E] hover:bg-[#143d30] text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Acceso concedido ───────────────────────────────────────────────────
  return <>{children}</>;
}
