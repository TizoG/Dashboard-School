'use client';

import { useState } from 'react';

import { ButtonForm } from './ButtonForm';
import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
import { ClientComponents } from './ClientComponents';
import { Decimal } from '@/lib/generated/prisma/runtime/library';
import { Button } from '@headlessui/react';
import { ButtonFormNota } from './ButtonFormNota';
import { AccordionTemario } from './AccordionTemario';

type Asignatura = {
    id: number;
    nombre: string;
    descripcion: string | null;
    usuario_id: string;
    temario: Tema[];
};

type NotaExamen = {
    id: number;
    titulo: string;
    contenido: string | null;
    nota: number; // depende del tipo, aquí usas toString(), así que puede ser number o string
};
type Tema = {
    id: number;
    titulo: string;
    contenido: string | null;
    notasExamenes: NotaExamen[];
};

export default function MateriaPageClient({
    asignatura,
}: {
    asignatura: Asignatura;
}) {
    const [refresh, setRefresh] = useState(0); // Para forzar recarga del temario

    return (
        <section className="p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold mb-4">{asignatura.nombre}</h1>
                <div className="flex gap-4">
                    <ButtonForm
                        asignaturaId={asignatura.id}
                        onTemaCreado={() => setRefresh((r) => r + 1)}
                    />
                </div>
            </div>

            <p className="text-gray-600 mb-6">{asignatura.descripcion}</p>

            <h2 className="text-2xl font-semibold mb-2">Temario</h2>
            <AccordionTemario
                temas={asignatura.temario}
                usuarioId={asignatura.usuario_id}
            />
        </section>
    );
}
