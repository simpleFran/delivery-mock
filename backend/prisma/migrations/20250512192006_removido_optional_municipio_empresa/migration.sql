/*
  Warnings:

  - Made the column `municipio` on table `Empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "municipio" SET NOT NULL;
