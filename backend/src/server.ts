import { buildApp } from "./app";
import { categoriesRoutes } from "./http/routes/categories-routes";
import { enterprisesRoutes } from "./http/routes/enterprises-routes";
import { grupoComplementoRoutes } from "./http/routes/group-complement-route";
import { productsRoutes } from "./http/routes/products-routes";

(async () => {
  const app = await buildApp();

  app.register(categoriesRoutes,{prefix: "/api/v1/categories"});
  app.register(productsRoutes,{prefix: "/api/v1/products"});
  app.register(enterprisesRoutes,{prefix: "/api/v1/enterprises"});
  app.register(grupoComplementoRoutes,{prefix: "/api/v1/group-complements"});

  app
    .listen({ port: 3333, host: "0.0.0.0" })
    .then(() => {
      console.log("🚀 HTTP server running on http://localhost:3333");
    })
    .catch((err: unknown) => {
      console.error(err);
      process.exit(1);
    });
})();
