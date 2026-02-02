import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'light' | 'dark' | 'color';
}

/**
 * Componente de Logo que utiliza el archivo SVG estático directamente.
 */
export function Logo({ className = "" }: LogoProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/logotipo_villeta_conserje.svg"
                alt="Villeta Conserje - Gestión Premium de Fincas en Airbnb"
                className="w-full h-auto"
                width={180}
                height={60}
                style={{ maxHeight: '100%' }}
            />
        </div>
    );
}
