"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getEmpresas } from "@/services/empresaService";
import { Pencil, Trash2 } from "lucide-react";

type Empresa = {
  id: string;
  razaoSocial: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  municipio: string;
  estado: string;
};

export default function EmpresasList() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarEmpresas() {
      try {
        const data = await getEmpresas();
        setEmpresas(data);
      } catch {
        toast.error("Erro ao carregar empresas.");
      } finally {
        setLoading(false);
      }
    }

    carregarEmpresas();
  }, [empresas]);

  const handleEdit = (id: string) => {
    toast.info(`Editar empresa ${id}`);
    //tratar edição -> TODO
  };
  const handleDelete = (id: string) => {
    toast.warning(`Empresa ${id} será excluída.`);
    //tratar deleção -> TODO
  };
  if (loading) return <p>Carregando empresas...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Empresas cadastradas</h1>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Cabeçalho */}
          <div className="grid grid-cols-6 gap-4 font-semibold border-b pb-2">
            <span>Nome Fantasia</span>
            <span>Razão Social</span>
            <span>CNPJ</span>
            <span>Município</span>
            <span>Estado</span>
            <span className="text-right">Ações</span>
          </div>
        </div>
      </div>

      {empresas.map((empresa) => (
        <div
          key={empresa.id}
          className="grid grid-cols-6 gap-4 items-center border-b py-2"
        >
          <span>{empresa.nome}</span>
          <span>{empresa.razaoSocial}</span>
          <span>{empresa.cnpj}</span>
          <span>{empresa.municipio}</span>
          <span>{empresa.estado}</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleEdit(empresa.id)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => handleDelete(empresa.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
