'use client';
import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
import Link from 'next/link';
import { FaCode } from 'react-icons/fa';
import { MateriasItems } from './Materias-items';
import { ButtonMaterias } from './components/ButtonMaterias';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Asignatura = {
    id: number;
    nombre: string;
    descripcion: string;
};
export default function Materias() {
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/asignaturas')
            .then((response) => {
                setAsignaturas(response.data);
            })
            .catch((err) => {
                setError(err.message || 'Error al cargar las asignaturas');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <section className="p-4">
            <div className="bg-white p-4 rounded-sm flex justify-end ">
                <ButtonMaterias />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {MateriasItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className="inline-block flex-col hover:scale-[1.03] transform transition-transform ease-out duration-200 hover:shadow-lg"
                    >
                        <div>
                            <div
                                className={`${item.color} w-full flex justify-center items-center p-2 rounded-t-lg gap-9`}
                            >
                                <div>
                                    <h2 className="p-2 text-4xl text-white">
                                        {item.title}
                                    </h2>
                                </div>
                                <item.icon
                                    className={`${item.colorIcon} text-9xl`}
                                />
                            </div>
                            <div className="bg-white rounded-b-lg w-full p-4">
                                <span className="p-2 text-2xl">
                                    Prof. {item.profesor}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
                <div>
                    {asignaturas.map((asignatura) => (
                        <Link
                            key={asignatura.id}
                            href={`/materias/${asignatura.id}`}
                        >
                            <p>{asignatura.nombre}</p>
                            <p>{asignatura.descripcion}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
