import React from 'react';
import BlogEditor from '@/components/blog/BlogEditor';

export const metadata = {
    title: 'Nuevo Artículo de Blog | Admin',
    description: 'Editor de contenido optimizado para SEO.',
};

export default function NewPostPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 font-primary">Panel de Administración de Blog</h1>
                    <p className="text-gray-500">Crea contenido de alta calidad que posicione en buscadores.</p>
                </div>
                <BlogEditor />
            </div>
        </main>
    );
}
