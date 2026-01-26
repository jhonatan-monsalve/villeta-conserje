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
                alt="Villeta Conserje Logo"
                className="w-full h-auto"
                style={{ maxHeight: '100%' }}
            />
        </div>
    );
}
