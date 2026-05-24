/**
 * Tipos de autenticación y control de acceso para Villeta Conserje.
 * Define la estructura de roles, estados y perfiles de usuario
 * vinculados con la tabla `profiles` de Supabase.
 */

/** Roles disponibles en el sistema. El valor por defecto al registrarse es 'ninguno'. */
export type UserRole = 'propietaria' | 'mantenimiento' | 'aseo' | 'ninguno';

/** Estado del usuario en el flujo de aprobación manual. */
export type UserStatus = 'pendiente' | 'activo' | 'suspendido';

/** Perfil de usuario vinculado a auth.users de Supabase. */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}
