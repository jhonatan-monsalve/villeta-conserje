"use client";

import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
    const { scrollY } = useScroll();

    // Transformaciones optimizadas por GPU sin causar re-renders de React
    const scale = useTransform(scrollY, [0, 1000], [1, 1.25]);
    const translateY = useTransform(scrollY, [0, 1000], [0, 400]);

    return (
        <section id="home" className="relative w-full min-h-[100dvh] pt-24 pb-16 sm:pt-36 sm:pb-24 flex items-center overflow-hidden bg-stone-900">
            {/* Background Image & Parallax con Framer Motion */}
            <motion.div 
                className="absolute inset-0 z-0 will-change-transform"
                style={{ 
                    y: translateY,
                    scale: scale,
                    transformOrigin: "center center"
                }}
            >
                <ExportedImage
                    src="images/hero-bg.jpg"
                    alt="Luxury villa with pool at sunset in Villeta"
                    fill
                    className="object-cover"
                    priority
                    fetchPriority="high"
                />
                {/* Overlays de gradiente para contraste legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
            </motion.div>

            <Container className="relative z-10 w-full">
                <div className="max-w-4xl pt-8 sm:pt-16 pb-8">
                    {/* Badge Glassmorphism pulido estilo Emil Kowalski */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 text-xs font-medium mb-8 tracking-widest uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                        </span>
                        Gestión Premium Airbnb
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F5F5F5] leading-[1.1] tracking-tight mb-8 drop-shadow-sm">
                        ¿Cuánto Dinero Está Perdiendo <br />
                        <span className="italic text-gold font-serif block mt-2">Tu Finca Cada Fin de Semana?</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed opacity-90">
                        Las fincas que gestionamos generan entre <strong className="text-white font-semibold">$8M y $15M al mes</strong>. Solicita tu valoración gratuita y descúbrelo en 24 horas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/#valoracion">
                            <Button className="w-full sm:w-auto font-sans font-semibold uppercase tracking-[0.15em] bg-[#10221a] text-white px-10 py-5 rounded-[6px] hover:bg-gold hover:text-white transition-all duration-300 shadow-xl border border-white/10 text-sm active:scale-95">
                                Solicitar Valoración
                            </Button>
                        </Link>
                        <a href="#servicios">
                            <Button variant="ghost" className="w-full sm:w-auto font-sans font-semibold uppercase tracking-[0.15em] text-white bg-transparent border border-white/30 px-10 py-5 rounded-[6px] hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm text-sm active:scale-95">
                                Ver Cómo Funciona
                            </Button>
                        </a>
                    </div>
                    <p className="text-[10px] text-white/70 mt-8 tracking-wide uppercase px-1">Diagnóstico de ingresos en 24 horas</p>
                </div>
            </Container>
        </section>
    );
}

