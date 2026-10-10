-- ============================================================
-- SCRIPT DE INICIALIZACIÓN: Tabla profiles + RLS + Triggers
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- Proyecto: Villeta Conserje
-- ============================================================

-- 1. Crear la tabla de perfiles vinculada a auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'ninguno' CHECK (role IN ('propietaria', 'mantenimiento', 'aseo', 'ninguno')),
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'activo', 'suspendido')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Habilitar Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Función auxiliar para verificar si el usuario actual es propietaria.
--    Definida como SECURITY DEFINER para evitar recursión infinita en las políticas RLS.
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'propietaria'
  );
$$;

-- 4. Políticas de seguridad (RLS Policies)

-- 4a. Cualquier usuario autenticado puede leer su propio perfil
CREATE POLICY "Usuarios leen su propio perfil"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 4b. Los usuarios con rol 'propietaria' pueden leer TODOS los perfiles
CREATE POLICY "Propietaria lee todos los perfiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_owner());

-- 4c. Solo la propietaria puede actualizar role y status de cualquier perfil
CREATE POLICY "Propietaria actualiza perfiles"
  ON public.profiles
  FOR UPDATE
  USING (public.is_owner())
  WITH CHECK (public.is_owner());

-- 4d. Permitir INSERT para que el trigger pueda crear perfiles automáticamente
CREATE POLICY "Crear perfil en registro"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 5. Función trigger: crea un perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    'ninguno',
    'pendiente'
  );
  RETURN NEW;
END;
$$;

-- 6. Trigger que se ejecuta después de cada INSERT en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 7. Tabla para estadísticas de Airbnb (Auto-actualizable)
CREATE TABLE IF NOT EXISTS public.airbnb_listings (
  id TEXT PRIMARY KEY, -- ID del alojamiento de Airbnb (ej. '1402264507691687773')
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0.0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.airbnb_listings ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública para cualquier visitante de la web (incluso anónimos)
DROP POLICY IF EXISTS "Lectura pública de estadísticas de Airbnb" ON public.airbnb_listings;
CREATE POLICY "Lectura pública de estadísticas de Airbnb"
  ON public.airbnb_listings
  FOR SELECT
  USING (true);

-- Sembrar (Seed) las propiedades insignia "Casa Bambú" y "Casa Bellevue" si no existen
INSERT INTO public.airbnb_listings (id, name, url, reviews_count, rating)
VALUES 
(
  '1402264507691687773',
  'Casa Bambú',
  'https://www.airbnb.com.co/rooms/1402264507691687773',
  26,
  5.0
),
(
  '1787473188757920090',
  'Casa Bellevue',
  'https://www.airbnb.es/rooms/1787473188757920090',
  1,
  5.0
)
ON CONFLICT (id) DO NOTHING;

-- 8. Tabla para comentarios individuales de Airbnb
CREATE TABLE IF NOT EXISTS public.airbnb_reviews (
  id TEXT PRIMARY KEY, -- ID o Hash único de la reseña
  listing_id TEXT REFERENCES public.airbnb_listings(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT DEFAULT '',
  author_location TEXT DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  date_text TEXT DEFAULT '',
  airbnb_url TEXT NOT NULL DEFAULT 'https://www.airbnb.com.co/rooms/1402264507691687773',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS en airbnb_reviews
ALTER TABLE public.airbnb_reviews ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública de reseñas
DROP POLICY IF EXISTS "Lectura pública de reseñas de Airbnb" ON public.airbnb_reviews;
CREATE POLICY "Lectura pública de reseñas de Airbnb"
  ON public.airbnb_reviews
  FOR SELECT
  USING (true);

-- Sembrar reseñas iniciales reales de Casa Bambú
INSERT INTO public.airbnb_reviews (id, listing_id, author_name, author_avatar_url, author_location, rating, comment, date_text, airbnb_url)
VALUES 
(
  'rev_katherine',
  '1402264507691687773',
  'Katherine',
  '/images/testimonial-katherine.jpg',
  'Ginebra, Suiza',
  5,
  'Casa Bambu es un lugar muy especial. La casa está muy tranquila arrodeado por arboles y al lado del río. Yennifer era una anfitrión excelente, muy pendiente a todo lo que necesitaremos y también hizo todo lo posible para facilitar el trabajo de organizar un fin de semana con varias familias. Muchas gracias, esperamos volver pronto!!',
  'Hace 1 semana · Con niños',
  'https://www.airbnb.com.co/rooms/1402264507691687773'
),
(
  'rev_1',
  '1402264507691687773',
  'Andrea',
  '/images/testimonial-1.jpg',
  'Bogotá, Colombia',
  5,
  'Es un lugar increíble, la mejor opción para desconectarse del ruido y muy cerca del río, hace la experiencia aún más acogedora, espero volver en algún momento a este lugar soñado, tiene una atención al detalle única, Jennifer es increíblemente amable y fue muy fácil la comunicación ante cualquier duda respuestas al instante.',
  'Hace 2 semanas · En grupo',
  'https://www.airbnb.com.co/rooms/1402264507691687773'
),
(
  'rev_2',
  '1402264507691687773',
  'Deivy',
  '/images/testimonial-2.jpg',
  'Bogotá, Colombia',
  5,
  'Un lugar muy divino, todo impecable, súper equipada con excelente ambientación y un anfitrión súper amable... La verdad está en mi top 3 de lugar que volvería a visitar sin duda alguna.. Cabe destacar que la persona de la cocina muy limpia y cocina delicioso. Súper mega recomendados',
  'Hace 3 semanas · En grupo',
  'https://www.airbnb.com.co/rooms/1402264507691687773'
)
ON CONFLICT (id) DO NOTHING;


