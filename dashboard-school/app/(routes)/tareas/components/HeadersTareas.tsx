import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useState } from 'react';

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

type HeadersTareasProps = {
    tareas: TareasProps[];
    onFiltrar: (filtro: { estado?: string; prioridad?: string }) => void;
};
export const HeadersTareas = ({ tareas, onFiltrar }: HeadersTareasProps) => {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<
        string | undefined
    >();

    const [prioridadSeleccionada, setPrioridadSeleccionada] = useState<
        string | undefined
    >();

    const manejarFiltro = () => {
        onFiltrar({
            estado: estadoSeleccionado,
            prioridad: prioridadSeleccionada,
        });
    };
    return (
        <section>
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <Select
                        onValueChange={(value) => {
                            setEstadoSeleccionado(value);
                            onFiltrar({ estado: value });
                        }}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                Todas los estados
                            </SelectItem>
                            <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                            <SelectItem value="EN_PROCESO">
                                En Proceso
                            </SelectItem>
                            <SelectItem value="COMPLETADA">
                                Completada
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) => {
                            setPrioridadSeleccionada(value);
                            onFiltrar({ estado: value });
                        }}
                    >
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Filtrar por prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                Todas las prioridades
                            </SelectItem>
                            <SelectItem value="BAJA">Baja</SelectItem>
                            <SelectItem value="MEDIA">Media</SelectItem>
                            <SelectItem value="ALTA">Alta</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={manejarFiltro}>Filtrar</Button>
            </div>
        </section>
    );
};
