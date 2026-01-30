import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { MdCalendarMonth, MdCleaningServices, MdEngineering, MdCampaign, MdAccountBalance, MdArrowOutward } from "react-icons/md";

const SERVICES = [
    {
        icon: MdCalendarMonth,
        title: "Gestión de Reservas",
        description: "Atención 24/7 a huéspedes (WhatsApp/Airbnb), coordinación de check-in/out, entrega de llaves y bienvenida personalizada."
    },
    {
        icon: MdCleaningServices,
        title: "Limpieza Profesional",
        description: "Protocolo de 47 puntos (sábanas, toallas, piscina, BBQ), productos premium ecológicos e inspección fotográfica."
    },
    {
        icon: MdEngineering,
        title: "Mantenimiento Preventivo",
        description: "Supervisión de jardinero y piscinero, reporte semanal de estado y gestión de reparaciones urgentes."
    },
    {
        icon: MdCampaign,
        title: "Marketing & Optimización",
        description: "Sesión fotográfica profesional, copywriting de conversión y gestión de precios según demanda (yield management)."
    },
    {
        icon: MdAccountBalance,
        title: "Administración Financiera",
        description: "Cobro a huéspedes, pago de servicios (luz, agua, internet) y reporte mensual detallado con fotos."
    }
];

export function Services() {
    return (
        <section className="py-16 bg-white dark:bg-zinc-900 border-y border-border dark:border-white/5" id="servicios">
            <Container>
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="md:w-1/3 md:sticky md:top-24">
                        <h2 className="text-3xl font-display font-bold text-text-main dark:text-white mb-4 leading-tight">
                            Características de Gestión Premium
                        </h2>
                        <p className="text-text-sub dark:text-gray-400 mb-8">
                            Manejamos las complejidades del alquiler a corto plazo para que usted disfrute de ingresos pasivos.
                        </p>
                        <a
                            href="#auditoria"
                            className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                        >
                            Obtenga su estimación de ingresos
                            <MdArrowOutward className="text-lg" />
                        </a>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {SERVICES.map((service, index) => (
                            <Card key={index} className="hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-surface-light dark:bg-zinc-800 rounded-lg flex items-center justify-center text-text-main dark:text-white shadow-sm mb-4 group-hover:text-primary transition-colors">
                                    <service.icon className="text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-text-sub dark:text-gray-400">
                                    {service.description}
                                </p>
                            </Card>
                        ))}

                        {/* Pricing Info Card */}
                        <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col justify-center items-center text-center">
                            <p className="text-primary font-bold text-xl mb-1">Manejo Integral</p>
                            <p className="text-3xl font-display font-bold text-text-main dark:text-white mb-2">15%</p>
                            <p className="text-sm text-text-sub dark:text-gray-300">De comisión sobre ingresos generados.</p>
                            <p className="text-xs text-text-sub/80 mt-2">Sin costos ocultos.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
