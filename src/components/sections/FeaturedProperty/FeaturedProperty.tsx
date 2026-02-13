"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { Button } from "@/components/ui/buttons/Button";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { HiStar, HiArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { MdVerified } from "react-icons/md";

// Real images extracted from the Airbnb listing for Casa Bambú
// Colección de imágenes locales para garantizar carga rápida y conversión a WebP mediante next-image-export-optimizer.
const PROPERTY_IMAGES = [
    "images/casa-bambu/bambu-1.jpg",
    "images/casa-bambu/bambu-2.jpg",
    "images/casa-bambu/bambu-3.jpg",
    "images/casa-bambu/bambu-4.jpg",
];

export function FeaturedProperty() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Temporizador para el cambio automático de imágenes cada 2 segundos.
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % PROPERTY_IMAGES.length);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950" id="featured-property">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-4">
                        Resultados Reales en Airbnb
                    </h2>
                    <p className="text-text-sub dark:text-gray-400 text-lg">
                        Nuestra tasa de éxito no es una promesa, es un historial comprobado en Villeta.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                    {/* Card 1: The real property with Carousel */}
                    <Card className="relative overflow-hidden group border-primary/20 bg-primary/[0.02] flex flex-col shadow-xl">
                        <div className="absolute top-4 right-4 z-20">
                            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-primary text-xs font-black border border-primary/20">
                                <MdVerified className="text-sm" /> SUPERANFITRIÓN
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div className="aspect-video w-full overflow-hidden mb-6 rounded-lg relative bg-zinc-100 dark:bg-zinc-900 shadow-inner">
                            {PROPERTY_IMAGES.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${idx === currentImageIndex ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    {/* Componente optimizado que sirve imágenes en formato moderno y tamaño adaptable */}
                                    <ExportedImage
                                        src={img}
                                        alt={`Casa Bambú Villeta Foto ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={idx === 0} // Precarga la primera imagen del carrusel
                                        loading={idx === 0 ? undefined : "lazy"}
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            ))}

                            {/* Pagination Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {PROPERTY_IMAGES.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        aria-label={`Ver foto ${idx + 1} de la propiedad`}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex
                                            ? "w-6 bg-white shadow-md"
                                            : "w-1.5 bg-white/40 hover:bg-white/60"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Dynamic Property Name Overlay */}
                            <div className="absolute bottom-4 left-4 z-20 text-white drop-shadow-md">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Propiedad Insignia</p>
                                <p className="text-sm font-display font-medium">Casa Bambú, Villeta</p>
                            </div>
                        </div>

                        <div className="space-y-4 px-2 pb-2 flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">
                                        Casa Bambú: Refugio en el Bosque
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-xs text-text-sub font-semibold tracking-wide uppercase">Villeta, Cundinamarca</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-0.5 text-[#C9A961] mb-1">
                                        {[...Array(5)].map((_, i) => <HiStar key={i} size={16} className="fill-current" />)}
                                    </div>
                                    <p className="text-[11px] font-black tracking-tighter text-text-main dark:text-gray-300">15/15 RESEÑAS 5★</p>
                                </div>
                            </div>

                            <p className="text-sm text-text-sub dark:text-gray-400 leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                                "Nuestra propiedad demuestra que con la gestión profesional de Yenifer, cada huésped vive una experiencia perfecta que garantiza las 5 estrellas."
                            </p>

                            <div className="pt-4">
                                <a
                                    href={SITE_CONFIG.links.airbnb_listing}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="outline" fullWidth className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-white shadow-sm transition-all font-bold">
                                        Ver Ficha Real en Airbnb <HiArrowRight className="text-lg" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </Card>

                    {/* Card 2: The invitation */}
                    <Card className="flex flex-col justify-center items-center text-center p-8 sm:p-12 border-dashed border-primary/40 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden shadow-sm">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 shadow-inner">
                            <HiOutlineSparkles size={40} className="animate-pulse" />
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-main dark:text-white mb-4">
                            ¿Tu Propiedad es la Próxima?
                        </h3>

                        <p className="text-text-sub dark:text-gray-400 mb-8 max-w-xs leading-relaxed">
                            Buscamos una nueva finca exclusiva en Villeta para llevarla al estándar de <span className="text-primary font-bold">Superanfitriona</span>.
                        </p>

                        <div className="w-full space-y-3 mb-12">
                            {[
                                "Optimización total del perfil",
                                "Gestión de hospitalidad premium",
                                "Monitoreo continuo de 5 estrellas"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-3 rounded-lg border border-primary/5 shadow-sm text-left">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                                        <MdVerified className="text-xs" />
                                    </div>
                                    <span className="text-sm font-medium text-text-main dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <a href="#audit" className="w-full mt-auto">
                            <Button variant="secondary" fullWidth className="bg-primary hover:bg-primary-dark shadow-xl hover:shadow-primary/20 text-white border-none py-4 text-lg font-black uppercase tracking-widest">
                                Postular Mi Propiedad
                            </Button>
                        </a>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
