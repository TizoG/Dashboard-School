import {
  Calendar,
  dateFnsLocalizer,
  Event as RbcEvent,
} from "react-big-calendar";

export interface MyEvent extends RbcEvent {
  id: string;
  titulo: string;
  fechaInicio: Date;
  fechaFin: Date;
  descripcion: string;
}
