/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Empresa_createdAt_key";

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "cnpj" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");
