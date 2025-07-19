/*
  Warnings:

  - Added the required column `asignatura` to the `Tareas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Tareas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tareas" ADD COLUMN     "asignatura" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;
