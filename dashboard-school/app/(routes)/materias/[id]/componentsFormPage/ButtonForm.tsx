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
import axios from 'axios';
import { useState } from 'react';

export const ButtonForm = ({
    asignaturaId,
    onTemaCreado,
}: {
    asignaturaId: number;
    onTemaCreado: () => void;
}) => {
    const [Open, setOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [resumen, setResumen] = useState('');
    const [enlace, setEnlace] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/temario', {
                titulo: nombre,
                contenido: resumen,
                enlace,
                asignatura_id: asignaturaId,
            });

            console.log('Tema creado: ', response.data);

            setNombre('');
            setResumen('');
            setEnlace('');
            setOpen(false);

            onTemaCreado();
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
                Añade tema
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Tema</DialogTitle>
                    </DialogHeader>

                    <div>
                        <span>Titulo del tema:</span>
                        <Input
                            type="text"
                            placeholder="Introduce el titulo del tema"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <span>Resumen:</span>
                        <Textarea
                            placeholder="Pequeño resumen del tema"
                            value={resumen}
                            onChange={(e) => setResumen(e.target.value)}
                        />
                        <span>Enlace al tema:</span>
                        <Input
                            type="url"
                            placeholder="https://..."
                            value={enlace}
                            onChange={(e) => setEnlace(e.target.value)}
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
