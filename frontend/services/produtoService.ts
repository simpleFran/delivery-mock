import { api } from "@/lib/axios";

// Dados para criar ou atualizar um produto
export interface ProductData {
  nome: string;
  descricao?: string;
  precoBase: number;
  empresaId: string;
  categoriaId: string;
}

//  Dados completos de um produto retornado pela API
export interface Product extends ProductData {
  id: string;
  empresa: {
    id: string;
    nome: string;
  };
  categoria: {
    id: string;
    nome: string;
  };
}

//  Deletar produto
export async function deleteProduct(productId: string, enterpriseId: string) {
  const res = await api.delete(`/products?productId=${productId}&enterpriseId=${enterpriseId}`);
  return res;
}

//  Criar Produto
export async function createProduct(data: ProductData) {
  const res = await api.post("/products", data);
  return res.data as Product;
}

//  Atualizar Produto
export async function updateProduct(productId: string, data: ProductData) {
  const res = await api.put(`/products/${productId}`, data);
  return res.data as Product;
}

//  Buscar Produto por ID
export async function getProductById(productId: string) {
  const res = await api.get(`/products/${productId}`);
  return res.data as Product;
}

// Buscar Produtos por Empresa
export async function getProductsByEmpresaId(enterpriseId: string) {
  const res = await api.get(`/products/by-enterprise/${enterpriseId}`);
  return res.data as Product[];
}

//  Buscar Todos os Produtos
export async function getAllProducts() {
  const res = await api.get("/products/all");
  return res.data as Product[];
}
