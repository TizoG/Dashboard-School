-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ALUMNO', 'PROFESOR');

-- CreateEnum
CREATE TYPE "TipoNota" AS ENUM ('RAPIDA', 'MONS');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('PENDIENTE', 'COMPLETADA');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('BAJA', 'MEDIA', 'ALTA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "nombre" TEXT,
    "rol" "Rol" NOT NULL DEFAULT 'ALUMNO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asignatura" (
    "id" SERIAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asignatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temario" (
    "id" SERIAL NOT NULL,
    "asignatura_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT,

    CONSTRAINT "Temario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotasExamenes" (
    "id" SERIAL NOT NULL,
    "asignatura_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "nota" DECIMAL NOT NULL,
    "contenido" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "NotasExamenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotasRapidas" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoNota" NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "NotasRapidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tareas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "Estado" NOT NULL,
    "prioridad" "Prioridad" NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_clerkId_key" ON "Usuario"("clerkId");

-- AddForeignKey
ALTER TABLE "Asignatura" ADD CONSTRAINT "Asignatura_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temario" ADD CONSTRAINT "Temario_asignatura_id_fkey" FOREIGN KEY ("asignatura_id") REFERENCES "Asignatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotasExamenes" ADD CONSTRAINT "NotasExamenes_asignatura_id_fkey" FOREIGN KEY ("asignatura_id") REFERENCES "Asignatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotasExamenes" ADD CONSTRAINT "NotasExamenes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotasRapidas" ADD CONSTRAINT "NotasRapidas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
