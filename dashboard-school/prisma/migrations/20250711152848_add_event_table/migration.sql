/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Tareas` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updateAt` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Tareas" DROP CONSTRAINT "Tareas_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "usuario_id",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tareas" DROP COLUMN "usuario_id";

-- DropTable
DROP TABLE "Usuario";

-- DropEnum
DROP TYPE "Rol";
