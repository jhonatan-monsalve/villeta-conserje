"use client";

import { useAirbnbStats } from "@/hooks/useAirbnbStats";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { HiStar } from "react-icons/hi";

export function AirbnbStatsBadge() {
    const listingId = SITE_CONFIG.links.airbnb_listing.split("/rooms/")[1]?.split("?")[0] || "1402264507691687773";
    const { stats } = useAirbnbStats(listingId, {
        reviews: SITE_CONFIG.stats.reviews,
        rating: SITE_CONFIG.stats.rating
    });

    return (
        <div className="flex items-center gap-3 mt-8">
            <div className="flex text-gold" role="img" aria-label={`Calificación: ${stats.rating.toFixed(1)} estrellas`}>
                {/* Genera estrellas doradas según la puntuación actual */}
                {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="text-lg" />
                ))}
            </div>
            <span className="text-sm text-gray-400">
                {stats.rating.toFixed(1)} estrellas · {stats.reviews} reseñas en Airbnb
            </span>
        </div>
    );
}
