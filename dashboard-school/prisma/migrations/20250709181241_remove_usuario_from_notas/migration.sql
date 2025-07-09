/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `NotasRapidas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotasRapidas" DROP CONSTRAINT "NotasRapidas_usuario_id_fkey";

-- AlterTable
ALTER TABLE "NotasRapidas" DROP COLUMN "usuario_id";
