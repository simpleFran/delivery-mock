import { AppError } from "@/errors/base-error";

export class FindEnterpriseByIdUseCase {
  constructor(private enterpriseRepository: any) {} // Replace 'any' with the actual type of your repository
  async execute(id: string) {
    const enterprise = await this.enterpriseRepository.findById(id);
    if (!enterprise) {
      throw new AppError("Empresa não encontrada.", 404);
    }
    return enterprise;
  }
}
