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
