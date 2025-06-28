'use client';

import {
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@/components/animate-ui/headless/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { LuPen } from 'react-icons/lu';

export const PutNote = () => {
    const [Open, setOpen] = useState(false);
    return (
        <>
            <Button
                variant={'ghost'}
                className="cursor-pointer hover:scale-[1.2] hover:bg-transparent "
                onClick={() => setOpen(true)}
            >
                <LuPen />
                <Dialog open={Open} onClose={() => setOpen(false)}>
                    <DialogBackdrop />

                    <DialogPanel>
                        <DialogHeader>
                            <DialogTitle>Titulo</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-2">
                            <span>Titulo:</span>
                            <Input
                                type="text"
                                placeholder="Titulo de la tarea"
                            />
                            <span>Descripcion:</span>
                            <Textarea placeholder="Describe la tarea" />
                        </div>

                        <DialogFooter>
                            <Button
                                variant={'outline'}
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button onClick={() => setOpen(false)}>
                                Guardar
                            </Button>
                        </DialogFooter>
                    </DialogPanel>
                </Dialog>
            </Button>
        </>
    );
};
