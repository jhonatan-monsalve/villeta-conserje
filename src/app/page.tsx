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
