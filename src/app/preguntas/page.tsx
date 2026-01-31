import { FAQ } from "@/components/sections/FAQ/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Preguntas Frecuentes sobre Gestión de Airbnb en Villeta",
    description: "Resolvemos tus dudas sobre requisitos, comisiones, pagos y el proceso para empezar a administrar tu finca con nosotros.",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="pt-24">
                <FAQ />
            </div>
        </main>
    );
}
