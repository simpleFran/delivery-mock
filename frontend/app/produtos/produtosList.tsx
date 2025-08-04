"use client";

import { Button } from "@/components/ui/button";
import {
  deleteProduct,
  getAllProducts,
  Product
} from "@/services/produtoService";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductModal } from "./produtoModal";
import { ConfirmDeleteDialog } from "@/components/ConfirmeDeleteDialog";



export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log(data); // 👈 Ver estrutura
      setProducts(data);
    } catch {
      toast.error("Erro ao carregar produtos");
    }
  };

  const handleDelete = async (id: string, enterpriseId: string) => {
    try {
      console.log(id,enterpriseId)
      await deleteProduct(id, enterpriseId);
      toast.success("Produto excluído com sucesso", {
        duration: 3000,
        icon: "🗑️",
        
      });
      fetchProducts();
    } catch {
      toast.error("Erro ao excluir produto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Lista de Produtos</h1>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border px-4 py-2 text-left">Nome</th>
              <th className="border px-4 py-2 text-left">Descrição</th>
              <th className="border px-4 py-2 text-left">Preço Base</th>
              <th className="border px-4 py-2 text-left">Empresa</th>
              <th className="border px-4 py-2 text-left">Categoria</th>
              <th className="border px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((produto) => (
                <tr key={produto.id} className="hover:bg-accent">
                  <td className="border px-4 py-2">{produto.nome}</td>
                  <td className="border px-4 py-2">
                    {produto.descricao || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    R$ {Number(produto.precoBase).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{produto.empresa.nome}</td>
                  <td className="border px-4 py-2">{produto.categoria.nome}</td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleEdit(produto)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <ConfirmDeleteDialog 
                      onConfirm={()=> handleDelete(produto.id, produto.empresa.id)}
                      entityName="produto"
                      artigo="o"
                      >
                        <Button
                          variant="destructive"
                          size="icon"
                          className="bg-primary text-white dark:text-white hover:text-white cursor-pointer"
                          // onClick={() =>
                          //   handleDelete(produto.id, produto.empresa.id)
                          // }
                        >
                          <Trash2 className="w-4 h-4" stroke="white" />
                        </Button>
                      </ConfirmDeleteDialog>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan={6}>
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductModal
          onClose={() => setModalOpen(false)}
          onSuccess={fetchProducts}
          initialData={editingProduct}
        />
      )}
    </div>
  );
}
