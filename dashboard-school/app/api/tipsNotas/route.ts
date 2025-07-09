import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tipo, titulo, contenido } = body;
        if (!tipo || !titulo || !contenido) {
            return NextResponse.json(
                { error: 'Faltan datos' },
                { status: 400 }
            );
        }

        const nuevaNota = await prisma.notasRapidas.create({
            data: {
                tipo,
                titulo,
                contenido,
                fechaCreacion: new Date(),
            },
        });

        return NextResponse.json(nuevaNota, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear la nota' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const notas = await prisma.notasRapidas.findMany();
    return NextResponse.json(notas);
}
