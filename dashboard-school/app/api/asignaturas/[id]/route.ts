import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

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
