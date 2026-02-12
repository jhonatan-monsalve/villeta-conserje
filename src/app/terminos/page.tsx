import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/config/siteConfig";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos y Condiciones | Villeta Conserje",
    alternates: {
        canonical: '/terminos',
    },
};

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-background text-zinc-800">
            <div className="py-20 lg:py-32">
                <Container>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 sm:p-12 rounded-2xl shadow-sm border border-border dark:border-white/5">
                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-8 border-b border-border pb-4">
                            Términos de Servicio
                        </h1>

                        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-text-sub dark:text-gray-300 space-y-6 text-justify">
                            <p>
                                Bienvenidos a <strong>{SITE_CONFIG.name}</strong>. Al acceder a nuestro sitio web y utilizar nuestros servicios de auditoría y gestión de propiedades en Airbnb, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones.
                            </p>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">1. Objeto de los Servicios</h2>
                                <p>
                                    {SITE_CONFIG.name} ofrece servicios de auditoría, optimización y gestión integral de propiedades para alquiler vacacional exclusivamente en la plataforma Airbnb. Nuestros servicios incluyen, pero no se limitan a, gestión de reservas, limpieza, mantenimiento y marketing digital.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">2. Auditoría Gratuita</h2>
                                <p>
                                    La auditoría gratuita ofrecida a través del portal "Solicitar Mi Auditoría" es una evaluación diagnóstica sin compromiso contractual inmediato. {SITE_CONFIG.name} se reserva el derecho de seleccionar las propiedades a auditar basándose en criterios de ubicación y potencial de mercado.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">3. Garantía de Servicio</h2>
                                <p>
                                    Nuestra garantía de "Tu primera reserva será 5 estrellas o devolvemos el 100% de nuestra comisión" se refiere exclusivamente a la comisión de administración pactada con el propietario. No incluye reembolsos sobre pagos realizados por el huésped a Airbnb ni costos fijos de mantenimiento de la propiedad.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">4. Responsabilidad del Propietario</h2>
                                <p>
                                    El propietario declara que la finca cumple con todas las normativas legales vigentes en Colombia para el alquiler turístico (Registro Nacional de Turismo - RNT) y que la información proporcionada sobre la propiedad es verídica.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">5. Limitación de Responsabilidad</h2>
                                <p>
                                    {SITE_CONFIG.name} actúa como gestor y administrador. No seremos responsables de daños fortuitos, comportamientos de huéspedes fuera del control de la administración o fluctuaciones del mercado turístico que afecten los ingresos estimados.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">6. Propiedad Intelectual</h2>
                                <p>
                                    Todo el contenido de este sitio (textos, logos, carruseles, código) es propiedad de {SITE_CONFIG.name}. Queda prohibida su reproducción total o parcial sin autorización expresa.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">7. Ley Aplicable y Jurisdicción</h2>
                                <p>
                                    Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta ante los tribunales competentes en la jurisdicción de Cundinamarca/Villeta.
                                </p>
                            </section>

                            <p className="pt-8 text-sm italic">Última actualización: 25 de Enero de 2026.</p>
                        </div>
                    </div>
                </Container>
            </div>
        </main>
    );
}
