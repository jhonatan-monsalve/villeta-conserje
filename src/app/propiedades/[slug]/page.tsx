import { SITE_CONFIG } from "@/lib/config/siteConfig";
import PropertyDetailClient from "./PropertyDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PropertyDetailClient property={property} />
        </>
    );
}
