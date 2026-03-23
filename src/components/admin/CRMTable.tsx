'use client';

import React, { useState } from 'react';
import { FaUserTag, FaComments, FaSearch, FaPhoneAlt, FaHome, FaHotel, FaPlus, FaStickyNote } from 'react-icons/fa';

export type LeadType = 'owner' | 'guest';
export type LeadStatus = 'new' | 'contacted' | 'negotiation' | 'converted' | 'lost';

export interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    type: LeadType;
    status: LeadStatus;
    source: string; // 'web_form', 'whatsapp', 'referral'
    date: string;
    notes: string[];
    propertyInterest?: string; // For guests: which property? For owners: location/size?
}

// Mock Data
const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        name: 'Carlos Rodríguez',
        phone: '+57 310 123 4567',
        email: 'carlos@example.com',
        type: 'owner',
        status: 'new',
        source: 'web_form',
        date: '2024-05-15',
        notes: ['Tiene una finca en Payandé con piscina grande.', 'Interesado en gestión completa.'],
        propertyInterest: 'Finca Campestre Payandé'
    },
    {
        id: '2',
        name: 'Andrea Gómez',
        phone: '+57 320 987 6543',
        email: 'andrea@gmail.com',
        type: 'guest',
        status: 'contacted',
        source: 'web_form',
        date: '2024-05-14',
        notes: ['Busca casa para 12 personas en puente de junio.'],
        propertyInterest: 'Casa El Manantial'
    },
    {
        id: '3',
        name: 'Roberto Martinez',
        phone: '+57 300 555 8888',
        email: 'beto@outlook.com',
        type: 'owner',
        status: 'negotiation',
        source: 'whatsapp',
        date: '2024-05-10',
        notes: ['Quiere cita presencial para ver el estado de su propiedad.'],
        propertyInterest: 'Chalet en Villeta Centro'
    }
];

export default function CRMTable() {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [filterType, setFilterType] = useState<'all' | LeadType>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [newNote, setNewNote] = useState('');

    // Filtering Logic
    const filteredLeads = leads.filter(lead => {
        const matchesType = filterType === 'all' || lead.type === filterType;
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleStatusChange = (id: string, newStatus: LeadStatus) => {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    const handleAddNote = () => {
        if (!selectedLead || !newNote.trim()) return;
        const updatedNotes = [...selectedLead.notes, newNote];

        // Update local state and list
        const updatedLead = { ...selectedLead, notes: updatedNotes };
        setSelectedLead(updatedLead);
        setLeads(leads.map(l => l.id === selectedLead.id ? updatedLead : l));
        setNewNote('');
    };

    const statusColors: Record<LeadStatus, string> = {
        new: 'bg-blue-100 text-blue-800 border-blue-200',
        contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        negotiation: 'bg-purple-100 text-purple-800 border-purple-200',
        converted: 'bg-green-100 text-green-800 border-green-200',
        lost: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    const statusLabels: Record<LeadStatus, string> = {
        new: 'Nuevo',
        contacted: 'Contactado',
        negotiation: 'En Negociación',
        converted: 'Cliente Cerrado',
        lost: 'Perdido'
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 font-secondary flex flex-col md:flex-row h-[600px]">

            {/* Left List Panel */}
            <div className={`${selectedLead ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-2/3 border-r border-gray-200`}>
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <div className="relative w-full sm:w-64">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, tel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="flex bg-white rounded-md shadow-sm">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-l-md border ${filterType === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilterType('owner')}
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium border-t border-b ${filterType === 'owner' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FaHome /> Propietarios
                        </button>
                        <button
                            onClick={() => setFilterType('guest')}
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-r-md border ${filterType === 'guest' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FaHotel /> Huéspedes
                        </button>
                    </div>
                </div>

                {/* Table/List */}
                <div className="overflow-y-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLeads.map((lead) => (
                                <tr
                                    key={lead.id}
                                    onClick={() => setSelectedLead(lead)}
                                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${selectedLead?.id === lead.id ? 'bg-yellow-50' : ''}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                <div className="text-xs text-gray-500">{lead.phone}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.type === 'owner' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {lead.type === 'owner' ? <><FaHome className="mr-1" /> Propietario</> : <><FaHotel className="mr-1" /> Huésped</>}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={lead.status}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                            className={`text-xs font-semibold rounded-full px-2 py-1 border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400 cursor-pointer ${statusColors[lead.status]}`}
                                        >
                                            {Object.entries(statusLabels).map(([key, label]) => (
                                                <option key={key} value={key}>{label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                        {lead.date}
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                        No se encontraron clientes con los filtros actuales.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Details Panel */}
            <div className={`${selectedLead ? 'flex' : 'hidden md:flex'} flex-col w-full md:w-1/3 bg-gray-50`}>
                {selectedLead ? (
                    <>
                        <div className="p-6 border-b border-gray-200 bg-white">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold font-primary text-gray-800">{selectedLead.name}</h2>
                                <button onClick={() => setSelectedLead(null)} className="md:hidden text-gray-400 hover:text-gray-600">Close</button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaPhoneAlt className="text-gray-400" />
                                    <a href={`tel:${selectedLead.phone}`} className="hover:text-yellow-600">{selectedLead.phone}</a>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold text-xs uppercase text-gray-400 w-16">Email:</span>
                                    <span>{selectedLead.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold text-xs uppercase text-gray-400 w-16">Interés:</span>
                                    <span className="font-medium text-gray-800">{selectedLead.propertyInterest || 'General'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FaStickyNote className="text-yellow-500" /> Notas de Seguimiento
                            </h3>

                            <div className="space-y-4 mb-6">
                                {selectedLead.notes.length === 0 ? (
                                    <p className="text-sm text-gray-400 italic">No hay notas registradas.</p>
                                ) : (
                                    selectedLead.notes.map((note, idx) => (
                                        <div key={idx} className="bg-white p-3 rounded shadow-sm border border-gray-100 text-sm text-gray-600">
                                            {note}
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-4">
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Añadir nota interna..."
                                    className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm"
                                    rows={3}
                                />
                                <button
                                    onClick={handleAddNote}
                                    disabled={!newNote.trim()}
                                    className="mt-2 w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <FaPlus size={12} /> Añadir Nota
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                        <FaUserTag size={48} className="mb-4 text-gray-300" />
                        <p>Selecciona un cliente de la lista para ver sus detalles y gestionar notas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
