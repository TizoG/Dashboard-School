"use client";
import { MateriasItems } from "./Materias-items";
import Link from "next/link";
import { ButtonMaterias } from "./components/ButtonMaterias";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";

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
    ? {
        icon: item.icon,
        color: item.color,
        colorIcon: item.colorIcon,
        gradient: item.gradient,
      }
    : {
        icon: () => <BookOpen className="text-6xl text-[#556b2f]" />,
        gradient: "linear-gradient(135deg, #556b2f, #8f9779)", // De verde oliva oscuro a verde oliva grisáceo
        colorIcon: "text-olive-700",
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
    <section className="p-4 max-w-7xl mx-auto">
      {/* Botón arriba */}
      <div className="bg-white p-4 rounded-sm flex justify-end">
        <ButtonMaterias />
      </div>

      {/* Cards + Estadísticas */}
      <div className="mt-4 grid lg:grid-cols-[2fr_1fr] gap-4">
        {/* Cards con máx 2 por fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {asignaturas.map((asignatura) => {
            const {
              icon: Icon,
              color,
              colorIcon,
              gradient,
            } = getMateriaVisuales(asignatura.nombre);

            return (
              <Link
                key={asignatura.id}
                href={`/materias/${asignatura.id}`}
                style={{ backgroundImage: gradient }}
                className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 rounded-3xl p-6 h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start mb-4">
                      <h3 className="text-xl text-white font-bold mb-1 text-balance">
                        {asignatura.nombre}
                      </h3>
                      <p className="text-sm text-white/80">
                        {asignatura.profesor}
                      </p>
                    </div>
                    <div>
                      <Icon className={`${colorIcon} text-4xl opacity-40`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 text-sm font-medium">
                      {asignatura.descripcion}
                    </span>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">Total </span>
                <span className=" text-gray-600 text-sm">asignaturas</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Examenes</p>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
            </div>
            <div className="flex justify-between items center">
              <div className="text-3xl font-bold text-blue-600">
                {asignaturas.length.toString().padStart(2, "0")}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {asignaturas.length.toString().padStart(2, "0")}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Tareas </p>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Tareas</p>
                <p className="text-sm text-gray-600">En Progreso</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-blue-600">
                {asignaturas.length.toString().padStart(2, "0")}
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {asignaturas.length.toString().padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
