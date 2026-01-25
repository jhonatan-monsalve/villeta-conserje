import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { FloatingWhatsApp } from "@/components/ui/buttons/FloatingWhatsApp";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: `${SITE_CONFIG.name} | Administración de Fincas en Airbnb Villeta`,
        template: `%s | ${SITE_CONFIG.name}`
    },
    description: "Gestión integral de fincas de lujo en Villeta, Cundinamarca. Especialistas en Airbnb, maximizamos tu rentabilidad con estándar de Superanfitrión.",
    keywords: ["administración de fincas villeta", "airbnb villeta", "gestión propiedades lujo", "superanfitrión airbnb colombia", "turismo villeta"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
            <body className="font-sans antialiased bg-background text-foreground">
                {children}
                <FloatingWhatsApp />
            </body>
        </html>
    );
}
