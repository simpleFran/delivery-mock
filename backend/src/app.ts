import Fastify from "fastify";

import { productsRoutes } from "./http/routes/products-routes";
import fastifyCors from "@fastify/cors";

export async function buildApp() {
  const app = Fastify();


  await app.register(fastifyCors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  // await app.register(productsRoutes, {
  //   prefix: "/products",
  // });

  return app
}
