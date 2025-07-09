'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/animate-ui/radix/accordion';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Tema = {
    id: number;
    titulo: string;
    contenido: string;
    enlace?: string;
};

export function ClientComponents({
    id,
    refreshSignal,
}: {
    id: string;
    refreshSignal: number; // cualquier valor que puedas cambiar para forzar refresh
}) {
    const [temario, setTemario] = useState<Tema[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTemario = async () => {
        setLoading(true);
        const res = await axios.get(`/api/temario?asignatura_id=${id}`);
        setTemario(res.data);
        setLoading(false);
    };
    const fetchNotas = async () => {
        setLoading(true);
        const res = await axios.get(`/api/notas?asignatura_id=${id}`);
        setTemario(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTemario();
        fetchNotas();
    }, [id, refreshSignal]);

    if (loading) return <div>Cargando temario...</div>;

    return (
        <Accordion type="single" collapsible>
            {temario.map((tema) => (
                <AccordionItem key={tema.id} value={tema.id.toString()}>
                    <AccordionTrigger>{tema.titulo}</AccordionTrigger>
                    <AccordionContent>{tema.contenido}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
