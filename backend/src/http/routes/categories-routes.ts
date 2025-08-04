import { FastifyInstance } from "fastify";
import { CreateCategoryController } from "../controllers/create-category-controller";
import { FindCategoryByIdController } from "../controllers/find-category-by-id-controller";
import { FindCategoriesByEnterpriseIdController } from "../controllers/find-categories-by-enterprise-id-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  const createCategoryController = new CreateCategoryController();
  const findCategoryByIdController = new FindCategoryByIdController();
  const findCategoriesByEnterpriseIdController =
    new FindCategoriesByEnterpriseIdController();

  app.get(
    "/by-enterprise/:enterpriseId",
    findCategoriesByEnterpriseIdController.handle
  );
  app.post("/", createCategoryController.handle);
  app.get("/:id", findCategoryByIdController.handle);
}
