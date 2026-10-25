"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { Button } from "@/components/ui/buttons/Button";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { HiStar, HiArrowRight, HiOutlineSparkles, HiChevronLeft, HiChevronRight, HiX, HiArrowsExpand } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { DynamicReviewCount, DynamicRating } from "@/components/ui/DynamicStats";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface LightboxModalProps {
    images: string[];
    propertyName: string;
    propertySlug: string;
    initialIndex: number;
    onClose: () => void;
}

function LightboxModal({ images, propertyName, propertySlug, initialIndex, onClose }: LightboxModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white"
            >
                {/* Header */}
                <div className="flex justify-between items-center z-50">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Galería de Fotos Reales</span>
                        <h3 className="text-lg sm:text-2xl font-display font-bold">{propertyName}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                        aria-label="Cerrar galería"
                    >
                        <HiX className="text-2xl" />
                    </button>
                </div>

                {/* Main Large Image Container */}
                <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full max-w-5xl max-h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-zinc-950">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                    idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                }`}
                            >
                                <ExportedImage
                                    src={img}
                                    alt={`${propertyName} Foto Grande ${idx + 1}`}
                                    fill
                                    className="object-contain"
                                    priority={Math.abs(idx - currentIndex) <= 1}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110"
                        aria-label="Foto anterior"
                    >
                        <HiChevronLeft className="text-3xl" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110"
                        aria-label="Foto siguiente"
                    >
                        <HiChevronRight className="text-3xl" />
                    </button>

                    {/* Counter Badge */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border border-white/10">
                        Foto {currentIndex + 1} de {images.length}
                    </div>
                </div>

                {/* Thumbnail Navigation Strip & Actions */}
                <div className="space-y-4 max-w-5xl mx-auto w-full">
                    <div className="flex gap-2 overflow-x-auto justify-center py-2 px-1 scrollbar-none">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`relative w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${
                                    idx === currentIndex ? "border-primary scale-105 shadow-lg opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                                }`}
                            >
                                <ExportedImage
                                    src={img}
                                    alt={`Miniatura ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4">
                        <Link href={`/propiedades/${propertySlug}`} onClick={onClose}>
                            <Button variant="secondary" className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 text-sm gap-2">
                                Ver Ficha Completa de la Finca <HiArrowRight />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

interface PropertyCardCarouselProps {
    images: string[];
    propertyName: string;
    propertySlug: string;
    onOpenLightbox: (index: number) => void;
}

function PropertyCardCarousel({ images, propertyName, onOpenLightbox }: PropertyCardCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Solo se reproduce cuando la tarjeta está en pantalla: así no descarga fotos mientras carga la página
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "200px" });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Solo se montan la foto actual y sus vecinas (para el crossfade); el resto se descarga cuando toca
    const isNear = (idx: number) => {
        const d = Math.abs(idx - currentIndex);
        return Math.min(d, images.length - d) <= 1;
    };

    useEffect(() => {
        if (!isVisible || isHovered || images.length <= 1) return;
        // Transición automática suave cada 2.5 segundos para dar tiempo a apreciar cada fotografía
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 2500);
        return () => clearInterval(timer);
    }, [isVisible, isHovered, images.length]);

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div
            ref={containerRef}
            className="aspect-video w-full overflow-hidden mb-6 rounded-lg relative bg-zinc-900 shadow-inner group/carousel select-none cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onOpenLightbox(currentIndex)}
        >
            {/* Crossfade de imágenes superpuestas sin pantalla negra */}
            <div className="absolute inset-0">
                {images.map((img, idx) => isNear(idx) && (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                    >
                        <ExportedImage
                            src={img}
                            alt={`${propertyName} Foto ${idx + 1}`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 80vw"
                            className="object-cover group-hover/carousel:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />


            {/* Counter & Expand Hint */}
            <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow border border-white/10 flex items-center gap-1.5">
                <span>{currentIndex + 1} / {images.length}</span>
                <span className="text-white/60">·</span>
                <span className="flex items-center gap-1 text-[10px] text-primary"><HiArrowsExpand /> Ampliar</span>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        aria-label="Foto anterior"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 shadow-md hover:scale-110 active:scale-95"
                    >
                        <HiChevronLeft className="text-xl" />
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Foto siguiente"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/carousel:opacity-100 shadow-md hover:scale-110 active:scale-95"
                    >
                        <HiChevronRight className="text-xl" />
                    </button>
                </>
            )}

            {/* Pagination Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 max-w-[80%] overflow-x-auto py-1 px-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                            aria-label={`Ver foto ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex
                                    ? "w-5 bg-white shadow-md"
                                    : "w-1.5 bg-white/40 hover:bg-white/70"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function FeaturedProperty() {
    const properties = SITE_CONFIG.properties || [];

    const [activeLightbox, setActiveLightbox] = useState<{
        propIdx: number;
        imageIdx: number;
    } | null>(null);

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

                            {/* Image Carousel Component */}
                            <PropertyCardCarousel
                                images={prop.images}
                                propertyName={prop.name}
                                propertySlug={prop.slug}
                                onOpenLightbox={(imgIdx) => setActiveLightbox({ propIdx: idx, imageIdx: imgIdx })}
                            />

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

                        <a href="#valoracion" className="w-full mt-auto">
                            <Button variant="secondary" fullWidth className="bg-primary hover:bg-primary-dark shadow-xl text-white border-none py-3.5 text-sm font-black uppercase tracking-wider">
                                Postular Mi Finca
                            </Button>
                        </a>
                    </Card>
                </div>
            </Container>

            {/* Lightbox Modal Component */}
            {activeLightbox !== null && (
                <LightboxModal
                    images={properties[activeLightbox.propIdx].images}
                    propertyName={properties[activeLightbox.propIdx].name}
                    propertySlug={properties[activeLightbox.propIdx].slug}
                    initialIndex={activeLightbox.imageIdx}
                    onClose={() => setActiveLightbox(null)}
                />
            )}
        </section>
    );
}
