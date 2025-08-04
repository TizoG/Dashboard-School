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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { set } from 'date-fns';
import { useState } from 'react';

type NotaExamen = {
    id: number;
    titulo: string;
    contenido: string | null;
    nota: number;
    archivoUrl: string | null;
    fechaVencimiento: string | null;
    tema_id: number;
    tipo: string | null;
};
export const ButtonFormNota = ({
    temaId,
    onNotaCreada,
    disable,
}: {
    temaId: number;
    onNotaCreada?: (nota: NotaExamen) => void;
    disable?: boolean;
}) => {
    const [Open, setOpen] = useState(false);
    const [nota, setNotas] = useState('');
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [archivoUrl, setArchivoUrl] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async () => {
        try {
            console.log('fechaVencimiento antes de enviar:', fechaVencimiento);
            const res = await axios.post('/api/notas', {
                titulo,
                contenido,
                nota,
                tema_id: temaId,
                archivoUrl,
                fechaVencimiento: fechaVencimiento,
                tipo,
            });

            setNotas('');
            setContenido('');
            setTitulo('');
            setArchivoUrl('');
            setFechaVencimiento('');
            setTipo('');
            setOpen(false);

            if (onNotaCreada) {
                onNotaCreada(res.data);
            }
        } catch (error) {
            console.log('Error al crear el tema: ', error);
            alert('Hubo un error al guardar el tema AQUI PONDREMOS CARTELES');
        }
    };
    return (
        <>
            <LiquidButton
                className="cursor-pointer mt-4 ml-2"
                onClick={() => setOpen(true)}
                disabled={disable}
            >
                Actividad
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Nueva Nota</DialogTitle>
                    </DialogHeader>

                    <div>
                        <span>Titulo:</span>
                        <Input
                            type="text"
                            placeholder="Titulo "
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <div>
                                <span>Tipo</span>
                                <Select value={tipo} onValueChange={setTipo}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tarea</SelectLabel>
                                            <SelectItem value="tarea">
                                                Tarea
                                            </SelectItem>
                                            <SelectItem value="examen">
                                                Examen
                                            </SelectItem>
                                            <SelectItem value="proyecto">
                                                Proyecto
                                            </SelectItem>
                                            <SelectItem value="actividad">
                                                Actividad
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <span>Nota</span>
                                <Input
                                    type="number"
                                    placeholder="Nota "
                                    value={nota}
                                    onChange={(e) => setNotas(e.target.value)}
                                />
                            </div>
                        </div>
                        <span>Fecha vencimiento:</span>
                        <Input
                            type="date"
                            placeholder="Introduce el tipo trabajo, examen,tarea, etc."
                            value={fechaVencimiento}
                            onChange={(e) =>
                                setFechaVencimiento(e.target.value)
                            }
                        />

                        <span>Anotaciones:</span>
                        <Textarea
                            placeholder="Introduce las anotaciones"
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                        />
                        <span>Url Drive:</span>
                        <Input
                            type="url"
                            placeholder="la url de tu archivo Drive"
                            value={archivoUrl}
                            onChange={(e) => setArchivoUrl(e.target.value)}
                        />
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
};
