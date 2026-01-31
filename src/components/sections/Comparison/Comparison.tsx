import { Container } from "@/components/layout/Container";
import { MdCleaningServices, MdTrendingUp, MdSupportAgent, MdDiamond, MdCheckCircle, MdClose } from "react-icons/md";

const ROWS = [
    {
        icon: MdCleaningServices,
        label: "Protocolo de Limpieza",
        traditional: "Barrido Estándar",
        villeta: "Protocolo de 47 Puntos"
    },
    {
        icon: MdTrendingUp,
        label: "Estrategia de Precios",
        traditional: "Tarifas Fijas",
        villeta: "Precios Dinámicos con IA"
    },
    {
        icon: MdSupportAgent,
        label: "Soporte al Cliente",
        traditional: "Horario Oficina 9-5",
        villeta: "Conserjería 24/7"
    },
    {
        icon: MdDiamond,
        label: "Experiencia Huésped",
        traditional: "Entrega de Llaves",
        villeta: "Bienvenida de Lujo"
    }
];

export function Comparison() {
    return (
        <section className="py-16 sm:py-24 bg-surface-light dark:bg-background-dark" id="comparativa">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-main dark:text-white mb-4">
                        Por Qué los Propietarios Nos Prefieren
                    </h2>
                    <p className="text-text-sub dark:text-gray-400 text-lg">
                        Vea la diferencia entre la administración tradicional y nuestro servicio de conserjería premium.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-border dark:border-white/10 shadow-sm bg-white dark:bg-zinc-900">
                    {/* Header */}
                    <div className="grid grid-cols-12 bg-gray-50 dark:bg-zinc-800/50 border-b border-border dark:border-white/10">
                        <div className="col-span-4 p-4 sm:p-6 text-sm sm:text-base font-semibold text-text-main dark:text-white">
                            Característica
                        </div>
                        <div className="col-span-4 p-4 sm:p-6 text-sm sm:text-base font-semibold text-text-sub dark:text-gray-400 border-l border-border dark:border-white/10">
                            Gestión Tradicional
                        </div>
                        <div className="col-span-4 p-4 sm:p-6 text-sm sm:text-base font-bold text-primary border-l border-border dark:border-white/10 bg-primary/5">
                            Villeta Conserje
                        </div>
                    </div>

                    {/* Rows */}
                    {ROWS.map((row, i) => (
                        <div key={i} className="grid grid-cols-12 border-b border-border dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-4 p-4 sm:p-6 flex items-center gap-2 text-sm sm:text-base font-medium text-text-main dark:text-gray-200">
                                <row.icon className="text-primary text-xl sm:text-2xl shrink-0" />
                                {row.label}
                            </div>
                            <div className="col-span-4 p-4 sm:p-6 flex items-center gap-2 text-sm text-text-sub dark:text-gray-400 border-l border-border dark:border-white/10">
                                <MdClose className="text-red-400 text-xl shrink-0" />
                                {row.traditional}
                            </div>
                            <div className="col-span-4 p-4 sm:p-6 flex items-center gap-2 text-sm font-medium text-text-main dark:text-white border-l border-border dark:border-white/10 bg-primary/5">
                                <MdCheckCircle className="text-primary text-xl shrink-0" />
                                {row.villeta}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
