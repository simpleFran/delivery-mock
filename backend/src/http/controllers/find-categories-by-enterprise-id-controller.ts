import { PrismaCategoriesRepository } from "@/infra/prisma/repositories/prisma-categories-repository";
import { FindCategoriesByEnterpriseIdUseCase } from "@/use-cases/categoria/find-categories-by-enterprise-id/find-categories-by-enterprise-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

interface FindCategoriesByEnterpriseIdParams {
  enterpriseId: string;
}

export class FindCategoriesByEnterpriseIdController {
  async handle(request: FastifyRequest<{ Params: FindCategoriesByEnterpriseIdParams }>, reply: FastifyReply) {
    const { enterpriseId } = request.params;

    if (!enterpriseId) {
      return {
        statusCode: 400,
        body: new Error("Missing enterprise ID"),
      };
    }

    try {
    const categoriesRepository = new PrismaCategoriesRepository();
      const findCategoriesByEnterpriseId = new FindCategoriesByEnterpriseIdUseCase(categoriesRepository);
      const categories = await findCategoriesByEnterpriseId.execute(enterpriseId);
      if (!categories ) {
        return {
          statusCode: 404,
          body: new Error("Categories not found"),
        };
      }
      return {
        statusCode: 200,
        body: categories,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
       
      };
    }
  }
}
