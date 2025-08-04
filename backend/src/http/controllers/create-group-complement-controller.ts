import { AppError } from "@/errors/base-error";
import { PrismaGrupoComplementosRepository } from "@/infra/prisma/repositories/prisma-grupo-complementos-repository";
import { CreateGrupoComplementoUseCase } from "@/use-cases/grupo-complemento/create-grupo-complemento/create-grupo-complemento-use-case";
import { FastifyReply, FastifyRequest } from "fastify";



export class CreateGroupComplementController {

    async handle(req: FastifyRequest, reply: FastifyReply) {

        const { nome, maxItens, minItens, produtoId } = req.body as {
            nome: string;
            minItens: number;
            maxItens: number;
            produtoId: string;
        }

        try {
            const createGrupoComplementoRepository = new PrismaGrupoComplementosRepository();
            const createGrupoComplementoUseCase = new CreateGrupoComplementoUseCase(createGrupoComplementoRepository);

            const grupo = await createGrupoComplementoUseCase.execute({
                nome,
                minItens,
                maxItens,
                produtoId,
            });

            return reply.status(201).send(grupo);
        } catch (error) {
            if (error instanceof AppError) {
                return reply.status(error.statusCode).send({ error: error.message });
            }

            return reply.status(500).send({ error: "Erro interno no servidor" });
          }
    }
}