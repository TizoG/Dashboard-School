import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      titulo,
      descripcion,
      tipo,
      estado,
      asignatura,
      prioridad,
      fechaVencimiento,
    } = body;
    if (
      !titulo ||
      !descripcion ||
      !tipo ||
      !estado ||
      !asignatura ||
      !prioridad ||
      !fechaVencimiento
    ) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }
    console.log("Datos recibidos:", {
      titulo,
      descripcion,
      tipo,
      estado,
      asignatura,
      prioridad,
      fechaVencimiento,
    });

    const tareaNueva = await prisma.tareas.create({
      data: {
        titulo,
        descripcion,
        tipo,
        estado,
        asignatura,
        prioridad,
        fechaVencimiento: new Date(`${fechaVencimiento}T00:00:00`),
      },
    });
    return NextResponse.json({ message: "Tarea creada" }, { status: 200 });
  } catch (error) {
    console.error("Error al crear la tarea:", error); // 🔍 imprime el error real
    return NextResponse.json(
      { error: "Error al crear la tarea" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tareas = await prisma.tareas.findMany({
      orderBy: {
        fechaVencimiento: "asc",
      },
    });
    return NextResponse.json(tareas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las tareas" },
      { status: 500 }
    );
  }
}
