import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository";
import { UpdateProductUseCase } from "@/use-cases/produto/update-product/update-product-use-case";

export class UpdateProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        // Validação dos dados com Zod (recomendado)
        const schema = z.object({
            nome: z.string().optional(),
            descricao: z.string().optional(),
            precoBase: z.number().optional(),
            empresaId: z.string().optional(),
            categoriaId: z.string().optional(),
        });

        const parsed = schema.safeParse(request.body);

        if (!parsed.success) {
            return reply.status(400).send({ message: "Dados inválidos", errors: parsed.error.format() });
        }

        const data = parsed.data;

        const repo = new PrismaProductsRepository();
        const useCase = new UpdateProductUseCase(repo);

        const updated = await useCase.execute({ id, ...data }); // agora o spread está seguro

        return reply.status(200).send(updated);
    }
}
