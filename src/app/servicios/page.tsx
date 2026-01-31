import { Services } from "@/components/sections/Services/Services";
import { Hero } from "@/components/sections/Hero/Hero";
import { ContactForm } from "@/components/sections/Contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios de Gestión de Airbnb en Villeta",
    description: "Conoce nuestros servicios integrales de administración de fincas: marketing, limpieza, mantenimiento y atención al huésped 5 estrellas.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Hero />
            <div className="py-12">
                <Services />
            </div>
            <ContactForm />
        </main>
    );
}
