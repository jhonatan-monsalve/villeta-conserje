import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import dynamic from 'next/dynamic';
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

// Dynamic imports for non-critical UI components
const FloatingWhatsApp = dynamic(() => import("@/components/ui/buttons/FloatingWhatsApp").then(mod => ({ default: mod.FloatingWhatsApp })), {
    ssr: false,
});

const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent").then(mod => ({ default: mod.CookieConsent })), {
    ssr: false,
});

// Configuración de fuentes de Google para optimizar el rendimiento visual.
// 'display: swap' asegura que el texto sea legible antes de que se cargue la fuente personalizada.
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
    metadataBase: new URL('https://villetaconserje.com'),
    title: {
        default: `${SITE_CONFIG.name} | Administración de Fincas en Airbnb Villeta`,
        template: `%s | ${SITE_CONFIG.name}`
    },
    description: "Gestión integral de fincas de lujo en Villeta, Cundinamarca. Especialistas en Airbnb, maximizamos tu rentabilidad con estándar de Superanfitrión.",
    keywords: ["administración de fincas villeta", "airbnb villeta", "gestión propiedades lujo", "superanfitrión airbnb colombia", "turismo villeta"],
    verification: {
        google: "UCf8Je8y8pqqSOtVJ8bhPV-kCRYGLB02Bd4_iu7kTP0",
    },
    openGraph: {
        title: `${SITE_CONFIG.name} | Gestión de Fincas de Lujo`,
        description: "Maximizamos la rentabilidad de tu propiedad en Villeta con gestión de Superhost profesional.",
        url: 'https://villetaconserje.com',
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: '/images/hero-bg.jpg',
                width: 1200,
                height: 630,
                alt: 'Villeta Conserje - Gestión de Fincas de Lujo en Villeta',
            }
        ],
        locale: 'es_CO',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        images: ['/images/hero-bg.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
};

/**
 * RootLayout: Componente que envuelve toda la aplicación.
 * Gestiona el SEO global, scripts de analíticas y la estructura base del DOM.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
            <head>
                {/* Preload critical hero image for faster LCP */}
                <link
                    rel="preload"
                    as="image"
                    href="/images/hero-bg.jpg"
                    fetchPriority="high"
                />

                {/* Preconnect to external domains for faster resource loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            </head>
            <body className="font-sans antialiased bg-background text-foreground">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-5HFRPSX4"
                        height="0"
                        width="0"
                        title="Google Tag Manager"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>

                {/* 
                  Google Tag Manager: Optimizado para no bloquear el renderizado inicial.
                  Se carga después de la interacción del usuario para mejorar LCP y FCP.
                */}
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.addEventListener('load', function() {
                            setTimeout(function() {
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-5HFRPSX4');
                            }, 1000);
                        });
                        `,
                    }}
                />

                {/* Schema Markup para SEO Local - Define el área de servicio en Google Maps */}
                <Script
                    id="local-business-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "HomeAndConstructionBusiness",
                            "name": SITE_CONFIG.name,
                            "description": SITE_CONFIG.description,
                            "url": "https://villetaconserje.com",
                            "telephone": `+${SITE_CONFIG.whatsapp}`,
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Villeta",
                                "addressRegion": "Cundinamarca",
                                "addressCountry": "CO"
                            },
                            "areaServed": [
                                { "@type": "City", "name": "Villeta" },
                                { "@type": "Place", "name": "Vereda Salitre Negro" },
                                { "@type": "Place", "name": "Vereda Cune" },
                                { "@type": "Place", "name": "Vereda Maní" },
                                { "@type": "Place", "name": "Vereda Bagazal" },
                                { "@type": "Place", "name": "Vereda Salitre Blanco" },
                                { "@type": "Place", "name": "Vereda Payandé" },
                                { "@type": "Place", "name": "Conjunto Campestre Los Cámbulos" },
                                { "@type": "Place", "name": "Conjunto Residencial Hacienda Dos Maderos" }
                            ],
                            "knowsAbout": ["Mantenimiento de fincas", "Conserjería", "Cuidado de casas de recreo", "Villeta Cundinamarca"]
                        })
                    }}
                />

                <Header />
                {children}
                <Footer />
                <FloatingWhatsApp />
                <CookieConsent />
            </body>
        </html>
    );
}
