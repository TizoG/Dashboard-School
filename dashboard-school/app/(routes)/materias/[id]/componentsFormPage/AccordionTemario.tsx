"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/radix/accordion";
import { ButtonFormNota } from "./ButtonFormNota";
import { FaGoogleDrive } from "react-icons/fa";

type NotaExamen = {
  id: number;
  titulo: string;
  contenido: string | null;
  nota: number;
  archivoUrl: string | null;
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
    <>
      <Accordion type="single" collapsible>
        {temas.map((tema) => (
          <AccordionItem key={tema.id} value={tema.id.toString()}>
            <AccordionTrigger className="cursor-pointer">
              {tema.titulo}
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2 text-gray-600">{tema.contenido}</p>
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
                      <td className="w-1/4 px-5 py-2">
                        {nota.archivoUrl ? (
                          <a
                            href={nota.archivoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600  hover:underline"
                          >
                            <FaGoogleDrive className="text-green-600" />
                            Ver archivo
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">
                            No disponible
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ButtonFormNota temaId={tema.id} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

// Verde azulado suave <thead className="bg-[rgba(45,107,104,0.4)] text-black">
// Azul acero claro <thead className="bg-[rgba(106,121,153,0.4)] text-black">
// Verde oliva <thead className="bg-[rgba(144,160,140,0.4)] text-black">
