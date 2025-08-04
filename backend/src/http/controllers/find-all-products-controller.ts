import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository";
import { FindAllProductsUseCase } from "@/use-cases/produto/find-all-products/find-all-products-use-case";
import { FastifyReply, FastifyRequest } from "fastify";




export class FindAllProductsController{


    async handle(request:FastifyRequest,reply: FastifyReply){

        const produtctsRepository = new PrismaProductsRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(produtctsRepository);

        const produtos = await findAllProductsUseCase.execute();
        // 🔑 Mapeando para transformar Preco (value object) em number
        const produtosDTO = produtos.map((produto) => ({
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            precoBase: produto.precoBase.getValue(), // <-- Converte para number
            categoria: produto.categoria,
            empresa: produto.empresa,
        }));
        return reply.status(200).send(produtosDTO);
    }
}