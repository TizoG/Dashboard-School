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
import {
    ButtonEdit,
    ChangeEstado,
    ChangeEstadoCompletado,
} from './components/ButtonEdit';
import { ButtonDelete } from './components/ButtonDelete';
import { CardTareas } from './components/CardTareas';
import { HeadersTareas } from './components/HeadersTareas';
import { Badge } from '@/components/ui/badge';

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
    const [tareasFiltradas, setTareasFiltradas] = useState<TareasProps[]>([]);
    const [estado, setEstado] = useState('');

    const cargarTareas = async () => {
        const res = await axios
            .get('/api/tareas')
            .then((res) => {
                console.log('Tarea recibida:', res.data);
                setTareas(res.data);
                setTareasFiltradas(res.data);
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

    const manejarFiltrado = (filtro: {
        estado?: string;
        prioridad?: string;
    }) => {
        let tareasFiltradas = tareas;

        if (filtro.estado && filtro.estado !== 'all') {
            tareasFiltradas = tareasFiltradas.filter(
                (tarea) => tarea.estado === filtro.estado
            );
        }

        if (filtro.prioridad && filtro.prioridad !== 'all') {
            tareasFiltradas = tareasFiltradas.filter(
                (tarea) => tarea.prioridad === filtro.prioridad
            );
        }

        setTareasFiltradas(tareasFiltradas);
    };

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
            <HeadersTareas tareas={tareas} onFiltrar={manejarFiltrado} />

            <div>
                <div className="flex flex-col gap-8">
                    {tareasFiltradas.map((tarea) => (
                        <div
                            key={tarea.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 w-full flex justify-between items-center"
                        >
                            <div className="flex flex-col  gap-2 mt-2">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`${
                                            tarea.estado === 'PENDIENTE'
                                                ? 'bg-red-500'
                                                : tarea.estado === 'EN_PROCESO'
                                                ? 'bg-yellow-500'
                                                : tarea.estado === 'COMPLETADA'
                                                ? 'bg-green-500'
                                                : ''
                                        } rounded-full w-3 h-3 `}
                                    ></div>
                                    <span className="font-semibold text-md">
                                        {tarea.titulo}
                                    </span>
                                    <Badge
                                        className={`${
                                            tarea.estado === 'PENDIENTE'
                                                ? 'bg-red-100 text-red-800'
                                                : tarea.estado === 'EN_PROCESO'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : tarea.estado === 'COMPLETADA'
                                                ? 'bg-green-100 text-green-800'
                                                : ''
                                        } font-semibold  rounded-lg text-[10px]`}
                                    >
                                        {tarea.estado}
                                    </Badge>
                                </div>
                                <div className="text-sm text-gray-600 flex flex-col">
                                    <p>{tarea.descripcion}</p>
                                    <div className="flex gap-6 items-center text-gray-500 mt-2">
                                        <p>
                                            {new Date(
                                                tarea.fechaVencimiento
                                            ).toLocaleDateString()}
                                        </p>{' '}
                                        |
                                        <p className="text-sm">
                                            {tarea.asignatura}
                                        </p>
                                    </div>
                                </div>
                                {tarea.estado === 'COMPLETADA' ? (
                                    ''
                                ) : tarea.estado === 'PENDIENTE' ? (
                                    <div className="flex gap-2 mt-2">
                                        <ChangeEstado
                                            id={tarea.id}
                                            onUpdate={cargarTareas}
                                        />
                                        <ChangeEstadoCompletado
                                            id={tarea.id}
                                            onUpdate={cargarTareas}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex gap-2 mt-2">
                                        <ChangeEstadoCompletado
                                            id={tarea.id}
                                            onUpdate={cargarTareas}
                                        />
                                    </div>
                                )}
                            </div>
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
