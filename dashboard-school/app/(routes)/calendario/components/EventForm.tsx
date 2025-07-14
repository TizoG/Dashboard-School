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
import { on } from 'events';

import { useState } from 'react';
import { GoPlus } from 'react-icons/go';

export const EventForm = ({ onAdd }: { onAdd: () => void }) => {
    const [Open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleSubmit = async () => {
        if (!titulo || !fechaInicio || !fechaFin) {
            alert('Todos los campos obligatorios deben estar llenos');
            return;
        }

        try {
            await axios.post('/api/eventos', {
                titulo,
                descripcion,
                fechaInicio: new Date(fechaInicio).toISOString(),
                fechaFin: new Date(fechaFin).toISOString(),
            });

            onAdd(); // recargar eventos
            setOpen(false);
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        }
    };

    return (
        <>
            <LiquidButton
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <GoPlus />
                Añade Evento
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Nuevo Evento</DialogTitle>
                    </DialogHeader>

                    <div>
                        <span>Titulo:</span>
                        <Input
                            type="text"
                            placeholder="Introduce el titulo del tema"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        <span>Descripcion:</span>
                        <Textarea
                            placeholder="Pequeño resumen del tema"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <span>Fecha inicio:</span>
                        <Input
                            type="datetime-local"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                        <span>Fecha fin:</span>
                        <Input
                            type="datetime-local"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
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
