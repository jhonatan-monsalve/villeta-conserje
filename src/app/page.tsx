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
    title: "Administración de Fincas en Airbnb Villeta | Villeta Conserje",
    description: "Administración integral de fincas en Villeta. Maximizamos tus ingresos en Airbnb y cuidamos tu propiedad sin complicaciones. ¡Solicita valoración gratuita!",
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Administración de Fincas en Airbnb Villeta | Villeta Conserje",
        description: "Administración integral de fincas en Villeta. Maximizamos tus ingresos en Airbnb y cuidamos tu propiedad sin complicaciones. ¡Solicita valoración gratuita!",
        url: 'https://villetaconserje.com',
        siteName: 'Villeta Conserje',
        images: [
            {
                url: 'https://villetaconserje.com/images/og-villeta-conserje.jpg',
                width: 1200,
                height: 630,
                alt: 'Villeta Conserje - Gestión Profesional de Fincas en Airbnb Villeta',
                type: 'image/jpeg',
            }
        ],
        locale: 'es_CO',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Administración de Fincas en Airbnb Villeta | Villeta Conserje",
        description: "Administración integral de fincas en Villeta. Maximizamos tus ingresos en Airbnb y cuidamos tu propiedad sin complicaciones. ¡Solicita valoración gratuita!",
        images: ['https://villetaconserje.com/images/og-villeta-conserje.jpg'],
    },
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
