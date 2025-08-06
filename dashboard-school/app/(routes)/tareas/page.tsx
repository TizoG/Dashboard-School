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
import { Trash2 } from 'lucide-react';
import { ButtonEdit } from './components/ButtonEdit';
import { ButtonDelete } from './components/ButtonDelete';

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

                    <div className="flex items-center pt-4">
                        <ButtonTodo onRefresh={cargarTareas} />
                    </div>
                </div>
                <div className="flex gap-2 items-end justify-center">
                    <div className="flex gap-2 items-center">
                        <CiCircleCheck className="text-gray-400" />
                        <p className="text-gray-400">
                            {tareas.length}{' '}
                            {tareas.length === 1 ? 'tarea' : 'tareas'}
                        </p>
                    </div>
                </div>
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
