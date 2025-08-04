import { FastifyInstance } from "fastify";
import { CreateProductController } from "../controllers/create-product-controller";
import { FindProductByIdController } from "../controllers/find-produtct-by-id-controller";
import { FindProductByNameController } from "../controllers/find-product-by-name-controller";
import { DeleteProductController } from "../controllers/delete-product-controller";
import { FindProductsByEnterpriseIdController } from "../controllers/find-products-by-enterprise-id-controller";
import { FindAllProductsController } from "../controllers/find-all-products-controller";
import { UpdateProductController } from "../controllers/update-product-controller";

export async function productsRoutes(app: FastifyInstance) {
  const createProductController = new CreateProductController();
  const findProductByIdController = new FindProductByIdController();
  const findProductByNameController = new FindProductByNameController();
  const deleteProductController = new DeleteProductController();
    const findAllProductsController = new FindAllProductsController();
const updateProductController = new UpdateProductController();
  //criar produto
  app.post("/", createProductController.handle);

  //busca produto por id
  app.get("/:id", findProductByIdController.handle);

  //busca produto por nome
  app.get("/", findProductByNameController.handle);

  // //buscar todos produtos por empresa
  // app.get("/by-enterprise/:enterpriseId", findProductsByEnterpriseIdController.handle)

  //buscar todos os produtos
  app.get("/all", findAllProductsController.handle);

  app.delete("/", deleteProductController.handle);

  app.put("/:id", updateProductController.handle);
}
