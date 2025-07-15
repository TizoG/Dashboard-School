"use client";
// components/MyCalendar.tsx

import "react-big-calendar/lib/css/react-big-calendar.css";
import MyCalendario from "./components/myCalendar";

// Define tu tipo para eventos

export default function Calendario() {
  return (
    <div className="p-4">
      <MyCalendario />
    </div>
  );
}
