'use client';

import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
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
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export const ButtonTodo = () => {
    const [Open, setOpen] = useState(false);
    return (
        <>
            <LiquidButton
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Añadir tarea
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Nueva Tarea</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <span>Titulo:</span>
                        <Input type="text" placeholder="Titulo de la tarea" />
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
                        <Button type="submit" onClick={() => setOpen(false)}>
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogPanel>
            </Dialog>
        </>
    );
};
