import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero/Hero";

// Dynamic imports for heavy/interactive components to reduce initial bundle size and TBT
const ScrollReveal = dynamic(() => import("@/components/ui/animations/ScrollReveal").then(mod => mod.ScrollReveal), {
    ssr: false
});

const Problem = dynamic(() => import("@/components/sections/Problem/Problem").then(mod => mod.Problem), {
    loading: () => <div className="min-h-[400px]" />
});

const Solution = dynamic(() => import("@/components/sections/Solution/Solution").then(mod => mod.Solution), {
    loading: () => <div className="min-h-[400px]" />
});

const Comparison = dynamic(() => import("@/components/sections/Comparison/Comparison").then(mod => mod.Comparison), {
    loading: () => <div className="min-h-[400px]" />
});

const FeaturedProperty = dynamic(() => import("@/components/sections/FeaturedProperty/FeaturedProperty").then(mod => mod.FeaturedProperty), {
    loading: () => <div className="min-h-[600px]" />
});

const Services = dynamic(() => import("@/components/sections/Services/Services").then(mod => mod.Services), {
    loading: () => <div className="min-h-[500px]" />
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials/Testimonials").then(mod => mod.Testimonials), {
    loading: () => <div className="min-h-[400px]" />
});

const Calculator = dynamic(() => import("@/components/sections/Calculator/Calculator").then(mod => ({ default: mod.Calculator })), {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />
});

const ContactForm = dynamic(() => import("@/components/sections/Contact/ContactForm").then(mod => ({ default: mod.ContactForm })), {
    ssr: false,
    loading: () => <div className="min-h-[500px]" />
});

const FAQ = dynamic(() => import("@/components/sections/FAQ/FAQ").then(mod => ({ default: mod.FAQ })), {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />
});

const BlogPreview = dynamic(() => import("@/components/sections/Blog/BlogPreview").then(mod => ({ default: mod.BlogPreview })), {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />
});

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Cuánto Dinero Pierde Tu Finca Cada Fin de Semana? | Villeta Conserje",
    description: "Las fincas que gestionamos generan entre $8M y $15M al mes en Airbnb Villeta. Solicita tu valoración gratuita y descubre en 24h cuánto puede ganar tu propiedad.",
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
