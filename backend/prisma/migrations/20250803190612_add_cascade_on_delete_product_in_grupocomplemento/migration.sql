-- DropForeignKey
ALTER TABLE "GrupoComplemento" DROP CONSTRAINT "GrupoComplemento_produtoId_fkey";

-- AddForeignKey
ALTER TABLE "GrupoComplemento" ADD CONSTRAINT "GrupoComplemento_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
