import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
    title: 'Acceso Propietarios | Villeta Conserje',
    description: 'Portal de acceso exclusivo para propietarios de Villeta Conserje.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#C9A961] opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#1B4D3E] opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-full relative z-10">
                <LoginForm />
            </div>
        </main>
    );
}
