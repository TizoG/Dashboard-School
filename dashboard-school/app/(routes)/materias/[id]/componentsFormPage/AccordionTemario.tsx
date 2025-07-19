"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/radix/accordion";
import { ButtonFormNota } from "./ButtonFormNota";

type NotaExamen = {
  id: number;
  titulo: string;
  contenido: string | null;
  nota: number;
};

type Tema = {
  id: number;
  titulo: string;
  contenido: string | null;
  notasExamenes: NotaExamen[];
};
export const AccordionTemario = ({
  temas,
  usuarioId,
}: {
  temas: Tema[];
  usuarioId: string;
}) => {
  return (
    <Accordion type="single" collapsible>
      {temas.map((tema) => (
        <AccordionItem key={tema.id} value={tema.id.toString()}>
          <AccordionTrigger className="cursor-pointer">
            {tema.titulo}
          </AccordionTrigger>
          <AccordionContent>
            <table className="w-full  table-auto border border-gray-400 rounded-2xl">
              <thead className="bg-[rgba(144,160,140,0.4)] ">
                <tr>
                  <th className="w-1/4 px-4 py-2 text-left">Titulo</th>
                  <th className="w-1/4 px-4 py-2 text-left">Nota</th>
                  <th className="w-1/4 px-4 py-2 text-left">Anotación</th>
                  <th className="w-1/4 px-4 py-2 text-left">Archivos</th>
                </tr>
              </thead>
              <tbody>
                {tema.notasExamenes.map((nota) => (
                  <tr key={nota.id} className="hover:bg-gray-200 ">
                    <td className="w-1/4 px-5 py-2">{nota.titulo}</td>
                    <td className="w-1/4 px-5 py-2">{nota.nota}</td>
                    <td className="w-1/4 px-5 py-2">{nota.contenido}</td>
                    <td className="w-1/4 px-5 py-2">nombre archivo</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-2 text-gray-600">{tema.contenido}</p>
            <ul className="mb-4">
              {tema.notasExamenes.map((nota) => (
                <li key={nota.id} className="mb-1">
                  <strong>{nota.titulo}:</strong> {nota.nota} - {nota.contenido}
                </li>
              ))}
            </ul>
            <ButtonFormNota temaId={tema.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// Verde azulado suave <thead className="bg-[rgba(45,107,104,0.4)] text-black">
// Azul acero claro <thead className="bg-[rgba(106,121,153,0.4)] text-black">
// Verde oliva <thead className="bg-[rgba(144,160,140,0.4)] text-black">
