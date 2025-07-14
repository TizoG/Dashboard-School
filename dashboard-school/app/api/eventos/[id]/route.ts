import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    { params }: { params: { id: number } }
) {
    const { id } = params;
    const body = await req.json();
    const { titulo, descripcion, fechaInicio, fechaFin } = body;

    const update = await prisma.evento.update({
        where: { id },
        data: {
            titulo,
            descripcion,
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
        },
    });

    return NextResponse.json(update, { status: 200 });
}

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        await prisma.evento.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error eliminando evento:', error);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
