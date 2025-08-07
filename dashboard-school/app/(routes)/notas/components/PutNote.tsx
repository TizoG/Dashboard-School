'use client';

import {
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@/components/animate-ui/headless/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { LuPen } from 'react-icons/lu';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { SquarePen } from 'lucide-react';

type PutNoteProps = {
    nota: {
        id: number;
        titulo: string;
        contenido: string;
    };
    onUpdate?: () => void;
};

export const PutNote = ({ nota, onUpdate }: PutNoteProps) => {
    const [Open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.put('/api/tipsNotas', {
                id: nota.id,
                titulo,
                contenido,
            });
            setOpen(false);
            onUpdate?.();
        } catch (error) {
            console.log(error);
            alert('No pudimos actualizar la nota');
        }
    };
    return (
        <>
            <Button
                variant={'ghost'}
                className="cursor-pointer  "
                onClick={() => setOpen(true)}
            >
                <SquarePen />
                <Dialog open={Open} onClose={() => setOpen(false)}>
                    <DialogBackdrop />

                    <DialogPanel>
                        <DialogHeader>
                            <DialogTitle>Titulo</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-2">
                            <span>Titulo:</span>
                            <Input
                                type="text"
                                placeholder="Titulo de la tarea"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <span>Descripcion:</span>
                            <Textarea
                                placeholder="Describe la tarea"
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                variant={'outline'}
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button onClick={handleSubmit}>Guardar</Button>
                        </DialogFooter>
                    </DialogPanel>
                </Dialog>
            </Button>
        </>
    );
};
