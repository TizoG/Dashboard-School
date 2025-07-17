/*
  Warnings:

  - Added the required column `usuario_id` to the `Archivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Archivos" ADD COLUMN     "usuario_id" TEXT NOT NULL;
