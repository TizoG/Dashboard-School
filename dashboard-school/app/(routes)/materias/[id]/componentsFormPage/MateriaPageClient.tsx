"use client";

import { useEffect, useState } from "react";

import { ButtonForm } from "./ButtonForm";

import { AccordionTemario } from "./AccordionTemario";
import axios from "axios";

type Asignatura = {
  id: number;
  nombre: string;
  descripcion: string | null;
  usuario_id: string;
  temario: Tema[];
};

type NotaExamen = {
  id: number;
  titulo: string;
  contenido: string | null;
  nota: number; // depende del tipo, aquí usas toString(), así que puede ser number o string
};
type Tema = {
  id: number;
  titulo: string;
  contenido: string | null;
  notasExamenes: NotaExamen[];
};

type Archivo = {
  id: number;
  titulo: string;
  url: string;
};

export default function MateriaPageClient({
  asignatura,
}: {
  asignatura: Asignatura;
}) {
  const [refresh, setRefresh] = useState(0); // Para forzar recarga del temario
  const [temas, setTemas] = useState<Tema[]>([]);

  useEffect(() => {
    const fetchTemas = async () => {
      const res = await axios.get(
        `/api/temario?asignatura_id=${asignatura.id}`
      );
      setTemas(res.data);
    };

    fetchTemas();
  }, [asignatura.id, refresh]);

  return (
    <section className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold mb-4">{asignatura.nombre}</h1>
        <div className="flex gap-4">
          <ButtonForm
            asignaturaId={asignatura.id}
            onTemaCreado={() => setRefresh((r) => r + 1)}
          />
        </div>
      </div>
      <p className="text-gray-600 mb-6">{asignatura.descripcion}</p>

      <h2 className="text-2xl font-semibold mb-2">Temario</h2>
      <AccordionTemario
        temas={asignatura.temario}
        usuarioId={asignatura.usuario_id}
      />
    </section>
  );
}
