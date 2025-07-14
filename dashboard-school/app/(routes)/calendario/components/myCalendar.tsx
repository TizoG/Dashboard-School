'use client';
import {
    Calendar,
    dateFnsLocalizer,
    Event as RbcEvent,
} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { EventForm } from './EventForm';
import axios from 'axios';

interface MyEvent extends RbcEvent {
    id: string;
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    descripcion?: string;
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { es },
});

export default function MyCalendario() {
    const [eventos, setEventos] = useState<MyEvent[]>([]);
    const [editando, setEditando] = useState<MyEvent | null>(null);

    const fetchEvents = async () => {
        const res = await axios.get('/api/eventos');
        const data = await res.data;
        setEventos(
            data.map((e: any) => ({
                ...e,
                fechaInicio: new Date(e.start),
                fechaFin: new Date(e.end),
            }))
        );
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/eventos/${id}`);
        fetchEvents();
    };

    const handleUpdate = async (eventoActualizado: MyEvent) => {
        try {
            await axios.put(`/api/eventos/${eventoActualizado.id}`, {
                title: eventoActualizado.title,
                description: eventoActualizado.descripcion,
                start: eventoActualizado.start,
                end: eventoActualizado.end,
            });
            alert('Evento actualizado');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el evento');
        }
    };

    const eventPropGetter = (evento: MyEvent) => ({
        style: {
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
        },
    });

    const openEditForm = (event: MyEvent) => {
        setEditando(event);
    };

    const EventComponent = ({ event }: { event: MyEvent }) => (
        <div className="relative group">
            <strong>{event.titulo}</strong>
            <div className="text-sm">{event.descripcion}</div>
            <div className="absolute right-0 top-0 hidden group-hover:flex gap-1">
                <button onClick={openEditForm}>
                    <FaEdit className="text-white hover:text-yellow-300" />
                </button>
                <button onClick={() => handleDelete(event.id)}>
                    <FaTrash className="text-white hover:text-red-400" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="fechaInicio"
                endAccessor="fechaFin"
                style={{ height: 600 }}
                culture="es"
                eventPropGetter={eventPropGetter}
                components={{ event: EventComponent }}
            />
            <EventForm onAdd={fetchEvents} />
        </div>
    );
}
