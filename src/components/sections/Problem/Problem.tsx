import { Container } from "@/components/layout/Container";
import { MdWarning, MdMoneyOff, MdSentimentDissatisfied, MdPhoneIphone, MdSchedule } from "react-icons/md";

export function Problem() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-zinc-900 border-b border-border">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-6">
                        ¿Tu Finca en Villeta Genera Gastos en Vez de Ingresos?
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-surface-light dark:bg-zinc-800/50 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <MdWarning size={24} />
                        </div>
                        <p className="text-text-main dark:text-gray-300 font-medium text-lg leading-relaxed">
                            Personal informal que no cuida los detalles
                        </p>
                    </div>
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-surface-light dark:bg-zinc-800/50 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <MdMoneyOff size={24} />
                        </div>
                        <p className="text-text-main dark:text-gray-300 font-medium text-lg leading-relaxed">
                            Propiedades vacías 20 días al mes
                        </p>
                    </div>
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-surface-light dark:bg-zinc-800/50 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <MdSentimentDissatisfied size={24} />
                        </div>
                        <p className="text-text-main dark:text-gray-300 font-medium text-lg leading-relaxed">
                            Miedo a que dañen tu inversión de 2,000 millones
                        </p>
                    </div>
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-surface-light dark:bg-zinc-800/50 hover:shadow-md transition-shadow md:col-span-1 lg:col-span-1">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <MdPhoneIphone size={24} />
                        </div>
                        <p className="text-text-main dark:text-gray-300 font-medium text-lg leading-relaxed">
                            Anuncios de Airbnb sin optimizar (pocas reservas)
                        </p>
                    </div>
                    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-surface-light dark:bg-zinc-800/50 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg shrink-0">
                            <MdSchedule size={24} />
                        </div>
                        <p className="text-text-main dark:text-gray-300 font-medium text-lg leading-relaxed">
                            Pérdida de tiempo coordinando limpiezas y mantenimiento
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
