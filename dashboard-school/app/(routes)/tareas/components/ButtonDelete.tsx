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
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LuPen } from 'react-icons/lu';
import { toast } from 'sonner';

type TareasProps = {
    id: number;
    onDelete?: () => void;
};
export const ButtonDelete = ({
    id,
    onDelete,
}: {
    id: number;
    onDelete?: (tarea: number) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [asignatura, setAsignatura] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/tareas/${id}`);

            if (onDelete) {
                await onDelete(id);
            }

            if (res.status === 200) {
                toast.success('Tarea eliminada');
            } else {
                toast.error('Error al eliminar la tarea');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant={'ghost'} onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </>
    );
};
