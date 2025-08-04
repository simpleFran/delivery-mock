/*
  Warnings:

  - You are about to drop the column `muncipio` on the `Empresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "muncipio",
ADD COLUMN     "municipio" TEXT;
