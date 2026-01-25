import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { HiArrowRight } from "react-icons/hi";

export function Hero() {
    return (
        <section className="relative bg-surface-light dark:bg-surface-dark pt-10 pb-16 lg:pt-16 lg:pb-24">
            <Container>
                <div className="bg-surface-dark rounded-2xl overflow-hidden relative shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Luxury villa with pool at sunset in Villeta"
                            className="w-full h-full object-cover opacity-60"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUSiEQMMdj2hIvoBFXAwgIm7CqEEMWtPkSLbC6Rzw0thcy1w9hraFe9jNzKwTvMxuEGXW2VJBGf9b02EQwxFPJ4mp0K1uBKvRCSyPA1XYz9smjhKo0PDwFI0kurL7tZ7PRZ7f6kPLHOts_0hqgmBQOwibkFLMPmt_sILqt_TFLEY-lM8gPBknuQUQkpP2OECsbdOz_nISwBVhUrZH1NAS5H6_6zRtYZg6mnCIVcDTjip16MioeryXAKh8uhikKAi0qdWXK04RdlO8"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent"></div>
                    </div>

                    <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-24 lg:py-32 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse"></span>
                            Superanfitriona Airbnb - {SITE_CONFIG.stats.reviews} de {SITE_CONFIG.stats.reviews} Reservas con 5 Estrellas
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight tracking-tight mb-6">
                            Tu Finca en Villeta Puede Generar <span className="text-gold">$8M-$15M al Mes</span> con Gestión de Superhost
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light">
                            Gestión integral exclusiva para Airbnb. Transformamos tu propiedad en la favorita de los huéspedes, garantizando calidad 5 estrellas en cada reserva.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href={SITE_CONFIG.links.whatsapp_audit} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="gap-2 w-full sm:w-auto uppercase tracking-wide">
                                    Solicitar Auditoría Gratuita
                                    <HiArrowRight className="text-xl" />
                                </Button>
                            </a>
                            <a href="#features">
                                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm">
                                    Ver Cómo Funciona
                                </Button>
                            </a>
                        </div>
                        <p className="text-xs text-white/50 mt-3 pl-2">Obtenga un pronóstico de ingresos personalizado en 24 horas.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
