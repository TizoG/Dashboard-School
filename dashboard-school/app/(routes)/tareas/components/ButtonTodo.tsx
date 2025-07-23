"use client";

import { LiquidButton } from "@/components/animate-ui/buttons/liquid";
import {
  Dialog,
  DialogBackdrop,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/components/animate-ui/headless/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const ButtonTodo = () => {
  const [Open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const handleSubmit = async () => {
    try {
      const reponse = await axios.post("/api/tareas", {
        titulo,
        asignatura,
        descripcion,
        tipo,
        estado,
        prioridad,
        fechaVencimiento,
      });

      toast.success("Tarea creada", { duration: 3000 });
    } catch (error) {
      console.log(error);
      toast.error("Error al crear la tarea");
    }

    setOpen(false);
    setTitulo("");
    setAsignatura("");
    setTipo("");
    setEstado("");
    setDescripcion("");
    setPrioridad("");
    setFechaVencimiento("");
  };
  return (
    <>
      <LiquidButton className="cursor-pointer" onClick={() => setOpen(true)}>
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
            <span>Estado:</span>
            <Input
              value={estado}
              type="text"
              placeholder="Titulo de la tarea"
              onChange={(e) => setEstado(e.target.value)}
            />
            <span>Prioridad:</span>
            <Input
              value={prioridad}
              type="text"
              placeholder="Titulo de la tarea"
              onChange={(e) => setPrioridad(e.target.value)}
            />
            <span>tipo:</span>
            <Input
              type="text"
              value={tipo}
              placeholder="Titulo de la tarea"
              onChange={(e) => setTipo(e.target.value)}
            />
            <span>Fecha de vencimiento:</span>
            <Input
              type="date"
              value={fechaVencimiento}
              placeholder="Titulo de la tarea"
              onChange={(e) => setFechaVencimiento(e.target.value)}
            />
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
          <DialogFooter>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
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
