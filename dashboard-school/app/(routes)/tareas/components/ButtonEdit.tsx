import {
    Dialog,
    DialogBackdrop,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogTitle,
} from '@/components/animate-ui/headless/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tareas } from '@/lib/generated/prisma';
import axios from 'axios';
import { set } from 'date-fns';
import { SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LuPen } from 'react-icons/lu';

type TareasProps = {
    tarea: {
        id: number;
        titulo: string;
        descripcion: string;
        tipo: string;
        estado: string;
        asignatura: string;
        prioridad: string;
        fechaVencimiento: string;
    };
    onUpdate?: () => void;
};
export const ButtonEdit = ({
    tareaId,
    onUpdate,
}: {
    tareaId: number;
    onUpdate?: (tarea: TareasProps) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [asignatura, setAsignatura] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    useEffect(() => {
        if (open) {
            axios.get(`/api/tareas/${tareaId}`).then((res) => {
                setTitulo(res.data.titulo ?? '');
                setDescripcion(res.data.descripcion ?? '');
                setTipo(res.data.tipo ?? '');
                setEstado(res.data.estado ?? '');
                setAsignatura(res.data.asignatura ?? '');
                setPrioridad(res.data.prioridad ?? '');
                setFechaVencimiento(res.data.fechaVencimiento ?? '');
            });
        }
    }, [open]);

    const handleSubmit = async () => {
        try {
            const res = await axios.put(`/api/tareas/${tareaId}`, {
                titulo,
                descripcion,
                tipo,
                estado,
                asignatura,
                prioridad,
                fechaVencimiento,
            });

            setTitulo('');
            setDescripcion('');
            setTipo('');
            setEstado('');
            setAsignatura('');
            setPrioridad('');
            setFechaVencimiento('');
            setOpen(false);

            if (onUpdate) {
                onUpdate(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant={'ghost'} onClick={() => setOpen(true)}>
                <SquarePen />
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Actualiza la Tarea</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <span>Titulo:</span>
                        <Input
                            type="text"
                            value={titulo}
                            placeholder="Titulo de la tarea"
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        <span>asignatura:</span>
                        <Input
                            value={asignatura}
                            type="text"
                            placeholder="Titulo de la tarea"
                            onChange={(e) => setAsignatura(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <div>
                                <span>Estado:</span>
                                <Select
                                    value={estado}
                                    onValueChange={setEstado}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Estados</SelectLabel>
                                            <SelectItem value="PENDIENTE">
                                                Pendiente
                                            </SelectItem>
                                            <SelectItem value="EN_PROCESO">
                                                En proceso
                                            </SelectItem>
                                            <SelectItem value="COMPLETADA">
                                                Completado
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <span>Prioridad:</span>
                                <Select
                                    value={prioridad}
                                    onValueChange={setPrioridad}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione una prioridad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Prioridades
                                            </SelectLabel>
                                            <SelectItem value="BAJA">
                                                Baja
                                            </SelectItem>
                                            <SelectItem value="MEDIA">
                                                Media
                                            </SelectItem>
                                            <SelectItem value="ALTA">
                                                Alta
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <span>tipo:</span>
                                <Select value={tipo} onValueChange={setTipo}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tarea</SelectLabel>
                                            <SelectItem value="tarea">
                                                Tarea
                                            </SelectItem>
                                            <SelectItem value="examen">
                                                Examen
                                            </SelectItem>
                                            <SelectItem value="proyecto">
                                                Proyecto
                                            </SelectItem>
                                            <SelectItem value="actividad">
                                                Actividad
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <span>Fecha de vencimiento:</span>
                                <Input
                                    type="date"
                                    value={fechaVencimiento}
                                    placeholder="Titulo de la tarea"
                                    onChange={(e) =>
                                        setFechaVencimiento(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <span>Descripcion:</span>
                        <Textarea
                            placeholder="Describe la tarea"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant={'outline'}
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogPanel>
            </Dialog>
        </>
    );
};

export const ChangeEstado = ({
    id,
    onUpdate,
}: {
    id: Number;
    onUpdate?: (tarea: TareasProps) => void;
}) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [asignatura, setAsignatura] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    useEffect(() => {
        axios.get(`/api/tareas/${id}`).then((res) => {
            setTitulo(res.data.titulo ?? '');
            setDescripcion(res.data.descripcion ?? '');
            setTipo(res.data.tipo ?? '');
            setEstado(res.data.estado ?? '');
            setAsignatura(res.data.asignatura ?? '');
            setPrioridad(res.data.prioridad ?? '');
            setFechaVencimiento(res.data.fechaVencimiento ?? '');
        });
    }, []);
    const seteoEstado = async () => {
        const rest = await axios.put(`/api/tareas/${id}`, {
            titulo,
            descripcion,
            tipo,
            estado: 'EN_PROCESO',
            asignatura,
            prioridad,
            fechaVencimiento,
        });

        console.log('Estado actualizado:', rest.data);
        setEstado(rest.data.estado);
        if (onUpdate) {
            onUpdate(rest.data);
        }
    };

    return (
        <Button
            value={estado}
            onClick={seteoEstado}
            variant={'outline'}
            size={'sm'}
            className="cursor-pointer"
        >
            Iniciar
        </Button>
    );
};
export const ChangeEstadoCompletado = ({
    id,
    onUpdate,
}: {
    id: Number;
    onUpdate?: (tarea: TareasProps) => void;
}) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [asignatura, setAsignatura] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    useEffect(() => {
        axios.get(`/api/tareas/${id}`).then((res) => {
            setTitulo(res.data.titulo ?? '');
            setDescripcion(res.data.descripcion ?? '');
            setTipo(res.data.tipo ?? '');
            setEstado(res.data.estado ?? '');
            setAsignatura(res.data.asignatura ?? '');
            setPrioridad(res.data.prioridad ?? '');
            setFechaVencimiento(res.data.fechaVencimiento ?? '');
        });
    }, []);
    const seteoEstado = async () => {
        const rest = await axios.put(`/api/tareas/${id}`, {
            titulo,
            descripcion,
            tipo,
            estado: 'COMPLETADA',
            asignatura,
            prioridad,
            fechaVencimiento,
        });

        console.log('Estado actualizado:', rest.data);
        setEstado(rest.data.estado);
        if (onUpdate) {
            onUpdate(rest.data);
        }
    };

    return (
        <Button
            value={estado}
            onClick={seteoEstado}
            variant={'outline'}
            size={'sm'}
            className="cursor-pointer"
        >
            Marcar como completada
        </Button>
    );
};
