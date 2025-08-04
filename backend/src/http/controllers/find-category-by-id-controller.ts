import { FastifyReply, FastifyRequest } from "fastify";
import { findCategoryByIdSchema } from "./zod-schemas/category-schema";
import { PrismaCategoriesRepository } from "@/infra/prisma/repositories/prisma-categories-repository";
import { FindCategoryByIdUseCase } from "@/use-cases/categoria/find-category-by-id/find-category-by-id";
import { AppError } from "@/errors/base-error";
import { z } from "zod";

export class FindCategoryByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = findCategoryByIdSchema.parse(request.params);

    try {
      const categoriesRepositoy = new PrismaCategoriesRepository();
      const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
        categoriesRepositoy
      );
      const category = await findCategoryByIdUseCase.execute(id);
      return reply.status(200).send(category);
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
