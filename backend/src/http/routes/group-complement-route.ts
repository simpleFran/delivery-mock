import { FastifyInstance } from "fastify";
import { CreateGroupComplementController } from "@/http/controllers/create-group-complement-controller";

export async function grupoComplementoRoutes(app: FastifyInstance) {
    const createGroupComplementController = new CreateGroupComplementController();

    app.post("/",
        createGroupComplementController.handle
    );
}
