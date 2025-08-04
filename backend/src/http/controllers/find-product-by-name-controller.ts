import { PrismaProductsRepository } from "@/infra/prisma/repositories/prisma-products-repository";
import {
  findProductByIdSchema,
  findProductByNameSchema,
} from "./zod-schemas/product-schema";
import { FindProductByIdUseCase } from "@/use-cases/produto/find-product-by-id/find-product-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { FindProductByNameUseCase } from "@/use-cases/produto/find-product-by-name/find-product-by-name";
import { z } from "zod";

export class FindProductByNameController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome } = findProductByNameSchema.parse(request.query);

      const productsRepository = new PrismaProductsRepository();
      const findProductByNameUseCase = new FindProductByNameUseCase(
        productsRepository
      );

      const produto = await findProductByNameUseCase.execute(nome);
      return reply.status(200).send(produto);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Erro de validação",
          errors: error.flatten(),
        });
      }
      return reply.status(500).send({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }
}
