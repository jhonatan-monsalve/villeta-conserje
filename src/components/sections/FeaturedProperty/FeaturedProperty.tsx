"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { Button } from "@/components/ui/buttons/Button";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { HiStar, HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { DynamicReviewCount, DynamicRating } from "@/components/ui/DynamicStats";
import Link from "next/link";

export function FeaturedProperty() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const properties = SITE_CONFIG.properties || [];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % 4);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950" id="featured-property">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <div className="inline-flex items-center gap-2 px-3 me-2 py-1 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-wider mb-4">
                        <MdVerified /> Portafolio de Lujo
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-4">
                        Propiedades Administradas en Villeta
                    </h2>
                    <p className="text-text-sub dark:text-gray-400 text-lg">
                        Casas vacacionales gestionadas con estándares de hospitalidad 5 estrellas y Superanfitrión en Airbnb.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                    {/* Property Cards */}
                    {properties.map((prop, idx) => (
                        <Card key={prop.id || idx} className="relative overflow-hidden group border-primary/20 bg-primary/[0.02] flex flex-col shadow-xl">
                            <div className="absolute top-4 right-4 z-20">
                                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-primary text-xs font-black border border-primary/20">
                                    <MdVerified className="text-sm" /> SUPERANFITRIÓN
                                </div>
                            </div>

                            {/* Image Container */}
                            <div className="aspect-video w-full overflow-hidden mb-6 rounded-lg relative bg-zinc-100 dark:bg-zinc-900 shadow-inner">
                                <ExportedImage
                                    src={prop.images[0]}
                                    alt={`${prop.name} Villeta`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    priority={idx === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                                <div className="absolute bottom-4 left-4 z-20 text-white drop-shadow-md">
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">Propiedad Administrada</p>
                                    <p className="text-sm font-display font-bold">{prop.name}, Villeta</p>
                                </div>
                            </div>

                            <div className="space-y-4 px-2 pb-2 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">
                                                {prop.name}
                                            </h3>
                                            <p className="text-xs text-text-sub font-semibold tracking-wide uppercase mt-0.5">{prop.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-0.5 text-[#C9A961] mb-0.5">
                                                {[...Array(5)].map((_, i) => <HiStar key={i} size={14} className="fill-current" />)}
                                            </div>
                                            <p className="text-[10px] font-black text-text-main dark:text-gray-300">
                                                {idx === 0 ? <><DynamicReviewCount /> RESEÑAS <DynamicRating />★</> : '5.0★ (Superhost)'}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-text-sub dark:text-gray-400 leading-relaxed line-clamp-2 border-l-2 border-primary/20 pl-3 py-0.5 mb-4">
                                        "{prop.tagline}"
                                    </p>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <Link href={`/propiedades/${prop.slug}`} className="block">
                                        <Button variant="secondary" fullWidth className="bg-primary hover:bg-primary-dark text-white font-bold gap-2 text-xs py-3">
                                            Ver Ficha Completa <HiArrowRight className="text-sm" />
                                        </Button>
                                    </Link>
                                    <a
                                        href={prop.airbnbUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <Button variant="outline" fullWidth className="border-zinc-300 dark:border-zinc-700 text-text-main dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold text-xs py-2.5">
                                            Ver en Airbnb ↗
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* Invitation Card */}
                    <Card className="flex flex-col justify-center items-center text-center p-8 border-dashed border-primary/40 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden shadow-sm">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <HiOutlineSparkles size={32} className="animate-pulse" />
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-main dark:text-white mb-3">
                            ¿Tu Finca en Villeta es la Próxima?
                        </h3>

                        <p className="text-text-sub dark:text-gray-400 mb-6 text-sm leading-relaxed max-w-xs">
                            Buscamos una nueva propiedad exclusiva en Villeta para posicionarla en Airbnb y multiplicar sus ingresos.
                        </p>

                        <div className="w-full space-y-2.5 mb-8">
                            {[
                                "Optimización total del perfil",
                                "Gestión de hospitalidad VIP",
                                "Sincronización automática de reseñas"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5 bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-primary/5 shadow-sm text-left">
                                    <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                                        <MdVerified className="text-[10px]" />
                                    </div>
                                    <span className="text-xs font-medium text-text-main dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#audit" className="w-full mt-auto">
                            <Button variant="secondary" fullWidth className="bg-primary hover:bg-primary-dark shadow-xl text-white border-none py-3.5 text-sm font-black uppercase tracking-wider">
                                Postular Mi Finca
                            </Button>
                        </a>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
