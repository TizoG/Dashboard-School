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

    useEffect(() => {
        axios
            .get('/api/tareas')
            .then((res) => {
                console.log('Tarea recibida:', res.data);
                setTareas(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <section className="bg-white w-full h-full flex flex-col items-center pt-4 max-w-7xl mx-auto">
            <div className="flex flex-col w-4xl">
                <h1 className="text-3xl font-bold">Tarea</h1>
                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <CiCircleCheck className="text-gray-400" />
                        <p className="text-gray-400">9 tareas</p>
                    </div>
                    <div>
                        <ButtonTodo />
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
                                    <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                        <LuPen />
                                    </div>
                                    <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                        <CiCalendarDate />
                                    </div>
                                    <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                        <TfiComment />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
