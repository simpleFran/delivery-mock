import { Empresa } from "@/domain/entities/Empresa";
import { EnterprisesRepository } from "@/domain/repositories/enterprises-repository";
import { AppError } from "@/errors/base-error";
import { PrismaEnterpriseRepository } from "@/infra/prisma/repositories/prisma-enterprise-repository";


export class CreateEnterpriseUseCase {
    constructor(
        private readonly enterpriseRepository: PrismaEnterpriseRepository,
    ) {}
    async execute(enterpriseData: Empresa): Promise<Empresa> {
        const existingEnterprise = await this.enterpriseRepository.findByCnpj(enterpriseData.cnpj);
        if (existingEnterprise) {
            throw new AppError("CNPJ já cadastrado", 400);
        }
        const newEnterprise = await this.enterpriseRepository.create(enterpriseData);
        return newEnterprise;
    }
}