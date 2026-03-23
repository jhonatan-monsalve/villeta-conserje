export type UserRole = 'admin' | 'owner';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    propertyId?: string; // Only for owners
}

// Mock User Data for Simulation
export const MOCK_USERS: Record<string, User> = {
    admin: {
        id: 'admin_1',
        name: 'Administrador',
        email: 'admin@villetaconserje.com',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=1B4D3E&color=fff'
    },
    owner: {
        id: 'owner_1',
        name: 'Propietario Demo',
        email: 'propietario@test.com',
        role: 'owner',
        propertyId: 'prop_123',
        avatar: 'https://ui-avatars.com/api/?name=Owner&background=C9A961&color=fff'
    }
};

export function checkPermission(user: User, resource: 'blog' | 'crm' | 'metrics' | 'own_stats'): boolean {
    if (user.role === 'admin') return true; // Admin has access to everything

    // Owner permissions
    if (user.role === 'owner') {
        return resource === 'own_stats';
    }

    return false;
}
