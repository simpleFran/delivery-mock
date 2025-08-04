import { PrismaEnterpriseRepository } from "@/infra/prisma/repositories/prisma-enterprise-repository";
import { findEnterpriseByIdSchema } from "./zod-schemas/enterprise-schema";
import { FindEnterpriseByIdUseCase } from "@/use-cases/empresa/find-enterprise-by-id/find-enterprise-by-id";
import { z } from "zod";

export class FindEnterpriseByIdController {
  async handle(request: any, reply: any) {
    try {
      const { id } = findEnterpriseByIdSchema.parse(request.params);
      const enterpriseRepository = new PrismaEnterpriseRepository();
      const findEnterpriseByIdUseCase = new FindEnterpriseByIdUseCase(
        enterpriseRepository
      );

      const enterprise = await findEnterpriseByIdUseCase.execute(id);

      return reply.status(200).send(enterprise);
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
