import { SITE_CONFIG } from "@/lib/config/siteConfig";
import PropertyDetailClient from "./PropertyDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

interface Props {
    params: {
        slug: string;
    };
}

/**
 * Resumen corto para la meta description: primer párrafo de la descripción,
 * recortado a ~155 caracteres en un límite de palabra.
 */
function getMetaDescription(description: string): string {
    const firstParagraph = description.split("\n")[0].trim();
    if (firstParagraph.length <= 155) return firstParagraph;
    const cut = firstParagraph.slice(0, 155);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export async function generateStaticParams() {
    return SITE_CONFIG.properties.map((property) => ({
        slug: property.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const property = SITE_CONFIG.properties.find((p) => p.slug === params.slug);
    if (!property) {
        return {
            title: "Propiedad no encontrada",
        };
    }

    const path = `/propiedades/${property.slug}`;
    const description = getMetaDescription(property.description);

    return {
        title: `${property.name}: ${property.tagline}`,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: `${property.name} | ${SITE_CONFIG.name}`,
            description,
            url: `${SITE_CONFIG.url}${path}`,
            type: "website",
            images: [
                {
                    url: property.images[0],
                    alt: `${property.name} - finca en ${property.location}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${property.name} | ${SITE_CONFIG.name}`,
            description,
            images: [property.images[0]],
        },
    };
}

export default function PropertyPage({ params }: Props) {
    const property = SITE_CONFIG.properties.find((p) => p.slug === params.slug);

    if (!property) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        "@id": `${SITE_CONFIG.url}/propiedades/${property.slug}`,
        "identifier": property.id,
        "name": property.name,
        "description": property.description,
        "url": `${SITE_CONFIG.url}/propiedades/${property.slug}`,
        "image": property.images.map((img) => `${SITE_CONFIG.url}${img}`),
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Villeta",
            "addressRegion": "Cundinamarca",
            "addressCountry": "CO"
        },
        "latitude": property.geo.latitude,
        "longitude": property.geo.longitude,
        "amenityFeature": property.features.map((feature) => ({
            "@type": "LocationFeatureSpecification",
            "name": feature,
            "value": true
        })),
        "sameAs": [property.airbnbUrl],
        "containsPlace": {
            "@type": "Accommodation",
            "additionalType": "EntirePlace",
            "occupancy": {
                "@type": "QuantitativeValue",
                "value": property.capacity.guests
            },
            "numberOfBedrooms": property.capacity.bedrooms,
            "numberOfFullBathrooms": Math.floor(property.capacity.bathrooms),
            "numberOfPartialBathrooms": property.capacity.bathrooms % 1 ? 1 : 0,
            "bed": {
                "@type": "BedDetails",
                "numberOfBeds": property.capacity.beds
            }
        }
    };

    // Ruta de navegación (coincide con la miga visible "Inicio / Finca")
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_CONFIG.url },
            { "@type": "ListItem", "position": 2, "name": property.name, "item": `${SITE_CONFIG.url}/propiedades/${property.slug}` }
        ]
    };

    const otherProperties = SITE_CONFIG.properties.filter((p) => p.slug !== property.slug);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <PropertyDetailClient property={property} />

            {/* Enlaces internos: otras fincas y servicio para propietarios */}
            <section className="py-12 border-t border-border bg-surface-light" aria-labelledby="mas-fincas">
                <Container>
                    <div className="grid gap-8 md:grid-cols-2">
                        {otherProperties.length > 0 && (
                            <div>
                                <h2 id="mas-fincas" className="text-2xl font-display font-bold text-text-main mb-4">Otras fincas en Villeta</h2>
                                <ul className="space-y-2">
                                    {otherProperties.map((p) => (
                                        <li key={p.slug}>
                                            <Link href={`/propiedades/${p.slug}`} className="text-primary font-semibold underline underline-offset-4">
                                                {p.name}: {p.tagline}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-text-main mb-4">¿Tienes una finca en Villeta?</h2>
                            <p className="text-text-sub mb-3">
                                {property.name} es una de las fincas que administramos con estándar de Superanfitrión.
                                Conoce nuestro{" "}
                                <Link href="/administracion-airbnb-villeta" className="text-primary font-semibold underline underline-offset-4">servicio de administración de Airbnb en Villeta</Link>
                                {" "}o{" "}
                                <Link href="/valoracion" className="text-primary font-semibold underline underline-offset-4">solicita una valoración gratuita</Link>.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
