"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { getAllEmpresasTree } from "@/services/empresaService"; // nome do service definitivo
import { EmpresaTree } from "@/lib/types";
import { deleteProduct } from "@/services/produtoService";

export default function EmpresaTreeAccordionList() {
  const [empresas, setEmpresas] = useState<EmpresaTree[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [empresasTree, setEmpresasTree] = useState<EmpresaTree[]>([]);

  const handleRemoverProduto = async (
    productId: string,
    enterpriseId: string
  ) => {
    try {
      const response = await deleteProduct(productId, enterpriseId);

      const resJson = response.data; // Axios responses have data property

      console.log("RES", response.status, resJson);

      if (response.status < 200 || response.status >= 300) {
        const msg = resJson?.message || "Erro ao deletar";
        throw new Error(msg);
      }

      toast.success("Produto removido com sucesso!");

      // Atualiza a árvore local
      setEmpresas((prev) =>
        prev.map((empresa) => {
          if (empresa.id !== enterpriseId) return empresa;

          return {
            ...empresa,
            categorias: empresa.categorias.map((categoria) => ({
              ...categoria,
              produtos: categoria.produtos.filter((p) => p.id !== productId),
            })),
          };
        })
      );
    } catch (error) {
      toast.error((error as Error).message || "Erro ao remover o produto");
      console.error(error);
    }
  };
  

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const data = await getAllEmpresasTree();
        setEmpresas(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro em empresas";
        toast.error(errorMessage);
      }
    }

    fetchEmpresas();
  }, []);

  return (
    <Accordion type="multiple" className="w-full">
      {empresas.map((empresa) => (
        <AccordionItem key={empresa.id} value={empresa.id}>
          <AccordionTrigger>{empresa.nome}</AccordionTrigger>
          <AccordionContent>
            {empresa.categorias?.length > 0 ? (
              empresa.categorias.map((categoria) => (
                <div key={categoria.id} className="ml-4 mt-2">
                  <details className="group">
                    <summary className="cursor-pointer flex items-center gap-1">
                      <ChevronRight className="group-open:hidden h-4 w-4" />
                      <ChevronDown className="hidden group-open:block h-4 w-4" />
                      <span className="font-medium">{categoria.nome}</span>
                    </summary>
                    <ul className="ml-6 mt-2 list-disc text-sm text-gray-700">
                      {categoria.produtos.map((produto) => (
                        <li
                          key={produto.id}
                          className="flex justify-between items-center"
                        >
                          <span>{produto.nome}</span>
                          <div className="flex gap-2">
                            <button
                              // onClick={() => editarProduto(produto)}
                              className="text-blue-600 hover:underline"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoverProduto(produto.id,empresa.id)}
                              className="text-red-600 hover:underline"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))
            ) : (
              <p className="ml-4 text-sm text-muted-foreground">
                Sem categorias e produtos cadastrados ainda
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
