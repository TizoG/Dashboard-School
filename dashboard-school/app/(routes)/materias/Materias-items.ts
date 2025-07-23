import { FaCode, FaDatabase, FaLaptopCode } from "react-icons/fa";
import { FaArrowUpFromBracket, FaRegLightbulb } from "react-icons/fa6";
import { TbServerCog } from "react-icons/tb";
import { BsWindowFullscreen } from "react-icons/bs";

export const MateriasItems = [
  {
    title: "Programación",
    href: "/materias/programacion",
    icon: FaCode,
    color: "bg-violet-700",
    profesor: "Pepito",
    colorIcon: "text-violet-400",
    gradient: "linear-gradient(135deg, #6D28D9, #6D28D9CC)",
  },
  {
    title: "Base de datos",
    href: "/materias/base-de-datos",
    icon: FaDatabase,
    color: "bg-indigo-500",
    profesor: "Pepito",
    colorIcon: "text-sky-400",
    gradient: "linear-gradient(135deg, #4338CA, #4338CACC)",
  },
  {
    title: "Desarrollo web en Entorno Cliente",
    href: "/materias/desarrollo-web-en-entorno-cliente",
    icon: FaLaptopCode,
    color: "bg-blue-600",
    profesor: "Pepito",
    colorIcon: "text-blue-400",
    gradient: "linear-gradient(135deg, #2563EB, #2563EBCC)",
  },
  {
    title: "Desarrollo web en Entorno Servidor",
    href: "/materias/desarrollo-web-en-entorno-servidor",
    icon: TbServerCog,
    color: "bg-purple-700",
    profesor: "Pepito",
    colorIcon: "text-purple-400",
    radient: "linear-gradient(135deg, #6B21A8, #6B21A8CC)",
  },
  {
    title: "Despliegue de aplicaciones web",
    href: "/materias/despliegue-de-aplicaciones-web",
    icon: FaArrowUpFromBracket,
    color: "bg-green-700",
    profesor: "Pepito",
    colorIcon: "text-green-400",
    gradient: "linear-gradient(135deg, #15803D, #15803DCC)",
  },
  {
    title: "Diseño de interfaces web",
    href: "/materias/diseno-de-interfaces-web",
    icon: BsWindowFullscreen,
    color: "bg-red-400",
    profesor: "Pepito",
    colorIcon: "text-red-200",
    gradient: "linear-gradient(135deg, #F87171, #F87171CC)",
  },
  {
    title: "Empresa e Iniciativa empresarial",
    href: "/materias/empresa-e-iniciativa-empresarial",
    icon: FaRegLightbulb,
    color: "bg-yellow-500",
    profesor: "Pepito",
    colorIcon: "text-yellow-300",
    gradient: "linear-gradient(135deg, #EAB308, #EAB308CC)",
  },
  {
    title: "Proyecto de desarrollo de aplicaciones web",
    href: "/materias/proyecto-de-desarrollo-de-aplicaciones-web",
    icon: FaRegLightbulb,
    color: "bg-slate-700",
    profesor: "Pepito",
    colorIcon: "text-slate-400",
    gradient: "linear-gradient(135deg, #334155, #334155CC)",
  },
];
