/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `NotasExamenes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotasExamenes" DROP CONSTRAINT "NotasExamenes_usuario_id_fkey";

-- AlterTable
ALTER TABLE "NotasExamenes" DROP COLUMN "usuario_id";
