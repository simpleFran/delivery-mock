import { PrismaCategoriesRepository } from "@/infra/prisma/repositories/prisma-categories-repository";
import { CreateCategoryUseCase } from "@/use-cases/categoria/create-category/create-category";

import { z } from "zod";
import { createCategorySchema } from "./zod-schemas/category-schema";

export class CreateCategoryController {
  async handle(req: any, res: any) {
   
    try {
      const { nome, descricao, empresaId } = createCategorySchema.parse(
        req.body
      );


      const categoriesRepository = new PrismaCategoriesRepository();
      const createCategoryUseCase = new CreateCategoryUseCase(
        categoriesRepository
      );

      await createCategoryUseCase.execute({
        nome,
        descricao,
        empresaId,
      });
      return res.status(201).send({ message: "Categoria criada com sucesso" });
    } catch (error) {

        if (error instanceof z.ZodError) {
            return res.status(400).send({
              message: "Erro de validação",
              errors: error.flatten(),
            });
        } 
      return res
        .status(500)
        .send({ message: "Erro interno ao criar categoria" });
    }
  }
}
