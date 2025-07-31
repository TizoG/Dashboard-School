/*
  Warnings:

  - Added the required column `clasificacion` to the `Asignatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `Asignatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asignatura" ADD COLUMN     "clasificacion" INTEGER NOT NULL,
ADD COLUMN     "semestre" TEXT NOT NULL;
