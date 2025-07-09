/*
  Warnings:

  - You are about to alter the column `nota` on the `NotasExamenes` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "NotasExamenes" ALTER COLUMN "nota" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "NotasExamenes" ADD CONSTRAINT "NotasExamenes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
