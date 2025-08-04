import { Produto } from "@/domain/entities/Produto";
import { ProductsRepository } from "@/domain/repositories/produtcts-repository";
import { AppError } from "@/errors/base-error";

interface UpdateProductDTO{
    id:string;
    nome?:string;
    descricao?:string;
    precoBase?:number;
    categoriaId?:string;
    empresaId?:string;
}

export class UpdateProductUseCase{

    constructor(private productsRepository: ProductsRepository){}

    async execute (data: UpdateProductDTO): Promise<Produto> {
        const existingProduct = await this.productsRepository.findById(data.id);
        if( !existingProduct){
            throw new AppError("Produto não encontrado", 404    );
        }

        const updated = await this.productsRepository.updateProduct(data.id,data);

        return updated;
    }
}