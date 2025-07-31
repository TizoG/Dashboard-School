'use client';

import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
import {
    Dialog,
    DialogBackdrop,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogTitle,
} from '@/components/animate-ui/headless/dialog';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Asignatura = {
    id: number;
    nombre: string;
    descripcion: string;

    color: string;
    profesor: string;
    creditos: number;
    clasificacion: number;
    semestre: string;
};

type Props = {
    onUpdate?: () => void;
};

export function ButtomEdit({
    asignatura,
    onUpdate,
}: {
    asignatura: Asignatura;
    onUpdate?: (Props: Asignatura) => void;
}) {
    const [Open, setOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [color, setColor] = useState('#A78BFA');
    const [profesor, setProfesor] = useState('');
    const [creditos, setCreditos] = useState(0);
    const [clasificacion, setClasificacion] = useState(0);
    const [semestre, setSemestre] = useState('');

    useEffect(() => {
        if (asignatura) {
            setNombre(asignatura.nombre);
            setDescripcion(asignatura.descripcion);
            setColor(asignatura.color);
            setProfesor(asignatura.profesor);
            setCreditos(asignatura.creditos);
            setClasificacion(asignatura.clasificacion);
            setSemestre(asignatura.semestre);
        }
    }, [asignatura]);

    const handleSubmit = async () => {
        try {
            const response = await axios.put(
                `/api/asignaturas/${asignatura.id}`,
                {
                    nombre,
                    descripcion,
                    color,
                    profesor,
                    creditos,
                    clasificacion,
                    semestre,
                }
            );

            toast.success('Asignatura actualizada');
            onUpdate?.(response.data);
            console.log('Asignatura actualizada: ', response.data);
            // No hemos introducido el onAdd
            setNombre('');
            setDescripcion('');
            setColor('#A78BFA');
            setProfesor('');
            setCreditos(0);
            setClasificacion(0);
            setSemestre('');
            setOpen(false);
        } catch (error) {
            console.log('Error al crear la asignatura: ', error);
            toast.error(
                'Hubo un error al guardar la asignatura AQUI PONDREMOS CARTELES'
            );
        }
    };

    return (
        <>
            <Button size={'sm'} variant={'ghost'} onClick={() => setOpen(true)}>
                <SquarePen className="h-4 w-4" />
            </Button>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle> Editar Asignatura</DialogTitle>
                    </DialogHeader>

                    <div>
                        <span>Asignatura:</span>
                        <Input
                            type="text"
                            placeholder="Asignatura"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <span>Descripción:</span>
                        <Textarea
                            placeholder="Describe la asignatura"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <span>Profesor:</span>
                        <Input
                            type="text"
                            placeholder="Profesor"
                            value={profesor}
                            onChange={(e) => setProfesor(e.target.value)}
                        />
                        <span>Creditos:</span>
                        <Input
                            type="number"
                            placeholder="6"
                            value={creditos}
                            onChange={(e) =>
                                setCreditos(Number(e.target.value))
                            }
                        />
                        <span>Clasificación:</span>
                        <Input
                            type="number"
                            placeholder="50"
                            value={clasificacion}
                            onChange={(e) =>
                                setClasificacion(Number(e.target.value))
                            }
                        />
                        <span>Semestre:</span>
                        <Input
                            type="text"
                            placeholder="2025-1"
                            value={semestre}
                            onChange={(e) => setSemestre(e.target.value)}
                        />
                        <span>Color:</span>
                        <Input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <span className="text-sm">{color}</span>
                    </div>

                    <DialogFooter>
                        <Button
                            variant={'outline'}
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogPanel>
            </Dialog>
        </>
    );
}
