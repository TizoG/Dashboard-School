import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { ButtonFormNota } from './ButtonFormNota';
import axios from 'axios';
import {
    CircleCheckBig,
    Clock8,
    SquareArrowOutUpRight,
    SquarePen,
    Trash2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { parseISO, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ButtonEdit } from './ButtonEdit';
import { ButtomDelete } from './ButtonDeleted';

type NotaExamen = {
    id: number;
    titulo: string;
    contenido: string | null;
    nota: number | null;
    archivoUrl: string | null;
    fechaVencimiento: string | null;
    tipo: string | null;
    tema_id: number;
};

type Tema = {
    id: number;
    titulo: string;
    contenido: string | null;
    notasExamenes: NotaExamen[];
};
export const CardResumenNotas = ({
    temas,
    id,
}: {
    id: string;
    temas: Tema[];
}) => {
    const [checkedTemas, setCheckedTemas] = useState<{ [id: number]: boolean }>(
        {}
    );
    const [temasNotas, setTemasNotas] = useState<{
        [temaId: number]: NotaExamen[];
    }>({});

    const fetchNotas = async () => {
        // Obtener todas las notas por tema, pero ahora solo con tema_id no sirve para todos temas juntos,
        // tendrías que hacer varias llamadas o crear un endpoint que devuelva todas las notas de todos los temas.

        // Aquí te propongo hacer un fetch para cada tema (podrías optimizar en backend)
        const notasPorTema: { [temaId: number]: NotaExamen[] } = {};

        await Promise.all(
            temas.map(async (tema) => {
                const res = await axios.get(`/api/notas?tema_id=${tema.id}`);
                notasPorTema[tema.id] = res.data;
            })
        );

        setTemasNotas(notasPorTema);
    };

    useEffect(() => {
        const initialNotas: { [temaId: number]: NotaExamen[] } = {};
        temas.forEach((tema) => {
            initialNotas[tema.id] = tema.notasExamenes;
        });
        setTemasNotas(initialNotas);

        fetchNotas();
    }, [temas]);

    const toggleCheckbox = (id: number) => {
        setCheckedTemas((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleNotaAdded = (temaId: number, nota: NotaExamen) => {
        setTemasNotas((prev) => ({
            ...prev,
            [temaId]: [...(prev[temaId] || []), nota],
        }));
    };

    const handleNotaEditada = (notaEditada: NotaExamen) => {
        setTemasNotas((prev) => {
            const temaId = notaEditada.tema_id;
            const notas = prev[temaId] || [];
            // Reemplazar la nota con id igual al editado
            const nuevasNotas = notas.map((nota) =>
                nota.id === notaEditada.id ? notaEditada : nota
            );
            return {
                ...prev,
                [temaId]: nuevasNotas,
            };
        });
    };

    return (
        <>
            {temas.map((tema) => {
                const notas = temasNotas[tema.id] || [];
                return (
                    <div
                        key={tema.id}
                        className="mb-4 bg-white rounded-lg  border-2 border-gray-300 p-4"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">
                            Resumen de Clasificacion
                        </h3>
                        {notas.length > 0 && (
                            <div className="p-4">
                                {notas.map((nota) => {
                                    // Formatear la fecha al formato "YYYY-MM-01"

                                    // ...

                                    const fechaFormateada =
                                        nota.fechaVencimiento
                                            ? format(
                                                  parseISO(
                                                      nota.fechaVencimiento
                                                  ),
                                                  'yyyy-MM-dd'
                                              )
                                            : 'Sin fecha';

                                    return (
                                        <div
                                            key={nota.id}
                                            className="px-4 py-2 bg-gray-100 rounded-lg mb-2 flex justify-between items-center"
                                        >
                                            <div className="flex gap-2">
                                                <Badge
                                                    className={`${
                                                        nota.tipo === 'examen'
                                                            ? 'bg-red-100 text-red-700'
                                                            : nota.tipo ===
                                                              'tarea'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : nota.tipo ===
                                                              'actividad'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    } `}
                                                >
                                                    {nota.tipo}
                                                </Badge>
                                                <h3 className="font-semibold text-gray-800">
                                                    {nota.titulo}
                                                </h3>
                                            </div>
                                            {nota.archivoUrl && (
                                                <a
                                                    href={nota.archivoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline flex gap-2 items-center font-semibold"
                                                >
                                                    {nota.nota}
                                                    <SquareArrowOutUpRight className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};
