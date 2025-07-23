// app/(router)/materias/[id]/page.tsx
export const dynamic = "force-dynamic";

export const dynamicParams = true;

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MateriaPageClient from "./componentsFormPage/MateriaPageClient";

export default async function MateriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return notFound();
  const asignatura = await prisma.asignatura.findUnique({
    where: { id: numericId },
    include: {
      temario: {
        include: {
          notasExamenes: true,
        },
      },
    },
  });

  if (!asignatura) return notFound();

  return <MateriaPageClient asignatura={asignatura} />;
}
