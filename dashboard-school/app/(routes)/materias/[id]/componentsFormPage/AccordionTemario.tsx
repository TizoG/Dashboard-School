'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/animate-ui/radix/accordion';
import { ButtonFormNota } from './ButtonFormNota';

type NotaExamen = {
    id: number;
    titulo: string;
    contenido: string | null;
    nota: number;
};

type Tema = {
    id: number;
    titulo: string;
    contenido: string | null;
    notasExamenes: NotaExamen[];
};
export const AccordionTemario = ({
    temas,
    usuarioId,
}: {
    temas: Tema[];
    usuarioId: string;
}) => {
    return (
        <Accordion type="single" collapsible>
            {temas.map((tema) => (
                <AccordionItem key={tema.id} value={tema.id.toString()}>
                    <AccordionTrigger>{tema.titulo}</AccordionTrigger>
                    <AccordionContent>
                        <p className="mb-2 text-gray-600">{tema.contenido}</p>
                        <ul className="mb-4">
                            {tema.notasExamenes.map((nota) => (
                                <li key={nota.id} className="mb-1">
                                    <strong>{nota.titulo}:</strong> {nota.nota}{' '}
                                    - {nota.contenido}
                                </li>
                            ))}
                        </ul>
                        <ButtonFormNota
                            temaId={tema.id}
                            usuarioId={usuarioId}
                        />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
