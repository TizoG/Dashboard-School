"use client";
import { MateriasItems } from "./Materias-items";
import Link from "next/link";
import { ButtonMaterias } from "./components/ButtonMaterias";
import { useEffect, useState } from "react";
import axios from "axios";

type Asignatura = {
  id: number;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  profesor: string;
};

function getMateriaVisuales(nombre: string) {
  const item = MateriasItems.find(
    (materia) => materia.title.toLowerCase() === nombre.toLowerCase()
  );
  return item
    ? { icon: item.icon, color: item.color, colorIcon: item.colorIcon }
    : {
        icon: () => <span className="text-6xl">📚</span>,
        color: "bg-gray-300",
        colorIcon: "text-gray-500",
      };
}

export default function Materias() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/asignaturas")
      .then((res) => setAsignaturas(res.data))
      .catch((err) =>
        setError(err?.message || "Error al cargar las asignaturas")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando asignaturas...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <section className="p-4">
      <div className="bg-white p-4 rounded-sm flex justify-end">
        <ButtonMaterias />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {asignaturas.map((asignatura) => {
          const {
            icon: Icon,
            color,
            colorIcon,
          } = getMateriaVisuales(asignatura.nombre);

          return (
            <Link
              key={asignatura.id}
              href={`/materias/${asignatura.id}`}
              className="inline-block flex-col hover:scale-[1.03] transform transition-transform ease-out duration-200 hover:shadow-lg"
            >
              <div>
                <div
                  className={`${color} w-full flex justify-center items-center p-2 rounded-t-lg gap-9`}
                >
                  <div>
                    <h2 className="p-2 text-3xl text-white">
                      {asignatura.nombre}
                    </h2>
                  </div>
                  <Icon className={`${colorIcon} text-7xl`} />
                </div>
                <div className="bg-white rounded-b-lg w-full p-4">
                  <p className="text-xl mb-1">{asignatura.descripcion}</p>
                  <span className="text-lg text-gray-700">
                    Prof. {asignatura.profesor}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
