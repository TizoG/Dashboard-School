import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { nombre, descripcion } = await req.json();
        if (!nombre || typeof nombre !== 'string') {
            return new NextResponse('Nombre inválido', { status: 401 });
        }

        const asignatura = await prisma.asignatura.create({
            data: {
                usuario_id: userId,
                nombre,
                descripcion,
            },
        });
        return NextResponse.json(asignatura, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server Error', { status: 500 });
    }
}

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const asignatura = await prisma.asignatura.findMany({
        where: { usuario_id: userId },
        orderBy: { fechaCreacion: 'desc' },
    });
    return NextResponse.json(asignatura, { status: 200 });
}
