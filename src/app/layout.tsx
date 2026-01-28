import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
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

                {children}
                <FloatingWhatsApp />
            </body>
        </html>
    );
}
