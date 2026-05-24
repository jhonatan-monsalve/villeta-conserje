/**
 * Cliente de Supabase para uso en componentes del lado del cliente.
 * Utiliza las variables de entorno públicas de Next.js.
 * La seguridad real se gestiona mediante las políticas RLS en la base de datos.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
    'Configúralas en .env.local para desarrollo local.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
