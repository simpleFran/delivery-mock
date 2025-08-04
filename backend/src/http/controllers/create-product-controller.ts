import { AppError } from "@/errors/base-error";
import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository";
import { CreateProductUseCase } from "@/use-cases/produto/create-product/create-produtct-use-case";
import { CreateProductDTO } from "@/use-cases/produto/create-product/dto";
import { FastifyRequest, FastifyReply } from "fastify";

export class CreateProductController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { nome, descricao, precoBase, categoriaId, empresaId } = req.body as CreateProductDTO;
      
      const productsRepository = new PrismaProductsRepository();
      const createProductUseCase = new CreateProductUseCase(productsRepository);

      await createProductUseCase.execute({
        nome,
        descricao,
        precoBase,
        categoriaId,
        empresaId,
      });
      return res.status(201).send({ message: "Produto criado com sucesso" });
    } 

    catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message });
        }
      
      console.error(error); // para debug
      return res
        .status(500)
        .send({ message: "Erro interno ao criar produto" });
    }
  }
}
