'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaSave, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa';

type BlockType = 'h2' | 'h3' | 'paragraph';

interface ContentBlock {
    id: string;
    type: BlockType;
    content: string;
}

type SearchIntent = 'informational' | 'transactional';
type PostStatus = 'draft' | 'published';

export default function BlogEditor() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [searchIntent, setSearchIntent] = useState<SearchIntent>('informational');
    const [status, setStatus] = useState<PostStatus>('draft');
    const [scheduledDate, setScheduledDate] = useState('');

    const [blocks, setBlocks] = useState<ContentBlock[]>([
        { id: '1', type: 'h2', content: '' },
        { id: '2', type: 'paragraph', content: '' }
    ]);
    const [errors, setErrors] = useState<string[]>([]);
    const [isSaved, setIsSaved] = useState(false);

    // Auto-generate block ID
    const generateId = () => Math.random().toString(36).substr(2, 9);

    // Auto-generate Slug from Title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        // Auto-generate slug if user hasn't heavily customized it (simple heuristic: empty or matches old title pattern)
        // For simplicity, we'll always suggest a slug based on title until manually edited. 
        // A better approach in production might be to track if slug was manually edited.
        const suggestedSlug = newTitle
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
            .replace(/[^a-z0-9]+/g, '-') // non-alphanum to hyphens
            .replace(/^-+|-+$/g, ''); // trim hyphens

        setSlug(suggestedSlug);
    };

    const addBlock = (type: BlockType) => {
        setBlocks([...blocks, { id: generateId(), type, content: '' }]);
    };

    const updateBlock = (id: string, content: string) => {
        setBlocks(blocks.map(block => block.id === id ? { ...block, content } : block));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(block => block.id !== id));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) return;
        const newBlocks = [...blocks];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
        setBlocks(newBlocks);
    };

    const validate = () => {
        const newErrors: string[] = [];

        // Validate H1
        if (!title.trim()) newErrors.push("El título H1 es obligatorio.");
        if (!slug.trim()) newErrors.push("El slug (URL) es obligatorio.");

        // Validate Meta Description
        if (!metaDescription.trim()) newErrors.push("La meta-descripción es obligatoria.");
        if (metaDescription.length > 160) newErrors.push("La meta-descripción no debe exceder los 160 caracteres.");

        // Validate Structure (at least 2 H2s)
        const h2Count = blocks.filter(b => b.type === 'h2').length;
        if (h2Count < 2) {
            newErrors.push(`Se requieren al menos 2 subtítulos H2 para una buena estructura SEO. (Actual: ${h2Count})`);
        }

        // Validate Empty Blocks
        const emptyBlocks = blocks.some(b => !b.content.trim());
        if (emptyBlocks) newErrors.push("Hay bloques de contenido vacíos.");

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            // Mock API payload
            const payload = {
                title,
                slug,
                metaDescription,
                searchIntent,
                status,
                scheduledDate: status === 'published' ? scheduledDate || new Date().toISOString() : null,
                content: blocks
            };

            console.log("PAYLOAD TO SAVE:", payload);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
            alert("¡Artículo validado! Revisa la consola para ver los datos de programación.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10 border border-gray-100 font-secondary">
            <div className="mb-8 border-b pb-4">
                <h2 className="text-2xl font-primary text-gray-800 mb-2">Editor de Blog SEO</h2>
                <p className="text-sm text-gray-500">Crea contenido optimizado siguiendo las mejores prácticas.</p>
            </div>

            {/* Basic Info: H1 & Slug */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Título Principal (H1) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Escribe el título principal del artículo..."
                        className="w-full p-4 text-xl font-primary text-gray-800 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-400 mt-1">Solo se permite un H1 por página.</p>
                </div>

                {/* Slug Editor */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">
                        URL Permanente (Slug)
                    </label>
                    <div className="flex items-center text-sm text-gray-500 bg-white border border-gray-200 rounded px-3 py-2">
                        <span className="mr-1 text-gray-400">/blog/</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                            className="flex-1 text-gray-700 border-none p-0 focus:ring-0 text-sm font-secondary"
                            placeholder="titulo-del-articulo-seo"
                        />
                    </div>
                    <p className="text-xs text-blue-400 mt-1">Edita para crear una URL corta y amigable (ej: /blog/villeta-turismo).</p>
                </div>
            </div>

            {/* Meta Description & Search Intent */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Meta Descripción <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            maxLength={160}
                            rows={3}
                            placeholder="Resumen atractivo para buscadores..."
                            className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${metaDescription.length > 150 ? 'border-orange-300' : 'border-gray-200 focus:border-yellow-500'
                                }`}
                        />
                        <div className={`absolute bottom-2 right-2 text-xs font-bold ${metaDescription.length >= 160 ? 'text-red-500' :
                                metaDescription.length >= 140 ? 'text-orange-500' : 'text-gray-400'
                            }`}>
                            {metaDescription.length}/160
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Intención de Búsqueda
                    </label>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setSearchIntent('informational')}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${searchIntent === 'informational'
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                        >
                            <span className="font-bold block text-sm">Informativa</span>
                            <span className="text-xs">Educar o resolver dudas.</span>
                        </button>
                        <button
                            onClick={() => setSearchIntent('transactional')}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${searchIntent === 'transactional'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                        >
                            <span className="font-bold block text-sm">Transaccional</span>
                            <span className="text-xs">Vender o reservar.</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scheduling and Status */}
            <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                    <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
                        Estado
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded border border-yellow-200 hover:bg-yellow-100 transition">
                            <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={status === 'draft'}
                                onChange={(e) => setStatus(e.target.value as 'draft')}
                                className="text-yellow-600 focus:ring-yellow-500"
                            />
                            <span className="text-yellow-900 font-medium">Borrador</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded border border-yellow-200 hover:bg-yellow-100 transition">
                            <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={status === 'published'}
                                onChange={(e) => setStatus(e.target.value as 'published')}
                                className="text-green-600 focus:ring-green-500"
                            />
                            <span className="text-green-900 font-medium">Publicado</span>
                        </label>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <FaCalendarAlt /> Fecha de Publicación
                    </label>
                    <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full p-2 border border-yellow-200 rounded-md bg-white text-gray-700 focus:border-yellow-500 focus:ring-0"
                    />
                    <p className="text-xs text-yellow-600 mt-1">
                        {status === 'published' ? 'Si la fecha es futura, se programará automáticamente.' : 'Solo activo si el estado es Publicado.'}
                    </p>
                </div>
            </div>

            {/* Content Editor */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Contenido del Artículo
                    </label>
                    <div className="flex gap-2">
                        <button onClick={() => addBlock('h2')} className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors font-semibold">
                            <FaPlus size={10} /> H2
                        </button>
                        <button onClick={() => addBlock('h3')} className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors font-semibold">
                            <FaPlus size={10} /> H3
                        </button>
                        <button onClick={() => addBlock('paragraph')} className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors font-semibold">
                            <FaPlus size={10} /> Párrafo
                        </button>
                    </div>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[300px]">
                    {blocks.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            Añade bloques de contenido usando los botones de arriba.
                        </div>
                    )}

                    {blocks.map((block, index) => (
                        <div key={block.id} className="group relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="absolute top-2 right-2 flex gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-blue-500 disabled:opacity-30">
                                    <FaArrowUp />
                                </button>
                                <button onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="p-1 text-gray-400 hover:text-blue-500 disabled:opacity-30">
                                    <FaArrowDown />
                                </button>
                                <button onClick={() => removeBlock(block.id)} className="p-1 text-gray-400 hover:text-red-500 ml-2">
                                    <FaTrash />
                                </button>
                            </div>

                            <div className="pr-12">
                                {block.type === 'h2' && (
                                    <div>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-1 inline-block">H2 - Sección Principal</span>
                                        <input
                                            type="text"
                                            value={block.content}
                                            onChange={(e) => updateBlock(block.id, e.target.value)}
                                            placeholder="Título de la sección..."
                                            className="w-full text-xl font-primary font-bold text-gray-800 border-none p-0 focus:ring-0 placeholder-gray-300"
                                        />
                                    </div>
                                )}
                                {block.type === 'h3' && (
                                    <div>
                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-1 inline-block">H3 - Subsección</span>
                                        <input
                                            type="text"
                                            value={block.content}
                                            onChange={(e) => updateBlock(block.id, e.target.value)}
                                            placeholder="Título de la subsección..."
                                            className="w-full text-lg font-primary font-semibold text-gray-700 border-none p-0 focus:ring-0 placeholder-gray-300"
                                        />
                                    </div>
                                )}
                                {block.type === 'paragraph' && (
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded mb-1 inline-block">Párrafo de Texto</span>
                                        <textarea
                                            value={block.content}
                                            onChange={(e) => updateBlock(block.id, e.target.value)}
                                            placeholder="Escribe el contenido del párrafo aquí..."
                                            rows={3}
                                            className="w-full text-base text-gray-600 border-none p-0 focus:ring-0 resize-y placeholder-gray-300 bg-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">
                    Estructura actual: {blocks.filter(b => b.type === 'h2').length} H2, {blocks.filter(b => b.type === 'h3').length} H3, {blocks.filter(b => b.type === 'paragraph').length} Párrafos.
                </p>
            </div>

            {/* Errors & Actions */}
            {errors.length > 0 && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                        <FaExclamationTriangle />
                        <span>Atención: Correcciones necesarias para SEO</span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                        {errors.map((err, i) => <li key={i}>{err}</li>)}
                    </ul>
                </div>
            )}

            <div className="flex justify-end gap-4 border-t pt-6">
                <button className="px-6 py-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors">
                    Cancelar
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#C9A961] hover:bg-[#b09355] text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-yellow-100 transition-all transform hover:-translate-y-1"
                >
                    <FaSave />
                    {isSaved ? '¡Guardado!' : 'Guardar y Publicar'}
                </button>
            </div>
        </div>
    );
}
