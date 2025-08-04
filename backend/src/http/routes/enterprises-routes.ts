import { FastifyInstance } from "fastify";
import { CreateEnterpriseController } from "../controllers/create-enterprise-controller";
import { FindEnterpriseByIdController } from "../controllers/find-enterprise-by-id-controller";
import { FindEnterpriseByCnpjController } from "../controllers/find-enterprise-by-cnpj-controller";
import { FindAllEnterpriseController } from "../controllers/get-all-enterprise-controller";
import { FindEnterprisesProductsTreeController } from "../controllers/find-enterprises-products-tree-controller";

export async function enterprisesRoutes(app: FastifyInstance) {
  const createEnterpriseController = new CreateEnterpriseController();
  const findEnterpriseByIdController = new FindEnterpriseByIdController();
  const findEnterpriseByCnpjController = new FindEnterpriseByCnpjController();
  const findEnterpriseAll = new FindAllEnterpriseController();
  const findEnterpriseProductsTree =
    new FindEnterprisesProductsTreeController();
  //criar nova empresa
  app.post("/", createEnterpriseController.handle);
  //buscar por id
  app.get("/:id", findEnterpriseByIdController.handle);
  //buscar por cnpj
  app.get("/", findEnterpriseByCnpjController.handler);

  //lista todas as empresas
  app.get("/all", findEnterpriseAll.handle);

  //busca empresa por id, suas categorias e seus produtos
  app.get("/products/tree", findEnterpriseProductsTree.handle);
}
