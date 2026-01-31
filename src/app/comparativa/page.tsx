import { Comparison } from "@/components/sections/Comparison/Comparison";
import { Hero } from "@/components/sections/Hero/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Comparativa: Gestión Tradicional vs Villeta Conserje",
    description: "Descubre por qué somos la mejor opción para administrar tu finca en Villeta. Maximizamos tus ingresos con estrategia profesional de Airbnb.",
};

export default function ComparisonPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="pt-24">
                <Comparison />
            </div>
        </main>
    );
}
