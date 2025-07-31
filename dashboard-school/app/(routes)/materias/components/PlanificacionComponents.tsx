'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

type PropsTareas = {
    id: number;
    titulo: string;
    descripcion: string;
    asignatura: string;
    tipo: string;
    estado: string;
    prioridad: string;
    fechaVencimiento: string;
};

export const PlanificacionComponents = () => {
    const [notas, setNotas] = useState<PropsTareas[]>([]);

    useEffect(() => {
        axios
            .get('/api/tareas')
            .then((res) => {
                console.log('Tareas recibidas:', res.data);
                setNotas(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Planificación</h2>
            <div className="mt-4 grid lg:grid-cols-[2fr_1fr] gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {notas.map((nota) => (
                        <div
                            key={nota.id}
                            className="flex justify-between items-center bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition relative"
                        >
                            <div className="flex gap-6 items-center">
                                <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-gray-900">
                                        {nota.titulo}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {nota.asignatura}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {nota.descripcion?.toLowerCase?.() ??
                                            ''}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {nota.fechaVencimiento}
                                    </p>
                                </div>
                            </div>
                            <span
                                className={`text-xs font-medium py-1 px-2 rounded-full absolute right-2 top-2 ${
                                    nota.prioridad?.toLowerCase?.() === 'alta'
                                        ? 'bg-red-500 text-white'
                                        : nota.prioridad?.toLowerCase?.() ===
                                          'media'
                                        ? 'bg-orange-200 text-white'
                                        : nota.prioridad?.toLowerCase?.() ===
                                          'baja'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-500 text-white'
                                }`}
                            >
                                {nota.prioridad?.toLowerCase?.() ?? ''}
                            </span>
                            <div>
                                <p className="text-xs font-medium text-gray-500">
                                    {nota.tipo?.toLowerCase?.() ?? ''}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
