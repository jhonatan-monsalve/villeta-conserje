"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { HiStar, HiArrowRight, HiOutlineShieldCheck, HiOutlineLocationMarker, HiCheckCircle, HiChevronLeft, HiChevronRight, HiX, HiArrowsExpand } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Property {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    location: string;
    airbnbUrl: string;
    isSuperhost: boolean;
    defaultRating: number;
    defaultReviewsCount: number;
    features: string[];
    images: string[];
    capacity: {
        guests: number;
        bedrooms: number;
        beds: number;
        bathrooms: number;
    };
}

interface PropertyDetailClientProps {
    property: Property;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const whatsappBookingUrl = `https://wa.me/573204325845?text=Hola%20Yenifer%2C%20quisiera%20consultar%20disponibilidad%20y%20tarifas%20para%20alquilar%20${encodeURIComponent(property.name)}%20en%20Villeta.`;

    const handlePrev = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! - 1 + property.images.length) % property.images.length);
    };

    const handleNext = () => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! + 1) % property.images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === "Escape") setSelectedImageIndex(null);
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex, property.images.length]);

    return (
        <main className="min-h-screen bg-background py-16 sm:py-24">
            <Container>
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-text-sub dark:text-gray-400">
                    <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <span>/</span>
                    <span className="text-text-main dark:text-white font-semibold">{property.name}</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-wider mb-3">
                            <MdVerified /> Propiedad Exclusiva Administrada
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-text-main dark:text-white mb-2">
                            {property.name}
                        </h1>
                        <p className="text-lg text-text-sub dark:text-gray-300 flex items-center gap-2">
                            <HiOutlineLocationMarker className="text-primary text-xl shrink-0" />
                            {property.tagline}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-text-main dark:text-gray-200">
                            {property.capacity.guests} huéspedes · {property.capacity.bedrooms} habitaciones · {property.capacity.beds} camas · {String(property.capacity.bathrooms).replace(".", ",")} baños
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-primary/20 shadow-md">
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-[#C9A961]">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className="fill-current text-lg" />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-text-sub dark:text-gray-400 mt-1">Calificación 5.0 Estrellas</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200 dark:bg-zinc-800" />
                        <div className="text-left">
                            <p className="text-xl font-black text-primary">Superanfitrión</p>
                            <p className="text-xs text-text-sub dark:text-gray-400">Villeta Conserje</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left 2 Cols: Details & Features */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Real Airbnb Photo Gallery (10 Photos) */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-display font-bold text-text-main dark:text-white">
                                    Galería de Fotos Reales ({property.images.length} fotos)
                                </h3>
                                <span className="text-xs font-bold text-primary flex items-center gap-1">
                                    <HiArrowsExpand /> Haz clic en cualquier foto para ampliarla
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {property.images.map((imgUrl, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative w-full rounded-xl overflow-hidden shadow-md bg-zinc-900 cursor-pointer group ${
                                            idx === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                                        }`}
                                    >
                                        <ExportedImage
                                            src={imgUrl}
                                            alt={`${property.name} Foto ${idx + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            priority={idx === 0}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            <HiArrowsExpand /> Foto {idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
                            <h3 className="text-2xl font-display font-bold text-text-main dark:text-white">
                                Tu Experiencia de Descanso en {property.name}
                            </h3>
                            <div className="space-y-4 text-text-sub dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                                {property.description.split('\n\n').map((paragraph, pIdx) => {
                                    const isLast = pIdx === property.description.split('\n\n').length - 1;
                                    return (
                                        <p
                                            key={pIdx}
                                            className={
                                                isLast
                                                    ? "p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border-l-4 border-primary text-text-main dark:text-white font-medium italic text-base"
                                                    : ""
                                            }
                                        >
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                            <h3 className="text-2xl font-display font-bold text-text-main dark:text-white">
                                Amenidades y Características
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {property.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                        <HiCheckCircle className="text-primary text-2xl shrink-0" />
                                        <span className="font-semibold text-text-main dark:text-gray-200">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Booking Card */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-2 border-primary/30 shadow-xl sticky top-28 space-y-6">
                            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                                <span className="text-xs font-black uppercase text-primary tracking-wider">Reserva Directa o Airbnb</span>
                                <h3 className="text-2xl font-display font-bold text-text-main dark:text-white mt-1">
                                    ¿Te gustaría hospedarte aquí?
                                </h3>
                                <p className="text-sm text-text-sub dark:text-gray-400 mt-2">
                                    Consulta disponibilidad inmediata con nuestro equipo de conserjería o reserva seguro en Airbnb.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={whatsappBookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="secondary" fullWidth className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-base shadow-lg gap-2">
                                        Reservar por WhatsApp <HiArrowRight className="text-lg" />
                                    </Button>
                                </a>

                                <a
                                    href={property.airbnbUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="outline" fullWidth className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 text-base gap-2">
                                        Ver en Airbnb <HiArrowRight className="text-lg" />
                                    </Button>
                                </a>
                            </div>

                            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-xs text-text-sub dark:text-gray-400">
                                <HiOutlineShieldCheck className="text-primary text-xl shrink-0" />
                                <span>Garantía de calidad Villeta Conserje: verificación previa y soporte 24/7 durante tu estadía.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Lightbox Fullscreen Viewer */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center z-50">
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-primary">Fotografía {selectedImageIndex + 1} de {property.images.length}</span>
                                <h3 className="text-lg sm:text-2xl font-display font-bold">{property.name}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedImageIndex(null)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                                aria-label="Cerrar vista amplia"
                            >
                                <HiX className="text-2xl" />
                            </button>
                        </div>

                        {/* Large Image View con Crossfade sin fondo negro */}
                        <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
                            <div className="relative w-full h-full max-w-5xl max-h-[70vh] rounded-xl overflow-hidden shadow-2xl bg-zinc-950">
                                {property.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                            idx === selectedImageIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                        }`}
                                    >
                                        <ExportedImage
                                            src={img}
                                            alt={`${property.name} Ampliada ${idx + 1}`}
                                            fill
                                            className="object-contain"
                                            priority={Math.abs(idx - (selectedImageIndex ?? 0)) <= 1}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Arrows */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110"
                                aria-label="Anterior foto"
                            >
                                <HiChevronLeft className="text-3xl" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110"
                                aria-label="Siguiente foto"
                            >
                                <HiChevronRight className="text-3xl" />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto justify-center py-2 px-1 scrollbar-none max-w-5xl mx-auto w-full">
                            {property.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`relative w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${
                                        idx === selectedImageIndex ? "border-primary scale-105 shadow-lg opacity-100" : "border-transparent opacity-50 hover:opacity-80"
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
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default PropertyDetailClient;

