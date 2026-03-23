import { ContactForm } from "@/components/sections/Contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Metadata } from "next";
import { LuClipboardList, LuSearch, LuSend } from "react-icons/lu";

export const metadata: Metadata = {
    title: "Valoración Gratuita de tu Finca | Villeta Conserje",
    description: "Solicita una valoración de ingresos gratuita para tu finca en Villeta. Descubre cuánto puedes ganar en Airbnb con nuestra gestión profesional.",
    keywords: ["valoración airbnb villeta", "rentabilidad fincas villeta", "gestión airbnb colombia", "ingresos alquiler vacacional"],
    alternates: {
        canonical: '/valoracion',
    },
    openGraph: {
        title: "Valoración Gratuita de tu Finca | Villeta Conserje",
        description: "Descubre el potencial real de ingresos de tu finca en Villeta con nuestra valoración gratuita.",
        url: 'https://villetaconserje.com/valoracion',
        type: 'website',
        images: [
            {
                url: '/images/hero-bg.jpg',
                width: 1200,
                height: 630,
                alt: 'Valoración Gratuita de Finca en Villeta - Villeta Conserje',
            }
        ],
    }
};

export default function ValoracionPage() {
    return (
        <main className="min-h-screen bg-background pt-24">
            <div className="py-12 lg:py-20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-primary font-bold uppercase tracking-widest text-base mb-4 block">
                            Servicio Exclusivo para Propietarios
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-main dark:text-white mb-6">
                            Optimiza la Rentabilidad de tu Finca
                        </h1>
                        <p className="text-text-sub dark:text-gray-400 text-xl leading-relaxed">
                            Nuestra valoración gratuita analiza el potencial de tu propiedad basándose en datos reales de mercado,
                            competencia actual y estándares de calidad Superhost.
                        </p>
                    </div>
                </Container>

                <Container>
                    <div className="max-w-5xl mx-auto mt-16 mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Paso 1 */}
                        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                                <LuClipboardList className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-2xl text-text-main dark:text-white mb-3">Paso 1</h4>
                            <p className="text-lg text-text-sub dark:text-gray-400">
                                Completa el formulario con los detalles clave de tu propiedad.
                            </p>
                        </div>

                        {/* Paso 2 */}
                        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                                <LuSearch className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-2xl text-text-main dark:text-white mb-3">Paso 2</h4>
                            <p className="text-lg text-text-sub dark:text-gray-400">
                                Analizamos el mercado y la competencia directa en tu zona.
                            </p>
                        </div>

                        {/* Paso 3 */}
                        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 group">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                                <LuSend className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-2xl text-text-main dark:text-white mb-3">Paso 3</h4>
                            <p className="text-lg text-text-sub dark:text-gray-400">
                                Recibes un informe detallado con el potencial de ingresos.
                            </p>
                        </div>
                    </div>
                </Container>

                {/* Reutilizamos el ContactForm que ya tiene el ID 'valoracion' y el diseño necesario */}
                <ContactForm />
            </div>
        </main>
    );
}
