import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const {
            titulo,
            contenido = '',
            nota,
            tema_id,
            archivoUrl,
            tipo,
            fechaVencimiento,
        } = await req.json();

        if (!titulo || !nota || !tema_id || !tipo) {
            return NextResponse.json(
                { error: 'Faltan datos' },
                { status: 400 }
            );
        }

        const notaNueva = await prisma.notasExamenes.create({
            data: {
                titulo,
                contenido,
                nota: parseFloat(nota),
                tema: { connect: { id: Number(tema_id) } },
                fechaCreacion: new Date(),
                archivoUrl,
                fechaVencimiento: new Date(fechaVencimiento),
                tipo,
            },
        });

        return NextResponse.json(notaNueva);
    } catch (error) {
        console.error('Error al crear nota:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const tema_id = url.searchParams.get('tema_id');

    if (!tema_id) {
        return NextResponse.json({ error: 'Falta tema_id' }, { status: 400 });
    }

    try {
        const notas = await prisma.notasExamenes.findMany({
            where: { tema_id: Number(tema_id) },
        });
        return NextResponse.json(notas);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
