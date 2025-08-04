// types.ts
export type Produto = {
  id: string;
  nome: string;
  precoBase: number;
};

export type Categoria = {
  id: string;
  nome: string;
  produtos: Produto[];
};

export type EmpresaTree = {
  id: string;
  nome: string;
  categorias: Categoria[];
};
