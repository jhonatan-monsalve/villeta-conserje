"use client";

import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
    return (
        <>
            <a
                href={SITE_CONFIG.links.whatsapp_general}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-[60] flex items-center group"
                aria-label="Contactar por WhatsApp"
            >
                {/* Desktop/Tablet: Button with text */}
                <div className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group">
                    <FaWhatsapp className="text-2xl animate-heartbeat" />
                    <span className="font-bold text-sm tracking-wide">WhatsApp</span>
                </div>

                {/* Mobile: Just the icon */}
                <div className="sm:hidden flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl active:scale-90 transition-transform">
                    <FaWhatsapp className="text-3xl animate-heartbeat" />
                </div>
            </a>

            <style jsx global>{`
                @keyframes heartbeat {
                    0% { transform: scale(1); }
                    15% { transform: scale(1.15); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                .animate-heartbeat {
                    animation: heartbeat 2s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
