import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { asignatura_id, titulo, contenido, enlace } = body;
        if (!titulo || !asignatura_id) {
            return NextResponse.json(
                { error: 'Faltan datos' },
                { status: 400 }
            );
        }

        const nuevoTemario = await prisma.temario.create({
            data: {
                asignatura_id: Number(asignatura_id),
                titulo,
                contenido,
                enlace,
            },
        });

        return NextResponse.json(nuevoTemario, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const asignatura_id = searchParams.get('asignatura_id');

    if (!asignatura_id) {
        return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    const temas = await prisma.temario.findMany({
        where: {
            asignatura_id: Number(asignatura_id),
        },
        orderBy: {
            id: 'asc',
        },
    });
    return NextResponse.json(temas);
}
