'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { FaCode, FaDatabase, FaLaptopCode } from 'react-icons/fa';
import { FaArrowUpFromBracket, FaRegLightbulb } from 'react-icons/fa6';
import { BsWindowFullscreen } from 'react-icons/bs';
import { TbServerCog } from 'react-icons/tb';

import { ButtonMaterias } from './components/ButtonMaterias';
import { MateriasItems } from './Materias-items';

type Asignatura = {
    id: number;
    nombre: string;
    descripcion: string;
};

type AsignaturaEnriquecida = Asignatura & {
    href: string;
    icon?: React.ElementType;
    color: string;
    colorIcon: string;
};

function normalizarTexto(texto: string): string {
    return texto
        .normalize('NFD') // separar acentos
        .replace(/[\u0300-\u036f]/g, '') // quitar acentos
        .toLowerCase()
        .trim();
}

function enriquecerAsignaturas(
    asignaturasDesdeDB: Asignatura[]
): AsignaturaEnriquecida[] {
    return asignaturasDesdeDB.map((asignatura) => {
        const item = MateriasItems.find(
            (m) =>
                normalizarTexto(m.title) === normalizarTexto(asignatura.nombre)
        );

        return {
            ...asignatura,
            href: item?.href ?? `/materias/${asignatura.id}`,
            icon: item?.icon,
            color: item?.color ?? 'bg-gray-200',
            colorIcon: item?.colorIcon ?? 'text-gray-600',
        };
    });
}

export default function Materias() {
    const [asignaturas, setAsignaturas] = useState<AsignaturaEnriquecida[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/asignaturas')
            .then((response) => {
                const enriched = enriquecerAsignaturas(response.data);
                setAsignaturas(enriched);
            })
            .catch((err) => {
                setError(err.message || 'Error al cargar las asignaturas');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="p-4">Cargando asignaturas...</p>;
    }

    if (error) {
        return <p className="p-4 text-red-500">Error: {error}</p>;
    }

    return (
        <section className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-end mb-6">
                <ButtonMaterias />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {asignaturas.map((asignatura) => (
                    <Link
                        key={asignatura.id}
                        href={asignatura.href}
                        className="group border hover:scale-105 border-gray-200 rounded-xl hover:shadow-md transition-transform hover:-traslate-y-1 bg-white"
                    >
                        <div>
                            <div
                                className={`${asignatura.color} p-5 rounded-t-xl flex justify-between items-center`}
                            >
                                <h2 className="text-white text-xl font-semibold leading-snug">
                                    {asignatura.nombre}
                                </h2>
                                {asignatura.icon && (
                                    <asignatura.icon
                                        size={48}
                                        className={`${asignatura.colorIcon} `}
                                    />
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-600">
                                    Prof. {asignatura.descripcion}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
