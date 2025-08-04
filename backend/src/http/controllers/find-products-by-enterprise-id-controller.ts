import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository";
import { FastifyReply, FastifyRequest } from "fastify";


export class FindProductsByEnterpriseIdController{

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { enterpriseId } = request.params as { enterpriseId: string };
    
        if (!enterpriseId) {
        return {
            statusCode: 400,
            body: "Id da Empresa é requerido",
        };
        }
    
        try {
        const productsRepository = new PrismaProductsRepository();
        const products = await productsRepository.findManyProductsByEnterpriseId(enterpriseId);
        return {
            statusCode: 200,
            body: products,
        };
        } catch (error) {
        return {
            statusCode: 500,
            body: error instanceof Error ? error.message : "Internal server error",
        };
        }
    }   
}