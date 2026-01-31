import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { FloatingWhatsApp } from "@/components/ui/buttons/FloatingWhatsApp";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-montserrat",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.villetaconserje.com'),
    title: {
        default: `${SITE_CONFIG.name} | Administración de Fincas en Airbnb Villeta`,
        template: `%s | ${SITE_CONFIG.name}`
    },
    description: "Gestión integral de fincas de lujo en Villeta, Cundinamarca. Especialistas en Airbnb, maximizamos tu rentabilidad con estándar de Superanfitrión.",
    keywords: ["administración de fincas villeta", "airbnb villeta", "gestión propiedades lujo", "superanfitrión airbnb colombia", "turismo villeta"],
    alternates: {
        canonical: '/',
    },
    verification: {
        google: "UCf8Je8y8pqqSOtVJ8bhPV-kCRYGLB02Bd4_iu7kTP0",
    },
    openGraph: {
        title: `${SITE_CONFIG.name} | Gestión de Fincas de Lujo`,
        description: "Maximizamos la rentabilidad de tu propiedad en Villeta con gestión de Superhost profesional.",
        url: 'https://www.villetaconserje.com',
        siteName: SITE_CONFIG.name,
        locale: 'es_CO',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
            <body className="font-sans antialiased bg-background text-foreground">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-5HFRPSX4"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>

                {/* Google Tag Manager */}
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5HFRPSX4');`,
                    }}
                />

                <Header />
                {children}
                <Footer />
                <FloatingWhatsApp />
            </body>
        </html>
    );
}
