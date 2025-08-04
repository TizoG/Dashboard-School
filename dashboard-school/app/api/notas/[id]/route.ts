import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await req.json();

        const notaActualizada = await prisma.notasExamenes.update({
            where: { id },
            data: {
                titulo: data.titulo,
                contenido: data.contenido,
                nota: parseFloat(data.nota),
                archivoUrl: data.archivoUrl,
                fechaVencimiento: new Date(data.fechaVencimiento),
                tipo: data.tipo,
            },
        });
        return NextResponse.json(notaActualizada);
    } catch (error) {
        console.error('❌ Error al actualizar la nota:', error);
        return new NextResponse('Error interno del servidor', { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const nota = await prisma.notasExamenes.findUnique({
            where: { id },
        });

        if (!nota) {
            return new NextResponse('Nota no encontrada', { status: 404 });
        }

        return NextResponse.json(nota);
    } catch (error) {
        console.error('❌ Error al obtener la nota:', error);
        return new NextResponse('Error interno del servidor', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        const deletedNota = await prisma.notasExamenes.delete({
            where: { id },
        });
        return NextResponse.json(deletedNota, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
