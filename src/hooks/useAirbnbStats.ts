import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface AirbnbStats {
  reviews: number;
  rating: number;
}

/**
 * Hook personalizado para obtener estadísticas actualizadas de un listado de Airbnb desde Supabase.
 * En caso de estar cargando o haber un error, cae de forma segura en las estadísticas por defecto especificadas.
 * 
 * @param listingId El identificador numérico de la habitación de Airbnb
 * @param fallbackStats Estadísticas por defecto en caso de error o carga en progreso
 */
export function useAirbnbStats(listingId: string, fallbackStats: AirbnbStats) {
  const [stats, setStats] = useState<AirbnbStats>(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const { data, error: sbError } = await supabase
          .from('airbnb_listings')
          .select('reviews_count, rating')
          .eq('id', listingId)
          .maybeSingle();

        if (sbError) {
          throw sbError;
        }

        if (data) {
          setStats({
            reviews: data.reviews_count,
            rating: Number(data.rating),
          });
        }
      } catch (err) {
        console.error(`[useAirbnbStats] Error obteniendo estadísticas de Airbnb (${listingId}):`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    }

    if (listingId) {
      fetchStats();
    }
  }, [listingId]);

  return { stats, loading, error };
}
