'use client';

import Link from 'next/link';
import { ButtonMaterias } from './components/ButtonMaterias';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Clock, Star, Trash2, UsersRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ButtomEdit } from './components/ButtomEdit';
import { ButtomDelete } from './components/ButtomDelete';

type Asignatura = {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    profesor: string;
    creditos: number;
    clasificacion: number;
    semestre: string;
};

export default function Materias() {
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('/api/asignaturas')
            .then((res) => setAsignaturas(res.data))
            .catch((err) =>
                setError(err?.message || 'Error al cargar las asignaturas')
            )
            .finally(() => setLoading(false));
    }, []);
    const totalCreditos = asignaturas.reduce(
        (acc, asignatura) => acc + asignatura.creditos,
        0
    );
    const promedio =
        asignaturas.reduce(
            (acc, asignatura) => acc + asignatura.clasificacion,
            0
        ) / asignaturas.length;

    const semestreActual = asignaturas
        .map((a) => a.semestre)
        .sort()
        .reverse()[0]; // El más reciente

    if (loading) return <p className="p-4">Cargando asignaturas...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    const handleDelete = (id: number) => {
        setAsignaturas(asignaturas.filter((a) => a.id !== id));
    };
    const handleAddAsignatura = (newAsignatura: {
        nombre: string;
        descripcion: string | null; // aceptar null también
        color: string;
        profesor: string;
        creditos: number;
        clasificacion: number;
        semestre: string;
        id: number;
        usuario_id: string;
        fechaCreacion: Date;
    }) => {
        // Opcional: Si no quieres guardar null, lo conviertes a string vacío
        const asignaturaSinNull = {
            ...newAsignatura,
            descripcion: newAsignatura.descripcion ?? '',
        };
        setAsignaturas((prev) => [...prev, asignaturaSinNull]);
    };

    const handleUpdate = (updated: Asignatura) => {
        setAsignaturas((prev) =>
            prev.map((a) => (a.id === updated.id ? updated : a))
        );
    };

    return (
        <section className="space-y-4 p-4 ">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-purple-800">
                        Mis Asignaturas
                    </h1>
                    <p className="text-purple-700">
                        Gestiona tus materias y seguimiento académico
                    </p>
                </div>
                <ButtonMaterias onAdd={handleAddAsignatura} />
            </div>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-md flex items-center gap-2 justify-between border border-gray-100 shadow-sm">
                    <div className="">
                        <p className="text-muted-foreground text-sm">
                            Total Asignaturas
                        </p>
                        <p className="text-2xl font-semibold">
                            {asignaturas.length}
                        </p>
                    </div>
                    <div>
                        <BookOpen size={40} className="text-purple-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md flex items-center gap-2 justify-between border border-gray-100 shadow-sm">
                    <div className="">
                        <p className="text-muted-foreground text-sm">
                            Total Créditos
                        </p>
                        <p className="text-2xl font-semibold">
                            {totalCreditos}
                        </p>
                    </div>
                    <div>
                        <UsersRound size={40} className="text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md flex items-center gap-2 justify-between border border-gray-100 shadow-sm">
                    <div className="">
                        <p className="text-muted-foreground text-sm">
                            Promedio General
                        </p>
                        <p className="text-2xl font-semibold">
                            {promedio.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <Star size={40} className="text-amber-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md flex items-center gap-2 justify-between border border-gray-100 shadow-sm">
                    <div className="">
                        <p className="text-muted-foreground text-sm">
                            Semestre Actual
                        </p>
                        <p className="text-2xl font-semibold">
                            {semestreActual}
                        </p>
                    </div>
                    <div>
                        <Clock size={40} className="text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Cards + Estadísticas */}

            {/* Cards con máx 2 por fila */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {asignaturas.map((asignatura) => {
                    console.log('esta son las asignaturas: ', asignatura);
                    return (
                        <div
                            key={asignatura.id}
                            className=" bg-white overflow-hidden cursor-pointer transition-all duration-200 hover:scale-102 hover:shadow-lg border-0 rounded-2xl "
                        >
                            <div
                                className="h-2"
                                style={{ backgroundColor: asignatura.color }}
                            ></div>

                            <div className="pt-8 px-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 justyfy-center items-center">
                                        <BookOpen className="h-5 w-5 justify-center" />
                                        <h3 className="text-xl text-gray-600  ">
                                            {asignatura.nombre}
                                        </h3>
                                    </div>

                                    <div className="flex gap-1 ml-2">
                                        <ButtomEdit
                                            asignatura={asignatura}
                                            onUpdate={handleUpdate}
                                        />
                                        <ButtomDelete
                                            id={asignatura.id}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 border-b border-gray-100">
                                    <p className="text-gray-800 text-sm">
                                        {asignatura.descripcion}
                                    </p>
                                    <div className="flex flex-col mt-4 gap-2 mb-4">
                                        <div className="flex justify-between">
                                            <p className="text-gray-500 text-sm ">
                                                Profesor:
                                            </p>
                                            <p className="text-gray-800  text-sm font-medium">
                                                {asignatura.profesor}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500 text-sm">
                                                Creditos:
                                            </p>
                                            <Badge
                                                variant={'secondary'}
                                                className="font-medium"
                                            >
                                                {asignatura.creditos}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500 text-sm">
                                                Clasificación:
                                            </p>
                                            <Badge
                                                className={
                                                    asignatura.clasificacion >=
                                                    90
                                                        ? 'bg-green-100 text-green-800'
                                                        : asignatura.clasificacion >=
                                                          80
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : asignatura.clasificacion >=
                                                          70
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }
                                            >
                                                {asignatura.clasificacion}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    key={asignatura.id}
                                    href={`/materias/${asignatura.id}`}
                                    className=" bg-white overflow-hidden cursor-pointer transition-all duration-200 hover:scale-102 hover:shadow-lg border-0 rounded-2xl "
                                >
                                    <div className="flex text-center justify-center pt-3 mb-3 ">
                                        <p className="text-blue-600 text-sm font-medium ">
                                            Haz clic para ver detalles de la
                                            asignatura
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
