'use client';
import { PutNote } from './components/PutNote';
import { DeleteNote } from './components/DeleteNote';
import { PostNote } from './components/postNote';
import { useEffect, useState } from 'react';
import axios from 'axios';

type NotasProps = {
    id: number;
    tipo: string;
    titulo: string;
    contenido: string;
    fechaCreacion: Date;
};

export default function Notas() {
    const [notas, setNotas] = useState<NotasProps[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cargarNotas = async () => {
            try {
                const response = await axios.get('/api/tipsNotas');
                setNotas(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        cargarNotas();
    }, []);

    const handleActualizarNotas = async () => {
        try {
            const response = await axios.get('/api/tipsNotas');
            setNotas(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="w-full flex flex-col items-center py-4">
            <div className="w-4xl">
                <div className="flex justify-between mb-8">
                    <h1 className="text-3xl font-bold">Notas</h1>
                    <PostNote onNotaCreada={handleActualizarNotas} />
                </div>
                {notas.map((nota) => (
                    <div
                        className="flex justify-between p-4 bg-amber-200 rounded-2xl mb-4 items-center"
                        key={nota.id}
                    >
                        <p className="pr-8">{nota.contenido}</p>
                        <div className="flex gap-3">
                            <PutNote
                                onUpdate={handleActualizarNotas}
                                nota={nota}
                            />
                            <DeleteNote />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
