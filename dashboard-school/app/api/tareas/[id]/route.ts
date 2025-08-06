import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await req.json();

        const tareaActualizada = await prisma.tareas.update({
            where: { id },
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                tipo: data.tipo,
                estado: data.estado,
                asignatura: data.asignatura,
                prioridad: data.prioridad,
                fechaVencimiento: new Date(data.fechaVencimiento),
            },
        });
        return NextResponse.json(tareaActualizada);
    } catch (error) {
        console.error('❌ Error al actualizar la tarea:', error);
        return new NextResponse('Error interno del servidor', { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tareas = await prisma.tareas.findUnique({
        where: {
            id: Number(params.id), // aquí usas el id recibido por params
        },
    });

    if (!tareas) {
        return NextResponse.json(
            { error: 'Tarea no encontrada' },
            { status: 404 }
        );
    }

    return NextResponse.json(tareas);
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        const delteTarea = await prisma.tareas.delete({
            where: { id },
        });
        return NextResponse.json(delteTarea, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
