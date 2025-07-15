-- CreateEnum
CREATE TYPE "TipoMime" AS ENUM ('PDF', 'PNG', 'TXT', 'JPG', 'DOC', 'DOCX', 'GIF', 'JPEG');

-- CreateTable
CREATE TABLE "Archivos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoMime" "TipoMime" NOT NULL,
    "url" TEXT NOT NULL,
    "fechaSubida" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asignatura_id" INTEGER NOT NULL,

    CONSTRAINT "Archivos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Archivos" ADD CONSTRAINT "Archivos_asignatura_id_fkey" FOREIGN KEY ("asignatura_id") REFERENCES "Asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
