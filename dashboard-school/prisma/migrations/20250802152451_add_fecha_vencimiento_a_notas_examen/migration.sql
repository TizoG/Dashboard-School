/*
  Warnings:

  - Added the required column `fechaVencimiento` to the `NotasExamenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotasExamenes" ADD COLUMN     "fechaVencimiento" TIMESTAMP(3) NOT NULL;
