'use client';
import { PutNote } from './components/PutNote';
import { DeleteNote } from './components/DeleteNote';
import { PostNote } from './components/postNote';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divide, FileText, StickyNote } from 'lucide-react';
import { toast } from 'sonner';
import { DEFAULT_MIN_VERSION } from 'tls';
import { Skeleton } from '@/components/ui/skeleton';

type NotasProps = {
    id: number;
    tipo: string;
    titulo: string;
    contenido: string;
    asignatura?: string; // Hacer opcional
    tema?: string; // Hacer opcional
    fechaCreacion: Date;
};

export default function Notas() {
    const [notas, setNotas] = useState<NotasProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarNotas();
    }, []);

    const cargarNotas = async () => {
        try {
            const { data } = await axios.get('/api/tipsNotas');
            setNotas(data);
            setLoading(false);
        } catch (error) {
            toast.error('Error al cargar las notas');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleActualizarNotas = async () => {
        try {
            const response = await axios.get('/api/tipsNotas');
            setNotas(response.data);
        } catch (error) {
            toast.error('Error al actualizar las notas');
            console.log(error);
        }
    };

    const renderNotas = () => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-4 bg-gray-100 rounded-2xl gap-4 animate-pulse"
                        >
                            <Skeleton className="h-4 w-2/3 bg-gray-200" />
                            <Skeleton className="h-3 w-full bg-gray-200" />
                            <Skeleton className="h-3 w-4/5 bg-gray-200" />
                            <div className="flex gap-2 mt-2">
                                <Skeleton className="h-8 w-8 bg-gray-200 rounded-md" />
                                <Skeleton className="h-4 w-1/2 bg-gray-200 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (notas.length === 0) {
            return (
                <div className="text-center py-16">
                    <div className="p-4 bg-amber-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <StickyNote className="text-amber-700" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">
                        No tienes notas aún.
                    </h3>
                    <p className="text-amber-600 mb-6">
                        Crea tu primera nota para empezar a organizar tus ideas.
                    </p>
                </div>
            );
        }
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {notas.map((nota) => (
                    <div
                        key={nota.id}
                        className="bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer rounded-lg border border-gray-300"
                    >
                        <div className="pb-3 flex p-4 gap-2 items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                                <FileText className="h-5 w-5 text-amber-600 mb-2" />
                                <p className="text-sm font-bold text-gray-700">
                                    {nota.titulo}
                                </p>
                            </div>
                            <div>
                                <PutNote
                                    nota={nota}
                                    onUpdate={handleActualizarNotas}
                                />
                                <DeleteNote
                                    id={nota.id}
                                    onDelete={handleActualizarNotas}
                                />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-sm text-gray-500">
                                {nota.tema} - {nota.asignatura}
                            </p>
                            <p className="text-gray-800 text-sm">
                                {nota.contenido}
                            </p>
                            <p className="text-[12px] text-amber-700 mb-2">
                                {nota.fechaCreacion
                                    ? new Date(
                                          nota.fechaCreacion
                                      ).toLocaleDateString()
                                    : ''}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="space-y-6 p-4 ">
            <div className="bg-gradient-to-r from-amber-200 to-yellow-200 rounded-lg p-6">
                <header className="flex justify-between items-center ">
                    <div className="flex gap-4 items-center justify-center">
                        <div>
                            <h1 className="text-3xl font-bold text-amber-800">
                                Mis Notas
                            </h1>
                            <p className="text-amber-700">
                                Organiza y gestiona tus apuntes de estudio
                            </p>
                            <p className="text-gray-600">
                                {notas.length}{' '}
                                {notas.length === 1 ? 'nota' : 'notas'}
                            </p>
                        </div>
                    </div>

                    <PostNote
                        onNotaCreada={handleActualizarNotas}
                        titulo="Crear nueva nota"
                    />
                </header>
            </div>

            {renderNotas()}
        </section>
    );
}
