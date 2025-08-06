import React, { useState, useEffect } from 'react';

type TareasProps = {
    id: number;
    titulo: string;
    descripcion: string;
    asignatura: string;
    tipo: string;
    estado: string;
    prioridad: string;
    fechaVencimiento: string;
};

type CardTareasProps = {
    titulo: string;
    tareas: TareasProps[];
    procesarTareas: (tareas: TareasProps[]) => TareasProps[];
    icon?: React.ReactNode;
    color?: string;
};
export const CardTareas = ({
    tareas,
    titulo,
    icon,
    color,
    procesarTareas,
}: CardTareasProps) => {
    const tareasProcesadas = procesarTareas(tareas);
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between border border-gray-300">
            <div>
                <p className="text-sm">{titulo}</p>
                <p className="text-2xl font-semibold">
                    {tareasProcesadas.length}
                </p>
            </div>

            {icon && <div className={`text-3xl mb-2 ${color}`}>{icon}</div>}
        </div>
    );
};
