import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import Link from "next/link";

export function Hero() {
    return (
        <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden bg-stone-900">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <ExportedImage
                    src="images/hero-bg.jpg"
                    alt="Luxury villa with pool at sunset in Villeta"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay: Darker at top for header visibility and bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <Container className="relative z-10 w-full">
                <div className="max-w-4xl pt-40 pb-20"> {/* Aumentado el PT para dar aire al Header */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-white/5 backdrop-blur-md border border-white/10 text-gray-100 text-xs font-medium mb-8 tracking-widest uppercase shadow-lg">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
                        Gestión Premium Airbnb
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F5F5F5] leading-[1.1] tracking-tight mb-8 drop-shadow-none">
                        Tu Finca en Villeta puede generar <br />
                        <span className="italic text-gold font-serif block mt-2">$8M - $15M al Mes</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed opacity-90 drop-shadow-md">
                        Transformamos tu propiedad en la favorita de los huéspedes con gestión Superhost. Calidad 5 estrellas garantizada.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="/#auditoria">
                            <Button className="w-full sm:w-auto font-sans font-semibold uppercase tracking-[0.15em] bg-[#10221a] text-white px-10 py-5 rounded-[4px] hover:bg-gold hover:text-white hover:-translate-y-1 transition-all duration-500 shadow-xl border border-white/10 text-sm">
                                Solicitar Auditoría
                            </Button>
                        </Link>
                        <a href="#servicios">
                            <Button variant="ghost" className="w-full sm:w-auto font-sans font-semibold uppercase tracking-[0.15em] text-white bg-transparent border border-white/30 px-10 py-5 rounded-[4px] hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm text-sm">
                                Ver Cómo Funciona
                            </Button>
                        </a>
                    </div>
                    <p className="text-[10px] text-white/50 mt-8 tracking-wide uppercase px-1">Diagnóstico de ingresos en 24 horas</p>
                </div>
            </Container>
        </section>
    );
}
