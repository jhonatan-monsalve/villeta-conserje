import { SITE_CONFIG } from "@/lib/config/siteConfig";
import PropertyDetailClient from "./PropertyDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: {
        slug: string;
    };
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
            title: "Propiedad no encontrada | Villeta Conserje",
        };
    }
    return {
        title: `${property.name} | Villeta Conserje`,
        description: property.description,
    };
}

export default function PropertyPage({ params }: Props) {
    const property = SITE_CONFIG.properties.find((p) => p.slug === params.slug);

    if (!property) {
        notFound();
    }

    return <PropertyDetailClient property={property} />;
}
