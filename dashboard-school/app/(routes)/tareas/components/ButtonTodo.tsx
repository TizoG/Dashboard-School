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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const ButtonTodo = () => {
    const [Open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    type valoresPrioridad = 'Baja' | 'Media' | 'Alta';
    const [prioridad, setPrioridad] = useState<valoresPrioridad>('Baja');
    const [estado, setEstado] = useState('Pendiente');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('api/tareas', {
                titulo,
                descripcion,
                estado,
                prioridad,
                fechaVencimiento,
            });
            setTitulo('');
            setDescripcion('');
            setPrioridad('Baja');
            setEstado('pendiente');
            setFechaVencimiento('');
            setOpen(false);
        } catch (error) {
            alert('AQUI UN SONNER');
        }
    };
    return (
        <>
            <LiquidButton
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Añadir tarea
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Nueva Tarea</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <span>Titulo:</span>
                        <Input type="text" placeholder="Titulo de la tarea" />
                        <span>Descripcion:</span>
                        <Textarea placeholder="Describe la tarea" />
                        <span>Estado:</span>
                        <Select
                            value={estado}
                            onValueChange={(value) => setEstado(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pendiente">
                                    Pendiente
                                </SelectItem>
                                <SelectItem value="Completado">
                                    Completada
                                </SelectItem>
                            </SelectContent>
                        </Select>
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
