/*
  Warnings:

  - You are about to drop the `Complement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComplementGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Complement" DROP CONSTRAINT "Complement_complementGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ComplementGroup" DROP CONSTRAINT "ComplementGroup_produtoId_fkey";

-- DropTable
DROP TABLE "Complement";

-- DropTable
DROP TABLE "ComplementGroup";

-- CreateTable
CREATE TABLE "GrupoComplemento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "minItens" INTEGER NOT NULL DEFAULT 0,
    "maxItens" INTEGER NOT NULL DEFAULT 1,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "GrupoComplemento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complemento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grupoComplementoId" TEXT NOT NULL,

    CONSTRAINT "Complemento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrupoComplemento" ADD CONSTRAINT "GrupoComplemento_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complemento" ADD CONSTRAINT "Complemento_grupoComplementoId_fkey" FOREIGN KEY ("grupoComplementoId") REFERENCES "GrupoComplemento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
