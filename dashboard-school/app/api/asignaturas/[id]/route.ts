import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const asignatura = await prisma.asignatura.findUnique({
        where: {
            id: params.id, // aquí usas el id recibido por params
        },
    });

    if (!asignatura) {
        return NextResponse.json(
            { error: 'Asignatura no encontrada' },
            { status: 404 }
        );
    }

    return NextResponse.json(asignatura);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await req.json();

        const asignaturaActualizada = await prisma.asignatura.update({
            where: { id },
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                profesor: data.profesor,
                color: data.color,
                creditos: Number(data.creditos),
                clasificacion: Number(data.clasificacion),
                semestre: data.semestre,
            },
        });

        return NextResponse.json(asignaturaActualizada);
    } catch (error) {
        console.error('❌ Error al actualizar asignatura:', error);
        return new NextResponse('Error interno del servidor', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        const deletedAsignatura = await prisma.asignatura.delete({
            where: { id },
        });
        return NextResponse.json(deletedAsignatura, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
