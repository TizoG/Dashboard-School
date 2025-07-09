/*
  Warnings:

  - You are about to drop the column `asignatura_id` on the `NotasExamenes` table. All the data in the column will be lost.
  - Added the required column `tema_id` to the `NotasExamenes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotasExamenes" DROP CONSTRAINT "NotasExamenes_asignatura_id_fkey";

-- AlterTable
ALTER TABLE "NotasExamenes" DROP COLUMN "asignatura_id",
ADD COLUMN     "tema_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "NotasExamenes" ADD CONSTRAINT "NotasExamenes_tema_id_fkey" FOREIGN KEY ("tema_id") REFERENCES "Temario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
