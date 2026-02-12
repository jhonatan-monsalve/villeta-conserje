import { ContactForm } from "@/components/sections/Contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agendar Auditoría Gratuita | Villeta Conserje",
    description: "Solicita una auditoría de ingresos gratuita para tu finca en Villeta. Descubre cuánto puedes ganar en Airbnb con nuestra gestión profesional.",
    keywords: ["auditoría airbnb villeta", "rentabilidad fincas villeta", "gestión airbnb colombia", "ingresos alquiler vacacional"],
    alternates: {
        canonical: '/auditoria',
    },
    openGraph: {
        title: "Agendar Auditoría Gratuita | Villeta Conserje",
        description: "Descubre el potencial real de ingresos de tu finca en Villeta con nuestra auditoría gratuita.",
        url: 'https://villetaconserje.com/auditoria',
        type: 'website',
    }
};

export default function AuditoriaPage() {
    return (
        <main className="min-h-screen bg-background pt-24">
            <div className="py-12 lg:py-20">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
                            Servicio Exclusivo para Propietarios
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-main dark:text-white mb-6">
                            Optimiza la Rentabilidad de tu Finca
                        </h1>
                        <p className="text-text-sub dark:text-gray-400 text-lg leading-relaxed">
                            Nuestra auditoría gratuita analiza el potencial de tu propiedad basándose en datos reales de mercado,
                            competencia actual y estándares de calidad Superhost.
                        </p>
                    </div>
                </Container>

                {/* Reutilizamos el ContactForm que ya tiene el ID 'auditoria' y el diseño necesario */}
                <ContactForm />

                <Container>
                    <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-zinc-100 pt-12">
                        <div>
                            <h4 className="font-bold text-xl text-primary mb-2">Paso 1</h4>
                            <p className="text-sm text-gray-600">Completa el formulario con los detalles de tu propiedad.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-xl text-primary mb-2">Paso 2</h4>
                            <p className="text-sm text-gray-600">Analizamos el mercado y la competencia en tu zona.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-xl text-primary mb-2">Paso 3</h4>
                            <p className="text-sm text-gray-600">Recibes un informe detallado con el potencial de ingresos.</p>
                        </div>
                    </div>
                </Container>
            </div>
        </main>
    );
}
