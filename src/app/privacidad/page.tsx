import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/config/siteConfig";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad | Villeta Conserje",
    alternates: {
        canonical: '/privacidad',
    },
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-background text-zinc-800">
            <div className="py-20 lg:py-32">
                <Container>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 sm:p-12 rounded-2xl shadow-sm border border-border dark:border-white/5">
                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-8 border-b border-border pb-4">
                            Política de Privacidad
                        </h1>

                        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-text-sub dark:text-gray-300 space-y-6">
                            <p>
                                En <strong>{SITE_CONFIG.name}</strong>, valoramos su privacidad. De conformidad con la <strong>Ley 1581 de 2012</strong> (Ley de Habeas Data) y demás normas que la modifiquen o complementen en Colombia, le informamos cómo tratamos sus datos personales.
                            </p>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">1. Responsable del Tratamiento</h2>
                                <p>
                                    El responsable del tratamiento de sus datos es {SITE_CONFIG.name}, con domicilio en Villeta, Cundinamarca, Colombia. Puede contactarnos a través de nuestro correo electrónico: <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary underline">{SITE_CONFIG.email}</a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">2. Finalidad de la Información</h2>
                                <p>La recolección y tratamiento de sus datos personales tiene las siguientes finalidades:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Gestionar la solicitud de auditoría de su propiedad.</li>
                                    <li>Establecer contacto para coordinar visitas diagnósticas.</li>
                                    <li>Enviar información relevante sobre nuestros servicios de administración de fincas.</li>
                                    <li>Realizar encuestas de satisfacción y mejora del servicio.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">3. Datos Recolectados</h2>
                                <p>A través de nuestro formulario de contacto, recolectamos:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Nombre completo.</li>
                                    <li>Número de teléfono (WhatsApp).</li>
                                    <li>Ubicación de la propiedad.</li>
                                    <li>Correo electrónico.</li>
                                    <li>URL de la propiedad en Airbnb (si aplica).</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">4. Derechos del Titular</h2>
                                <p>Como titular de sus datos personales, usted tiene derecho a:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Conocer, actualizar y rectificar sus datos personales.</li>
                                    <li>Solicitar prueba de la autorización otorgada.</li>
                                    <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
                                    <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                                    <li>Acceder de forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">5. Seguridad de la Información</h2>
                                <p>
                                    Contamos con medidas técnicas y administrativas de seguridad para evitar el acceso no autorizado, la adulteración o pérdida de sus datos personales recolectados a través de nuestro portal web.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-text-main dark:text-white mb-3">6. Vigencia</h2>
                                <p>
                                    Esta política entra en vigencia a partir de su publicación y la base de datos se mantendrá mientras sea necesario para cumplir con las finalidades descritas o hasta que el titular revoque su autorización.
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
