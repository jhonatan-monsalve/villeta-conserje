'use client';

import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaUserShield } from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import type { UserProfile, UserRole, UserStatus } from '@/types/auth';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setUsers(data as UserProfile[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateUser = async (userId: string, newRole: UserRole, newStatus: UserStatus) => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole, status: newStatus })
            .eq('id', userId);

        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            // Update local state
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? { ...u, role: newRole, status: newStatus } : u))
            );
        }
    };

    const pendingUsers = users.filter((u) => u.status === 'pendiente');
    const activeUsers = users.filter((u) => u.status === 'activo');
    const suspendedUsers = users.filter((u) => u.status === 'suspendido');

    return (
        <ProtectedRoute requiredRole="propietaria">
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <FaUserShield className="text-[#1B4D3E]" />
                                Gestión de Usuarios
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Administra el acceso y los roles de la plataforma Villeta Conserje.
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-[#1B4D3E] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            
                            {/* Pendientes Section */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                    Usuarios Pendientes de Aprobación ({pendingUsers.length})
                                </h2>
                                
                                {pendingUsers.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        No hay usuarios pendientes de aprobación.
                                    </p>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm whitespace-nowrap">
                                                <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                                                    <tr>
                                                        <th className="px-6 py-4">Nombre / Email</th>
                                                        <th className="px-6 py-4">Fecha Registro</th>
                                                        <th className="px-6 py-4">Asignar Rol</th>
                                                        <th className="px-6 py-4 text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {pendingUsers.map((user) => (
                                                        <UserRow 
                                                            key={user.id} 
                                                            user={user} 
                                                            onUpdate={handleUpdateUser} 
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Activos Section */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    Usuarios Activos ({activeUsers.length})
                                </h2>
                                
                                {activeUsers.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        No hay usuarios activos.
                                    </p>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm whitespace-nowrap">
                                                <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                                                    <tr>
                                                        <th className="px-6 py-4">Nombre / Email</th>
                                                        <th className="px-6 py-4">Fecha Registro</th>
                                                        <th className="px-6 py-4">Rol</th>
                                                        <th className="px-6 py-4 text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {activeUsers.map((user) => (
                                                        <UserRow 
                                                            key={user.id} 
                                                            user={user} 
                                                            onUpdate={handleUpdateUser} 
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </section>
                            
                            {/* Suspendidos Section */}
                            {suspendedUsers.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        Usuarios Suspendidos ({suspendedUsers.length})
                                    </h2>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden opacity-75">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm whitespace-nowrap">
                                                <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                                                    <tr>
                                                        <th className="px-6 py-4">Nombre / Email</th>
                                                        <th className="px-6 py-4">Fecha Registro</th>
                                                        <th className="px-6 py-4">Rol</th>
                                                        <th className="px-6 py-4 text-center">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {suspendedUsers.map((user) => (
                                                        <UserRow 
                                                            key={user.id} 
                                                            user={user} 
                                                            onUpdate={handleUpdateUser} 
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}

// ── Componente de Fila de Tabla ──────────────────────────────────────────

function UserRow({ user, onUpdate }: { user: UserProfile, onUpdate: (id: string, role: UserRole, status: UserStatus) => void }) {
    const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleApprove = async () => {
        setIsUpdating(true);
        await onUpdate(user.id, selectedRole, 'activo');
        setIsUpdating(false);
    };

    const handleSuspend = async () => {
        if (!confirm('¿Estás seguro de suspender este usuario?')) return;
        setIsUpdating(true);
        await onUpdate(user.id, selectedRole, 'suspendido');
        setIsUpdating(false);
    };

    const handleReactivate = async () => {
        setIsUpdating(true);
        await onUpdate(user.id, selectedRole, 'activo');
        setIsUpdating(false);
    };

    const handleChangeRole = async (newRole: UserRole) => {
        setSelectedRole(newRole);
        if (user.status === 'activo') {
            setIsUpdating(true);
            await onUpdate(user.id, newRole, user.status);
            setIsUpdating(false);
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{user.full_name || 'Sin nombre'}</div>
                <div className="text-gray-500 text-xs">{user.email}</div>
            </td>
            <td className="px-6 py-4 text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <select
                    value={selectedRole}
                    onChange={(e) => handleChangeRole(e.target.value as UserRole)}
                    disabled={isUpdating || user.status === 'suspendido'}
                    className="block w-full text-sm rounded-lg border-gray-300 shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] bg-gray-50 py-2 px-3"
                >
                    <option value="ninguno">Ninguno</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="aseo">Aseo</option>
                    <option value="propietaria">Propietaria</option>
                </select>
            </td>
            <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    {user.status === 'pendiente' && (
                        <>
                            <button
                                onClick={handleApprove}
                                disabled={isUpdating}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors"
                            >
                                <FaCheck /> Aprobar
                            </button>
                            <button
                                onClick={handleSuspend}
                                disabled={isUpdating}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-lg transition-colors"
                            >
                                <FaTimes /> Rechazar
                            </button>
                        </>
                    )}
                    
                    {user.status === 'activo' && (
                        <button
                            onClick={handleSuspend}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-lg transition-colors"
                        >
                            Suspender
                        </button>
                    )}

                    {user.status === 'suspendido' && (
                        <button
                            onClick={handleReactivate}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-lg transition-colors"
                        >
                            Reactivar
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}
