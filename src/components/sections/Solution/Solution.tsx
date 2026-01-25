import { Container } from "@/components/layout/Container";
import { MdCheck } from "react-icons/md";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { Button } from "@/components/ui/buttons/Button";
import { HiArrowRight } from "react-icons/hi";

const STEPS = [
    {
        title: "Auditoría Inicial",
        badge: "GRATIS",
        items: ["Visitamos tu propiedad", "Identificamos mejoras", "Propuesta de rentabilidad"]
    },
    {
        title: "Optimización Total",
        items: ["Fotografía profesional", "Descripción vendedora", "Pricing dinámico"]
    },
    {
        title: "Operación Sin Errores",
        items: ["Check-in/out personalizado", "Limpieza 5 estrellas", "Supervisión mantenimiento"]
    },
    {
        title: "Reportes & Pagos",
        items: ["Dashboard mensual", "Pagos quincenales", "Fotos de inspección"]
    }
];

export function Solution() {
    return (
        <section className="py-16 lg:py-24 bg-surface-light dark:bg-background-dark border-y border-border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Nuestro Proceso</span>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-6">
                        El Método Villeta Conserje: De Finca Olvidada a Activo Rentable
                    </h2>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 rounded-full"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {STEPS.map((step, index) => (
                            <div key={index} className="relative bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-border group hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 border-4 border-surface-light relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-center mb-4 text-text-main dark:text-white">
                                    {step.title}
                                    {step.badge && (
                                        <span className="text-xs bg-gold text-white px-2 py-0.5 rounded-full ml-1 align-top">{step.badge}</span>
                                    )}
                                </h3>
                                <ul className="space-y-3 text-sm text-text-sub dark:text-gray-400">
                                    {step.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <MdCheck className="text-primary text-base shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <a href={SITE_CONFIG.links.whatsapp_audit} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="lg" className="uppercase tracking-wider gap-2">
                                Quiero Mi Auditoría Gratuita
                                <HiArrowRight className="text-xl" />
                            </Button>
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
