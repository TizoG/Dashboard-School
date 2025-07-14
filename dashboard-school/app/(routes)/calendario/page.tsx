'use client';
// components/MyCalendar.tsx
import {
    Calendar,
    dateFnsLocalizer,
    Event as RbcEvent,
} from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MyCalendario from './components/myCalendar';

// Define tu tipo para eventos
interface MyEvent extends RbcEvent {
    title: string;
    start: Date;
    end: Date;
    description?: string;
}

const locales = {
    es: es,
};

export default function Calendario() {
    return (
        <div className="p-4">
            <MyCalendario />
        </div>
    );
}
