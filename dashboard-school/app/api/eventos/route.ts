import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const eventos = await prisma.evento.findMany();

    // Transforma los datos para el calendario
    const eventosFormateados = eventos.map((e) => ({
        id: e.id,
        title: e.titulo, // OJO: `title` y no `titulo` si quieres que se vea
        start: e.fechaInicio,
        end: e.fechaFin,
        descripcion: e.descripcion,
    }));

    return NextResponse.json(eventosFormateados);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { titulo, descripcion, fechaInicio, fechaFin } = body;
        if (!titulo || !fechaInicio || !fechaFin) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }
        const evento = await prisma.evento.create({
            data: {
                titulo,
                descripcion,
                fechaInicio,
                fechaFin,
            },
        });
        return NextResponse.json(evento, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear el evento' },
            { status: 500 }
        );
    }
}
