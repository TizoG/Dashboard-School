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
import axios from "axios";
import { useEffect, useState } from "react";
import { MateriasItems } from "../Materias-items";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export const ButtonMaterias = () => {
  const [Open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("#A78BFA");
  const [profesor, setProfesor] = useState("");

  const handleSubmit = async () => {
    try {
      const base = MateriasItems.find(
        (m) => m.title.toLowerCase() === nombre.toLowerCase()
      );

      const response = await axios.post("/api/asignaturas", {
        nombre,
        descripcion,
        color,
        icon: base?.icon || "Book",
        profesor,
      });

      toast.success("Asignatura creada");

<<<<<<< HEAD
    return (
        <>
            <LiquidButton
                className="cursor-pointer shadow-md border border-gray-500 hover:border-white "
                onClick={() => setOpen(true)}
            >
                Añade Asignaturas
            </LiquidButton>
            <Dialog open={Open} onClose={() => setOpen(false)}>
                <DialogBackdrop />
=======
      console.log("Asignatura creada: ", response.data);
      // No hemos introducido el onAdd
      setNombre("");
      setDescripcion("");
      setOpen(false);
    } catch (error) {
      console.log("Error al crear la asignatura: ", error);
      toast.error(
        "Hubo un error al guardar la asignatura AQUI PONDREMOS CARTELES"
      );
    }
  };
>>>>>>> ed9cd9889c3332e58133fe621ba120e9165775d6

  return (
    <>
      <LiquidButton className="cursor-pointer" onClick={() => setOpen(true)}>
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
            <Input
              type="text"
              placeholder="Asignatura"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <span>Descripción:</span>
            <Textarea
              placeholder="Describe la asignatura"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <span>Profesor:</span>
            <Input
              type="text"
              placeholder="Profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
            />
            <span>Color:</span>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <span className="text-sm">{color}</span>
          </div>

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
