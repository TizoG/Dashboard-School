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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { useState } from "react";
import { GoPlus } from "react-icons/go";

type PostNoteProps = {
  onNotaCreada?: () => void;
  onClick?: () => void;
  titulo: string;
};
export const PostNote = ({ onNotaCreada, titulo }: PostNoteProps) => {
  const [Open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/tipsNotas", {
        titulo: nombre,
        contenido,
        tipo,
      });
      onNotaCreada?.();
      setNombre("");
      setContenido("");
      setOpen(false);
    } catch (error) {
      alert("Aqui ira una tarjeta pero que sepas que a fallado");
    }
  };

  return (
    <>
      <LiquidButton
        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-[#2A9D8F]  rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
        onClick={() => setOpen(true)}
      >
        <GoPlus size={18} />
        {titulo}
      </LiquidButton>
      <Dialog open={Open} onClose={() => setOpen(false)}>
        <DialogBackdrop />

        <DialogPanel>
          <DialogHeader>
            <DialogTitle>Nota</DialogTitle>
          </DialogHeader>

          <div>
            <span>Titulo:</span>
            <Input
              type="text"
              placeholder="Introduce el titulo del tema"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <span>Contenido:</span>
            <Textarea
              placeholder="Pequeño resumen del tema"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
            <span>Tipo:</span>
            <Select value={tipo} onValueChange={(value) => setTipo(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RAPIDA">Rapida</SelectItem>
                <SelectItem value="MONS">Mensuales</SelectItem>
              </SelectContent>
            </Select>
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
