"use client";

import { DynamicReviewCount, DynamicRating, DynamicStars } from "@/components/ui/DynamicStats";

export function AirbnbStatsBadge() {

    return (
        <div className="flex items-center gap-3 mt-8">
            <DynamicStars className="text-lg" />
            <span className="text-sm text-gray-400">
                <DynamicRating /> estrellas · <DynamicReviewCount /> reseñas en Airbnb
            </span>
        </div>
    );
}
