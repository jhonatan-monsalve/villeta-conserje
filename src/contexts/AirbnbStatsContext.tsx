"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useAirbnbStats, AirbnbStats } from '@/hooks/useAirbnbStats';
import { SITE_CONFIG } from '@/lib/config/siteConfig';

interface AirbnbStatsContextType {
  stats: AirbnbStats;
  loading: boolean;
  error: Error | null;
}

const AirbnbStatsContext = createContext<AirbnbStatsContextType | undefined>(undefined);

interface AirbnbStatsProviderProps {
  children: ReactNode;
}

export function AirbnbStatsProvider({ children }: AirbnbStatsProviderProps) {
  // We use the default Casa Bambú ID from the site config
  const listingId = SITE_CONFIG.links.airbnb_listing.split("/rooms/")[1]?.split("?")[0] || "1402264507691687773";
  
  // The fallback stats will be shown while loading or on error, maintaining static HTML consistency
  const fallbackStats = {
    reviews: SITE_CONFIG.stats.reviews,
    rating: SITE_CONFIG.stats.rating
  };

  const { stats, loading, error } = useAirbnbStats(listingId, fallbackStats);

  return (
    <AirbnbStatsContext.Provider value={{ stats, loading, error }}>
      {children}
    </AirbnbStatsContext.Provider>
  );
}

export function useGlobalAirbnbStats() {
  const context = useContext(AirbnbStatsContext);
  if (context === undefined) {
    throw new Error('useGlobalAirbnbStats must be used within an AirbnbStatsProvider');
  }
  return context;
}
