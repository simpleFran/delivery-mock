/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Empresa_createdAt_key" ON "Empresa"("createdAt");
