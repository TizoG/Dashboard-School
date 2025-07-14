'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/animate-ui/headless/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Event as RbcEvent } from 'react-big-calendar';

import { useEffect, useState } from 'react';

interface MyEvent extends RbcEvent {
    id: string;
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    descripcion: string;
}
type EventEditFormProps = {
    event: MyEvent | null;
    onClose: () => void;
    onUpdated: () => void;
};

export const EventEditForm = ({
    event,
    onClose,
    onUpdated,
}: EventEditFormProps) => {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        if (event) {
            setOpen(true);
            setTitulo(event.titulo);
            setDescripcion(event.descripcion);
            setFechaInicio(
                new Date(event.fechaInicio).toISOString().slice(0, 16)
            );
            setFechaFin(new Date(event.fechaFin).toISOString().slice(0, 16));
        }
    }, [event]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/eventos/${event?.id}`, {
                titulo,
                descripcion,
                fechaInicio: new Date(fechaInicio).toISOString(),
                fechaFin: new Date(fechaFin).toISOString(),
            });
            onUpdated();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el evento');
        }
    };

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogBackdrop />
            <DialogHeader>
                <DialogTitle>Editar evento</DialogTitle>
            </DialogHeader>

            <div>
                <span>Titulo:</span>
                <Input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <span>Descripcion:</span>
                <Input
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
                <button onClick={handleUpdate}>Actualizar</button>
                <button onClick={handleClose}>Cancelar</button>
            </DialogFooter>
        </Dialog>
    );
};
