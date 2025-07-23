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
import axios from 'axios';
import { useEffect, useState } from 'react';

export const ButtonMaterias = () => {
    const [Open, setOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/asignaturas', {
                nombre,
                descripcion,
            });

            console.log('Asignatura creada: ', response.data);

            setNombre('');
            setDescripcion('');
            setOpen(false);
        } catch (error) {
            console.log('Error al crear la asignatura: ', error);
            alert(
                'Hubo un error al guardar la asignatura AQUI PONDREMOS CARTELES'
            );
        }
    };

    return (
        <>
            <LiquidButton
                className="cursor-pointer shadow-md border border-gray-500 hover:border-white "
                onClick={() => setOpen(true)}
            >
                Añade Asignaturas
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Asignatura</DialogTitle>
                    </DialogHeader>

                    <div>
                        <span>Asignatura:</span>
                        <Input
                            type="text"
                            placeholder="Asignatura"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <span>Profesor:</span>
                        <Input
                            type="text"
                            placeholder="Profesor"
                            onChange={(e) => setDescripcion(e.target.value)}
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
