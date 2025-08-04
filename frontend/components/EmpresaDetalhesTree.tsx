import { useEffect, useState } from "react";
import { getEmpresaTree } from "@/services/empresaService";
import { EmpresaTree } from "@/lib/types";

type Props = {
  empresaId: string;
};

export default function EmpresaDetalhesTree({ empresaId }: Props) {
  const [empresa, setEmpresa] = useState<EmpresaTree | null>(null);

  useEffect(() => {
    async function fetchTree() {
      try {
        const data = await getEmpresaTree(empresaId);
        setEmpresa(data);
      } catch (err) {
        console.error("Erro ao buscar empresa tree",err);
      }
    }

    fetchTree();
  }, [empresaId]);

  if (!empresa) return <p>Carregando detalhes...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Empresa: {empresa.nome}</h2>
      {empresa.categorias.map((categoria) => (
        <div key={categoria.id} className="border p-2 rounded">
          <h3 className="font-bold text-blue-700">{categoria.nome}</h3>
          <ul className="pl-4 list-disc text-sm text-gray-700">
            {categoria.produtos.map((produto) => (
              <li key={produto.id}>
                {produto.nome} – R$ {produto.precoBase.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
