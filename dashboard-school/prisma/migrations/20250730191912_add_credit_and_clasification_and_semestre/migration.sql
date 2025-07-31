/*
  Warnings:

  - Added the required column `creditos` to the `Asignatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asignatura" ADD COLUMN     "creditos" INTEGER NOT NULL;
