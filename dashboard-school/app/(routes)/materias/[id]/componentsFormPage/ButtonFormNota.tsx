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
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useState } from 'react';

export const ButtonFormNota = ({ temaId }: { temaId: number }) => {
    const [Open, setOpen] = useState(false);
    const [nota, setNotas] = useState('');
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('/api/notas', {
                titulo,
                contenido,
                nota,
                tema_id: temaId,
            });

            setNotas('');
            setContenido('');
            setTitulo('');
            setOpen(false);
        } catch (error) {
            console.log('Error al crear el tema: ', error);
            alert('Hubo un error al guardar el tema AQUI PONDREMOS CARTELES');
        }
    };
    return (
        <>
            <LiquidButton
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Agregar nota
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
                        <span>Nota:</span>
                        <Input
                            placeholder="Introduce la nota "
                            value={nota}
                            onChange={(e) => setNotas(e.target.value)}
                        />
                        <span>Anotaciones:</span>
                        <Input
                            type="text"
                            placeholder="Introduce el tipo trabajo, examen,tarea, etc."
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

                        <Button type="submit" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogPanel>
            </Dialog>
        </>
    );
};
