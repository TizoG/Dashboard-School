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

import { useState } from 'react';

export const ButtonMaterias = () => {
    const [Open, setOpen] = useState(false);
    return (
        <>
            <LiquidButton
                className="cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Añade Asignaturas
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />

                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Asignatura</DialogTitle>
                    </DialogHeader>

                    <div>
                        <span>Asignatura:</span>
                        <Input type="text" placeholder="Asignatura" />
                        <span>Profesor:</span>
                        <Input type="text" placeholder="Profesor" />
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
