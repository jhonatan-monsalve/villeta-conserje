import { Container } from "@/components/layout/Container";
import { MdExpandMore } from "react-icons/md";

const FAQS = [
    {
        q: "¿Qué incluye su servicio de limpieza?",
        a: "Nuestro protocolo de 47 puntos asegura calidad hotelera. Incluye limpieza profunda, lavado de ropa de cama de lujo, reposición de amenidades de baño y desinfección total antes de cada llegada."
    },
    {
        q: "¿Es seguro alquilar mi propiedad?",
        a: "Absolutamente. Realizamos un filtrado estricto de cada huésped verificando identidad y antecedentes. Además, gestionamos depósitos de seguridad y contamos con pólizas de protección para daños."
    },
    {
        q: "¿Cómo funcionan los pagos?",
        a: "Cobramos una comisión del 15% sobre los ingresos generados. Usted recibe su pago directamente en su cuenta bancaria registrada, de forma transparente y puntual tras cada reserva."
    }
];

export function FAQ() {
    return (
        <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950" id="faq">
            <Container className="max-w-4xl">
                <h2 className="text-3xl font-bold text-text-main dark:text-white mb-8 text-center">Preguntas Frecuentes</h2>
                <div className="space-y-4 mb-16">
                    {FAQS.map((faq, i) => (
                        <details key={i} className="group bg-surface-light dark:bg-zinc-900 rounded-lg border border-border dark:border-white/10 overflow-hidden">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-text-main dark:text-white">
                                <span>{faq.q}</span>
                                <span className="transition group-open:rotate-180">
                                    <MdExpandMore className="text-2xl" />
                                </span>
                            </summary>
                            <div className="text-text-sub dark:text-gray-400 mt-0 px-6 pb-6">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </Container>
        </section>
    );
}
