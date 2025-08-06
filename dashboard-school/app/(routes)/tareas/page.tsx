'use client';
import { GoPlus } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { CiCalendarDate, CiCircleCheck } from 'react-icons/ci';
import { ComponentsTodo } from './components/ComponentsTodo';
import { LuPen } from 'react-icons/lu';
import { TfiComment } from 'react-icons/tfi';
import { ButtonTodo } from './components/ButtonTodo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Check,
    CircleAlert,
    Clock8,
    SquareCheckBig,
    Trash2,
} from 'lucide-react';
import { ButtonEdit } from './components/ButtonEdit';
import { ButtonDelete } from './components/ButtonDelete';
import { CardTareas } from './components/CardTareas';

type TareasProps = {
    id: number;
    titulo: string;
    descripcion: string;
    asignatura: string;
    tipo: string;
    estado: string;
    prioridad: string;
    fechaVencimiento: string;
};
export default function Tareas() {
    const [tareas, setTareas] = useState<TareasProps[]>([]);

    const cargarTareas = async () => {
        const res = await axios
            .get('/api/tareas')
            .then((res) => {
                console.log('Tarea recibida:', res.data);
                setTareas(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    const obtenerTotalTareas = (tareas: TareasProps[]) => tareas;
    const obtenerTareasPendientes = (tareas: TareasProps[]) =>
        tareas.filter((tarea) => tarea.estado === 'PENDIENTE');
    const obtenerTotalProceso = (tareas: TareasProps[]) =>
        tareas.filter((tarea) => tarea.estado === 'EN_PROCESO');
    const obtenerTareasCompletadas = (tareas: TareasProps[]) =>
        tareas.filter((tarea) => tarea.estado === 'COMPLETADA');
    return (
        <section className="space-y-6 p-4 ">
            <div className=" bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 ">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-orange-800">
                            Tarea
                        </h1>
                        <p className="text-orange-700">
                            Organiza y sigue el progreso de tus tareas
                            académicas
                        </p>
                    </div>

                    <div className="flex items-center">
                        <ButtonTodo onRefresh={cargarTareas} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardTareas
                    titulo="Total Tareas"
                    tareas={tareas}
                    procesarTareas={obtenerTotalTareas}
                    icon={<SquareCheckBig className="h-8 w-8 font-bold" />}
                    color="text-orange-500 "
                />
                <CardTareas
                    titulo="Pendientes"
                    tareas={tareas}
                    procesarTareas={obtenerTareasPendientes}
                    icon={<Clock8 className="h-8 w-8 font-bold" />}
                    color="text-red-500"
                />
                <CardTareas
                    titulo="En Progreso"
                    tareas={tareas}
                    procesarTareas={obtenerTotalProceso}
                    icon={<CircleAlert className="h-8 w-8 font-bold" />}
                    color="text-yellow-500"
                />
                <CardTareas
                    titulo="Completadas"
                    tareas={tareas}
                    procesarTareas={obtenerTareasCompletadas}
                    icon={<SquareCheckBig className="h-8 w-8 font-bold" />}
                    color="text-green-500"
                />
            </div>
            <div>
                <div className="flex flex-col">
                    {tareas.map((tarea) => (
                        <div
                            key={tarea.id}
                            className="my-4 border-b py-4 flex justify-between w-full "
                        >
                            <span>{tarea.titulo}</span>
                            <div className="flex gap-3 cursor-pointer">
                                <ButtonEdit
                                    tareaId={tarea.id}
                                    onUpdate={cargarTareas}
                                />
                                <ButtonDelete
                                    id={tarea.id}
                                    onDelete={cargarTareas}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
