'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Asignatura = {
    id: number;
    onDelete: (id: number) => void;
};

export function ButtomDelete({ id, onDelete }: Asignatura) {
    console.log('este es el id recibido', id);
    const handleSubmit = async () => {
        const res = await fetch(`/api/asignaturas/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            toast.success('Asignatura eliminada');
            onDelete(id);
        } else {
            toast.error('Error al eliminar la asignatura');
        }
    };
    return (
        <Button size={'sm'} variant={'ghost'} onClick={handleSubmit}>
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
