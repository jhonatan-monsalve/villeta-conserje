import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  image: string;
  rating: number;
  quote: string;
  meta: string;
  airbnbUrl: string;
}

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev_1',
    author: 'Andrea',
    location: 'Bogotá, Colombia',
    image: '/images/testimonial-1.jpg',
    rating: 5,
    quote: 'Es un lugar increíble, la mejor opción para desconectarse del ruido y muy cerca del río, hace la experiencia aún más acogedora, espero volver en algún momento a este lugar soñado, tiene una atención al detalle única, Jennifer es increíblemente amable y fue muy fácil la comunicación ante cualquier duda respuestas al instante.',
    meta: 'Hace 2 semanas · En grupo',
    airbnbUrl: 'https://www.airbnb.com.co/rooms/1402264507691687773'
  },
  {
    id: 'rev_2',
    author: 'Deivy',
    location: 'Bogotá, Colombia',
    image: '/images/testimonial-2.jpg',
    rating: 5,
    quote: 'Un lugar muy divino, todo impecable, súper equipada con excelente ambientación y un anfitrión súper amable... La verdad está en mi top 3 de lugar que volvería a visitar sin duda alguna.. Cabe destacar que la persona de la cocina muy limpia y cocina delicioso. Súper mega recomendados',
    meta: 'Hace 2 semanas · En grupo',
    airbnbUrl: 'https://www.airbnb.com.co/rooms/1402264507691687773'
  },
  {
    id: 'rev_3',
    author: 'Karen',
    location: 'Bogotá, Colombia',
    image: '/images/testimonial-3.jpg',
    rating: 5,
    quote: 'Es una casa hermosa, decorada con el mejor gusto, en un sitio inmejorable en medio de la naturaleza. Ideal para cualquier plan desde el descanso y la desconexión hasta la diversión con familia o amigos. El servicio de Yenifer es impecable, personalizado y lleno de detalles.',
    meta: 'noviembre de 2025 · Con niños',
    airbnbUrl: 'https://www.airbnb.com.co/rooms/1402264507691687773'
  }
];

export function useAirbnbReviews(listingId: string = '1402264507691687773') {
  const [reviews, setReviews] = useState<ReviewItem[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('airbnb_reviews')
          .select('*')
          .eq('listing_id', listingId)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const mapped: ReviewItem[] = data.map((item) => ({
            id: item.id,
            author: item.author_name || 'Huésped de Airbnb',
            location: item.author_location || 'Colombia',
            image: item.author_avatar_url || '/images/testimonial-1.jpg',
            rating: item.rating || 5,
            quote: item.comment,
            meta: item.date_text || 'Reseña verificada en Airbnb',
            airbnbUrl: item.airbnb_url || 'https://www.airbnb.com.co/rooms/1402264507691687773'
          }));
          setReviews(mapped);
        }
      } catch (err) {
        console.warn('[useAirbnbReviews] Caimos en el fallback de reseñas:', err);
      } finally {
        setLoading(false);
      }
    }

    if (listingId) {
      fetchReviews();
    }
  }, [listingId]);

  return { reviews, loading };
}
