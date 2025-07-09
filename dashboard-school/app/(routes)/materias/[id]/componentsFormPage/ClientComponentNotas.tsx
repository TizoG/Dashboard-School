'use client';

import { Decimal } from '@/lib/generated/prisma/runtime/library';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Notas = {
    id: number;
    titulo: string;
    contenido: string;
    nota: number;
};

export function ClientComponents({
    id,
    refreshSignal,
}: {
    id: string;
    refreshSignal: number; // cualquier valor que puedas cambiar para forzar refresh
}) {
    const [temario, setTemario] = useState<Notas[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotas = async () => {
        setLoading(true);
        const res = await axios.get(`/api/notas?asignatura_id=${id}`);
        setTemario(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotas();
    }, [id, refreshSignal]);

    if (loading) return <div>Cargando temario...</div>;

    return (
        <ul className="mb-6">
            {temario.map((nota) => (
                <li key={nota.id}>
                    <strong>{nota.titulo}:</strong>
                    <strong>
                        {nota.nota} - {nota.contenido}
                    </strong>
                </li>
            ))}
        </ul>
    );
}
