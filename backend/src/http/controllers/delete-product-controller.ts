import { FastifyReply, FastifyRequest } from "fastify";
import { deleteProductSchema } from "./zod-schemas/product-schema";
import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository";
import { DeleteProductUseCase } from "@/use-cases/produto/delete-product/delete-product-use-case";
import { z } from "zod";

export class DeleteProductController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { enterpriseId, productId } = deleteProductSchema.parse(req.query);
      console.log("Deleting product with ID:", productId, "for enterprise ID:", enterpriseId);
      const productsRepository = new PrismaProductsRepository();
      const deleteProductUseCase = new DeleteProductUseCase(productsRepository);

      await deleteProductUseCase.execute(
        productId,
        enterpriseId,
      );
      return res.status(200).send({ message: `Produto ${productId} deletado com sucesso` });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({
          message: "Erro de validação",
          errors: (error as import("zod").ZodError).flatten(),
        });
      }
      return res
        .status(500)
        .send({ message: "Erro interno ao excluir produto." });
    }
  }
}
