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
export const CardTemas = ({
    temas,
    id,
    onNotasUpdated,
    asignaturaId,
}: {
    asignaturaId: number;
    id: string;
    temas: Tema[];
    onNotasUpdated: (notas: NotaExamen[]) => void;
}) => {
    const [checkedTemas, setCheckedTemas] = useState<{ [id: number]: boolean }>(
        {}
    );
    const [temasNotas, setTemasNotas] = useState<{
        [temaId: number]: NotaExamen[];
    }>({});
    const [localTemas, setTemas] = useState<Tema[]>(temas);

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

        const todasLasNotas = Object.values(notasPorTema).flat();
        onNotasUpdated(todasLasNotas);
    };

    useEffect(() => {
        const initialNotas: { [temaId: number]: NotaExamen[] } = {};
        temas.forEach((tema) => {
            initialNotas[tema.id] = tema.notasExamenes;
        });
        setTemasNotas(initialNotas);

        const todasLasNotasIniciales = temas.flatMap(
            (tema) => tema.notasExamenes
        );
        onNotasUpdated(todasLasNotasIniciales);

        fetchNotas();
        setTemas(temas);
    }, [temas]);

    const toggleCheckbox = (id: number) => {
        setCheckedTemas((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleNotaAdded = (temaId: number, nota: NotaExamen) => {
        setTemasNotas((prev) => {
            const updatedNotas = {
                ...prev,
                [temaId]: [...(prev[temaId] || []), nota],
            };
            return updatedNotas;
            // Comunicar la lista actualizada al padre
        });
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

    const handleDeleteTema = async (temaId: number) => {
        try {
            await axios.delete(`/api/temario/${temaId}`);
            // Puedes llamar al fetch original o filtrar localmente:
            setTemas((prev) => prev.filter((tema) => tema.id !== temaId));
            fetchNotas();
        } catch (error) {
            console.error('Error al eliminar el tema:', error);
        }
    };

    return (
        <>
            {localTemas.map((tema) => {
                const isChecked = checkedTemas[tema.id] || false;
                const notas = temasNotas[tema.id] || [];
                return (
                    <div key={tema.id} className="bg-white rounded-2xl ">
                        <div
                            className={`flex ${
                                isChecked ? 'bg-green-50' : 'bg-gray-50'
                            } p-4 rounded-t-2xl items-center gap-2`}
                        >
                            <Checkbox
                                id={tema.id.toString()}
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                    toggleCheckbox(tema.id)
                                }
                            />
                            <Label htmlFor={tema.id.toString()}></Label>
                            <div className="w-full flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        {tema.titulo}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {tema.contenido}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-end justify-center ">
                                    <ButtonFormNota
                                        temaId={tema.id}
                                        onNotaCreada={(nota) =>
                                            handleNotaAdded(tema.id, nota)
                                        }
                                        disable={isChecked}
                                    />
                                    <Button
                                        onClick={() =>
                                            handleDeleteTema(tema.id)
                                        }
                                        className="p-5 hover:text-gray-800 hover:cursor-pointer hover:bg-gray-100 flex items-center"
                                    >
                                        <Trash2 className="h-12 w-12" />
                                    </Button>
                                </div>
                            </div>
                        </div>
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
                                            className="border p-4 mb-2 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2 justify-between">
                                                <div className="flex items-center  gap-2">
                                                    {nota.nota === null ? (
                                                        <Clock8 className="h-5 w-5 text-amber-500" />
                                                    ) : (
                                                        <CircleCheckBig className="h-5 w-5 text-green-500" />
                                                    )}

                                                    <h4 className="font-semibold">
                                                        {nota.titulo}
                                                    </h4>
                                                    <Badge
                                                        className={`${
                                                            nota.tipo ===
                                                            'examen'
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
                                                </div>
                                                <div>
                                                    <ButtonEdit
                                                        notaId={nota.id}
                                                        onNotaEdit={
                                                            handleNotaEditada
                                                        }
                                                    />
                                                    <ButtomDelete
                                                        id={nota.id}
                                                        onDelete={fetchNotas}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">
                                                {nota.contenido}
                                            </p>
                                            <div className="mt-2 flex gap-4">
                                                <p className="text-sm">
                                                    Vence: {fechaFormateada}
                                                </p>
                                                {nota.nota !== null && (
                                                    <p className="text-sm text-blue-800 font-medium">
                                                        Nota: {nota.nota}
                                                    </p>
                                                )}
                                                {nota.archivoUrl !== '' && (
                                                    <a
                                                        href={
                                                            nota.archivoUrl ??
                                                            ''
                                                        }
                                                        className="text-sm text-blue-800 flex gap-1"
                                                    >
                                                        <SquareArrowOutUpRight className="h-4 w-4" />
                                                        Ver en Drive
                                                    </a>
                                                )}
                                            </div>
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
