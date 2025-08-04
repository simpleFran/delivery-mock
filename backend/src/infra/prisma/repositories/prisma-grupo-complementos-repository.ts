import { prisma } from "@/infra/prisma/client";
import { GrupoComplemento } from "@/domain/entities/GrupoComplemento";
import { GrupoComplementosRepository } from "@/domain/repositories/grupo-complementos-repository";
import { Prisma } from "@prisma/client";
import { InexistentProductError } from "@/errors/base-error";

export class PrismaGrupoComplementosRepository implements GrupoComplementosRepository {
    async findManyProdutoId(produtoId: string): Promise<GrupoComplemento[]> {
        const grupos = await prisma.grupoComplemento.findMany({
            where: { produtoId },
        });

        return grupos.map(
            (g) =>
                new GrupoComplemento({
                    id: g.id,
                    nome: g.nome,
                    minItens: g.minItens,
                    maxItens: g.maxItens,
                    produtoId: g.produtoId,
                })
        );
    }
    async create(data: Omit<GrupoComplemento, "id">): Promise<GrupoComplemento> {

        try {

            const created = await prisma.grupoComplemento.create({
                data: {
                    nome: data.nome,
                    minItens: data.minItens,
                    maxItens: data.maxItens,
                    produtoId: data.produtoId,
                },
            });

            return new GrupoComplemento({
                id: created.id,
                nome: created.nome,
                minItens: created.minItens,
                maxItens: created.maxItens,
                produtoId: created.produtoId,
            });
            
        } catch (error) {
            //Detecta erro de FK usando codigo prisma
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code ==="P2003") {
                throw new InexistentProductError("Produto não existente");
            }
            //Repassa outros erros
            throw error;
        }
       
    }

    async findById(id: string): Promise<GrupoComplemento | null> {
        const found = await prisma.grupoComplemento.findUnique({ where: { id } });

        if (!found) return null;

        return new GrupoComplemento({
            id: found.id,
            nome: found.nome,
            minItens: found.minItens,
            maxItens: found.maxItens,
            produtoId: found.produtoId,
        });
    }

    async update(id: string, data: Partial<Omit<GrupoComplemento, "id">>): Promise<GrupoComplemento> {
        const updated = await prisma.grupoComplemento.update({
            where: { id },
            data,
        });

        return new GrupoComplemento({
            id: updated.id,
            nome: updated.nome,
            minItens: updated.minItens,
            maxItens: updated.maxItens,
            produtoId: updated.produtoId,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.grupoComplemento.delete({ where: { id } });
    }

    async findByProdutoId(produtoId: string): Promise<GrupoComplemento[]> {
        const grupos = await prisma.grupoComplemento.findMany({
            where: { produtoId },
        });

        return grupos.map(
            (g) =>
                new GrupoComplemento({
                    id: g.id,
                    nome: g.nome,
                    minItens: g.minItens,
                    maxItens: g.maxItens,
                    produtoId: g.produtoId,
                })
        );
    }
}
