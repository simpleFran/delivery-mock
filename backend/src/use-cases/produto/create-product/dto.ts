export interface CreateProductDTO {
  nome: string;
  descricao?: string;
  precoBase: number;
  categoriaId: string;
  empresaId: string;
}
