import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero/Hero";

import { ScrollReveal } from "@/components/ui/animations/ScrollReveal";
import { Problem } from "@/components/sections/Problem/Problem";
import { Solution } from "@/components/sections/Solution/Solution";
import { Comparison } from "@/components/sections/Comparison/Comparison";
import { FeaturedProperty } from "@/components/sections/FeaturedProperty/FeaturedProperty";
import { Services } from "@/components/sections/Services/Services";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { Calculator } from "@/components/sections/Calculator/Calculator";
import { ContactForm } from "@/components/sections/Contact/ContactForm";
import { FAQ } from "@/components/sections/FAQ/FAQ";
import { BlogPreview } from "@/components/sections/Blog/BlogPreview";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Administración de Fincas e Inmuebles en Villeta | Villeta Conserje",
    description: "Inmobiliaria especializada en Villeta. Gestionamos el alquiler de tu finca vacacional. Genera entre $8M y $15M al mes en Airbnb. ¡Solicita valoración gratuita!",
    alternates: {
        canonical: '/',
    },
    other: {
        "script:ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "¿Qué incluye el servicio de limpieza de Villeta Conserje?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Nuestro protocolo de 47 puntos asegura calidad hotelera. Incluye limpieza profunda, lavado de ropa de cama de lujo, reposición de amenidades de baño y desinfección total antes de cada llegada."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Es seguro alquilar mi finca en Villeta a través de Airbnb?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutamente. Realizamos un filtrado estricto de cada huésped verificando identidad y antecedentes. Además, gestionamos depósitos de seguridad y contamos con pólizas de protección para daños."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Cuánto cobra Villeta Conserje por gestionar mi finca en Airbnb?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Cobramos una comisión del 15% sobre los ingresos generados. Usted recibe su pago directamente en su cuenta bancaria de forma transparente y puntual tras cada reserva. Sin costos ocultos."
                    }
                }
            ]
        })
    }
};

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Hero />

            <ScrollReveal delay={0.1}>
                <Problem />
            </ScrollReveal>

            <ScrollReveal>
                <Solution />
            </ScrollReveal>

            <ScrollReveal>
                <Comparison />
            </ScrollReveal>

            <ScrollReveal>
                <FeaturedProperty />
            </ScrollReveal>

            <ScrollReveal>
                <Services />
            </ScrollReveal>

            <ScrollReveal>
                <Testimonials />
            </ScrollReveal>

            <ScrollReveal>
                <Calculator />
            </ScrollReveal>

            <ScrollReveal>
                <BlogPreview />
            </ScrollReveal>

            <ScrollReveal>
                <FAQ />
            </ScrollReveal>

            <ScrollReveal>
                <ContactForm />
            </ScrollReveal>
        </main>
    );
}
