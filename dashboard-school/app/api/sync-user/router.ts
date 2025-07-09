import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req); // Clerk ID (clerkId)

    if (!userId) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // Buscar en base de datos si ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { clerkId: userId },
    });

    if (usuarioExistente) {
        return NextResponse.json({ status: 'ok' });
    }

    // Obtener los datos reales del usuario desde Clerk
    const clerkUser = await clerkClient.users.getUser(userId);
    const nombre =
        (clerkUser.firstName || '') + ' ' + (clerkUser.lastName || '');

    // Crear usuario en la base de datos
    await prisma.usuario.create({
        data: {
            clerkId: userId,
            nombre: nombre.trim() || 'Sin nombre',
            rol: 'ALUMNO',
        },
    });

    return NextResponse.json({ status: 'creado' });
}
