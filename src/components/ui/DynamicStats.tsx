"use client";

import { useGlobalAirbnbStats } from '@/contexts/AirbnbStatsContext';
import { HiStar } from "react-icons/hi";

export function DynamicReviewCount() {
    const { stats } = useGlobalAirbnbStats();
    return <>{stats.reviews}</>;
}

export function DynamicRating({ fractionDigits = 1 }: { fractionDigits?: number }) {
    const { stats } = useGlobalAirbnbStats();
    return <>{stats.rating.toFixed(fractionDigits)}</>;
}

export function DynamicStars({ className = "text-lg" }: { className?: string }) {
    const { stats } = useGlobalAirbnbStats();
    return (
        <div className="flex text-gold" role="img" aria-label={`Calificación: ${stats.rating.toFixed(1)} estrellas`}>
            {/* We could potentially render half stars here based on the rating, but for now we render 5 full stars as visually requested */}
            {[...Array(5)].map((_, i) => (
                <HiStar key={i} className={className} />
            ))}
        </div>
    );
}
