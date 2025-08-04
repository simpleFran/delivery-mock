import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository"
import { findProductByIdSchema } from "./zod-schemas/product-schema"
import { FindProductByIdUseCase } from "@/use-cases/produto/find-product-by-id/find-product-by-id";
import { PrismaEnterpriseRepository } from "@/infra/prisma/repositories/prisma-enterprise-repository";
import { FindEnterpriseAll } from "@/use-cases/empresa/find-enterprise-all/find-enterprise-all";



export class FindAllEnterpriseController {
    async handle(request: any, reply: any) {
        
        const enterprisesRepository = new PrismaEnterpriseRepository();
        const findEnterpriseAll = new FindEnterpriseAll(enterprisesRepository);
        try {
            const enterprises = await findEnterpriseAll.execute();
            return reply.status(200).send(enterprises)
        } catch (error) {
            return reply.status(500).send({
                message:
                    error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
    }
}