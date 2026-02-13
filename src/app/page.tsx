import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/Hero/Hero";
import { Services } from "@/components/sections/Services/Services";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { Problem } from "@/components/sections/Problem/Problem";
import { Solution } from "@/components/sections/Solution/Solution";
import { Comparison } from "@/components/sections/Comparison/Comparison";
import { FeaturedProperty } from "@/components/sections/FeaturedProperty/FeaturedProperty";
import { ScrollReveal } from "@/components/ui/animations/ScrollReveal";

// Dynamic imports for below-the-fold components to reduce initial bundle size
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
