import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository"
import { findProductByIdSchema } from "./zod-schemas/product-schema"
import { FindProductByIdUseCase } from "@/use-cases/produto/find-product-by-id/find-product-by-id";



export class FindProductByIdController {
    async handle(request: any, reply: any) {
        const { id } = findProductByIdSchema.parse(request.params)
        const productsRepository = new PrismaProductsRepository();
        const findProductsByIdUseCase = new FindProductByIdUseCase(productsRepository);
        try {
            const product = await findProductsByIdUseCase.execute(id)
            return reply.status(200).send(product)
        } catch (error) {
            return reply.status(500).send({
                message:
                    error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
    }
}