import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Hero } from "@/components/sections/Hero/Hero";
import { Services } from "@/components/sections/Services/Services";
import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { Calculator } from "@/components/sections/Calculator/Calculator";
import { ContactForm } from "@/components/sections/Contact/ContactForm";

// Static Sections (Problem, Solution, Comparison) to be refactored into proper components later if preferred,
// but for now we can keep them here or create simple components. 
// Plan said to migrate them. Let's create them inline or as components.
// Better to create quick components for them to keep page clean.

import { Problem } from "@/components/sections/Problem/Problem";
import { Solution } from "@/components/sections/Solution/Solution";
import { Comparison } from "@/components/sections/Comparison/Comparison";
import { FAQ } from "@/components/sections/FAQ/FAQ";
import { FeaturedProperty } from "@/components/sections/FeaturedProperty/FeaturedProperty";
import { BlogPreview } from "@/components/sections/Blog/BlogPreview";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <Hero />
            <Problem />
            <Solution />
            <Comparison />
            <FeaturedProperty />
            <Services />
            <Testimonials />
            <Calculator />
            <BlogPreview />
            <FAQ />
            <ContactForm />
            <Footer />
        </main>
    );
}
