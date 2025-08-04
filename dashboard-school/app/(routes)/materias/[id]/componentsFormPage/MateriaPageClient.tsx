'use client';

import { useEffect, useState } from 'react';

import { ButtonForm } from './ButtonForm';

import { AccordionTemario } from './AccordionTemario';
import axios from 'axios';
import {
    ArrowLeft,
    BookOpen,
    File,
    FileText,
    LoaderCircle,
    Star,
    User,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CardTemas } from './CardTemas';
import { CardResumenNotas } from './CardResumenNotas';

type Asignatura = {
    id: number;
    nombre: string;
    descripcion: string | null;
    usuario_id: string;
    profesor: string;
    creditos: number;
    clasificacion: number;
    semestre: string;
    temario: Tema[];
};

type NotaExamen = {
    id: number;
    titulo: string;
    contenido: string | null;
    nota: number | null;
    archivoUrl: string | null;
    fechaVencimiento: string | null;
    tipo: string | null;
    tema_id: number;
};
type Tema = {
    id: number;
    titulo: string;
    contenido: string | null;
    notasExamenes: NotaExamen[];
};

type Archivo = {
    id: number;
    titulo: string;
    url: string;
};

export default function MateriaPageClient({
    asignatura,
}: {
    asignatura: Asignatura;
}) {
    const [refresh, setRefresh] = useState(0); // Para forzar recarga del temario
    const [temas, setTemas] = useState<Tema[]>([]);
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
    const [actividades, setActividades] = useState<NotaExamen[]>([]);
    const [activeTab, setActiveTab] = useState<'temario' | 'notas'>('temario');
    const [progres, setProgreso] = useState(0);
    const [promedio, setPromedio] = useState(0);

    const notas = asignatura.temario.flatMap((tema) => tema.notasExamenes);

    useEffect(() => {
        const fetchTemas = async () => {
            const res = await axios.get(
                `/api/temario?asignatura_id=${asignatura.id}`
            );
            const data = res.data;
            if (Array.isArray(data)) {
                setTemas(data);
            } else if (data.temas && Array.isArray(data.temas)) {
                setTemas(data.temas);
            } else {
                setTemas([]);
            }
        };

        fetchTemas();
    }, [asignatura.id, refresh]);

    const onTemaCreado = () => setRefresh((prev) => prev + 1);

    const notasValidas = notas.filter((nota) => nota.nota !== null);
    const promedioNotas =
        notasValidas.reduce((acc, nota) => acc + (nota.nota || 0), 0) /
        (notasValidas.length || 1);

    const handleNotasUpdated = (notas: NotaExamen[]) => {
        setActividades(notas);
    };

    const totalActividades = notas.length;
    const actividadesCompletadas = notasValidas.length;
    const progreso =
        totalActividades === 0
            ? 0
            : (actividadesCompletadas / totalActividades) * 100;

    return (
        <section className="space-y-6 p-4 ">
            <div className="p-6 bg-blue-500/80 rounded-lg">
                <div className="inline-flex items-center gap-4 p-2 rounded-lg hover:text-gray-800 hover:bg-white/20 text-white">
                    <ArrowLeft className="w-5 h-5" />
                    <a href="/materias">Volver a Asignaturas</a>
                </div>
                <div className="text-white flex gap-4 mt-6 justify-between items-center">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-semibold">
                            {asignatura.nombre}
                        </h1>
                        <p>{asignatura.descripcion}</p>
                    </div>
                    <div className="text-4xl font-bold">
                        {asignatura.clasificacion}
                    </div>
                </div>
                <div className="text-white flex justify-around mt-4">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <p>{asignatura.profesor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        <p>{asignatura.creditos} créditos</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-300 flex">
                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm">Progreso</p>
                        <p className="text-2xl font-semibold text-gray-800">
                            {progreso.toFixed(2)}%
                        </p>
                    </div>
                    <div className="ml-auto flex items-center">
                        <LoaderCircle className="w-12 h-12 text-gray-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 flex">
                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm">Promedio Actual</p>
                        <p className="text-2xl font-semibold text-gray-800">
                            {promedioNotas.toFixed(2) === 'NaN'
                                ? 0
                                : promedioNotas.toFixed(2)}
                        </p>
                    </div>
                    <div className="ml-auto flex items-center">
                        <Star className="w-12 h-12 text-amber-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 flex">
                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm">Temas</p>
                        <p className="text-2xl font-semibold text-gray-800">
                            {temas.length}
                        </p>
                    </div>
                    <div className="ml-auto flex items-center">
                        <BookOpen className="w-12 h-12 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-300 flex">
                    <div className="flex flex-col">
                        <p className="text-gray-500 text-sm">Actividades</p>
                        <p className="text-2xl font-semibold text-gray-800">
                            {actividades.length}
                        </p>
                    </div>
                    <div className="ml-auto flex items-center">
                        <FileText className="w-12 h-12 text-green-500" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-300 rounded-full flex justify-between p-1">
                <div
                    onClick={() => setActiveTab('temario')}
                    className={`${
                        activeTab === 'temario' ? 'bg-white' : 'bg-transparent'
                    } text-gray-800 w-1/2 text-center rounded-full cursor-pointer`}
                >
                    <p>Temario</p>
                </div>

                <div
                    onClick={() => setActiveTab('notas')}
                    className={`${
                        activeTab === 'notas' ? 'bg-white' : 'bg-transparent'
                    } text-gray-800 w-1/2 text-center rounded-full cursor-pointer`}
                >
                    <p>Resumen de Notas</p>
                </div>
            </div>
            {activeTab === 'temario' && (
                <>
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold mb-2">Temario</h2>
                        <ButtonForm
                            asignaturaId={asignatura.id}
                            onTemaCreado={onTemaCreado}
                        />
                    </div>
                    <CardTemas
                        temas={temas}
                        id={asignatura.id.toString()}
                        onNotasUpdated={handleNotasUpdated}
                    />
                </>
            )}
            {activeTab === 'notas' && (
                <CardResumenNotas temas={temas} id={asignatura.id.toString()} />
            )}
        </section>
    );
}
