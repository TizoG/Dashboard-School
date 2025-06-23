import { IoHome, IoSettingsOutline } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaChalkboardTeacher, FaRegFileAlt, FaTasks } from 'react-icons/fa';
import { FaCalendarDays, FaRegNoteSticky } from 'react-icons/fa6';
import { RiProgress6Fill } from 'react-icons/ri';
import { ROUTES } from '@/lib/routes';
import { HiUserGroup } from 'react-icons/hi';

export const Items = [
    {
        title: 'Inicio',
        icon: IoHome,
        href: ROUTES.home,
    },
    {
        title: 'Materias',
        icon: ImBook,
        href: ROUTES.materias,
    },
    {
        title: 'Tareas',
        icon: FaTasks,
        href: ROUTES.tareas,
    },
    {
        title: 'Notas',
        icon: FaRegNoteSticky,
        href: ROUTES.notas,
    },
    {
        title: 'Calendario',
        icon: FaCalendarDays,
        href: ROUTES.calendario,
    },
    {
        title: 'Archivos',
        icon: FaRegFileAlt,
        href: ROUTES.archivos,
    },
    {
        title: 'Progreso',
        icon: RiProgress6Fill,
        href: ROUTES.progreso,
    },
    {
        title: 'Profesores',
        icon: FaChalkboardTeacher,
        href: ROUTES.profesores,
    },
    {
        title: 'Foro',
        icon: HiUserGroup,
        href: ROUTES.foro,
    },
    {
        title: 'Configuraciones',
        icon: IoSettingsOutline,
        href: ROUTES.configuraciones,
    },
];
