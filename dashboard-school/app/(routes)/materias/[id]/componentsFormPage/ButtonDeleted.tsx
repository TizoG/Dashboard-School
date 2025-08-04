'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
    id: number;
    onDelete?: (id: number) => void;
};

export const ButtomDelete = ({ id, onDelete }: Props) => {
    const handleDelete = async () => {
        const res = await axios.delete(`/api/notas/${id}`);
        if (onDelete) {
            await onDelete(id);
        }

        if (res.status === 200) {
            toast.success('Nota eliminada');
        } else {
            toast.error('Error al eliminar la nota');
        }
    };

    return (
        <Button variant={'ghost'} onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
        </Button>
    );
};
