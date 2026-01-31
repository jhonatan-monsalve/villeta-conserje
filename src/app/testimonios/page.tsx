import { Testimonials } from "@/components/sections/Testimonials/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Testimonios de Propietarios y Huéspedes en Villeta",
    description: "Lo que dicen nuestros clientes sobre la gestión de sus propiedades y la experiencia de hospedarse con Villeta Conserje.",
};

export default function TestimonialsPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="pt-24">
                <Testimonials />
            </div>
        </main>
    );
}
