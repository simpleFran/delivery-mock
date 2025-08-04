/*
  Warnings:

  - Made the column `email` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endereco` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `muncipio` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `razaoSocial` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "endereco" SET NOT NULL,
ALTER COLUMN "estado" SET NOT NULL,
ALTER COLUMN "muncipio" SET NOT NULL,
ALTER COLUMN "razaoSocial" SET NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL;
