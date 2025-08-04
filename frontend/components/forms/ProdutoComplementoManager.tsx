"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { getGroupsByProductId, deleteGroup } from "@/services/groupService";
import {
  getComplementsByGroupId,
  deleteComplement,
} from "@/services/complementService";

type Props = {
  productId: string;
};

export function ProdutoComplementoManager({ productId }: Props) {
  const [grupos, setGrupos] = useState<any[]>([]);

  const carregarDados = async () => {
    const dados = await getGroupsByProductId(productId);
    setGrupos(dados);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleRemoverGrupo = async (groupId: string) => {
    await deleteGroup(groupId);
    toast.success("Grupo removido");
    carregarDados();
  };

  const handleRemoverComplemento = async (complementId: string) => {
    await deleteComplement(complementId);
    toast.success("Complemento removido");
    carregarDados();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Grupos de Complemento</h2>
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          <PlusCircle size={18} />
          Adicionar Grupo
        </button>
      </div>

      <Accordion type="multiple" className="w-full">
        {grupos.map((grupo) => (
          <AccordionItem key={grupo.id} value={grupo.id}>
            <AccordionTrigger>{grupo.nome}</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-end gap-2 mb-2">
                <button className="text-blue-600 hover:underline">
                  <Pencil size={16} />
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleRemoverGrupo(grupo.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <ul className="space-y-2">
                {grupo.complementos.map((comp: any) => (
                  <li
                    key={comp.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span>
                      {comp.nome} - R$ {comp.preco.toFixed(2)}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:underline">
                        <Pencil size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleRemoverComplemento(comp.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-1 text-blue-600 hover:underline mt-2">
                <PlusCircle size={16} />
                Adicionar Complemento
              </button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
