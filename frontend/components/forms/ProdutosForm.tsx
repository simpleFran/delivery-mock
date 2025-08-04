"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createProduct } from "@/services/produtoService";
import { getEmpresas } from "@/services/empresaService";
import { getCategoriasByEmpresaId } from "@/services/categoriaService";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  descricao: z.string().optional(),
  precoBase: z.coerce.number().min(0, "Preço inválido"),
  empresaId: z.string().min(1, "Selecione a empresa"),
  categoriaId: z.string().min(1, "Selecione a categoria"),
});

type FormData = z.infer<typeof schema>;

export function ProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [empresas, setEmpresas] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categorias, setCategorias] = useState<any[]>([]);

  const empresaSelecionada = watch("empresaId");

  useEffect(() => {
    (async () => {
      const data = await getEmpresas();
      setEmpresas(data);
    })();
  }, []);

  useEffect(() => {
    if (empresaSelecionada) {
      (async () => {
        const data = await getCategoriasByEmpresaId(empresaSelecionada);
        setCategorias(data);
      })();
    }
  }, [empresaSelecionada]);

  const onSubmit = async (data: FormData) => {
    try {
      await createProduct({
        nome: data.nome,
        precoBase: data.precoBase,
        empresaId: data.empresaId,
        categoriaId: data.categoriaId,
        descricao: data.descricao,
      });
      toast.success("Produto criado com sucesso!");
      onSuccess?.();
    } catch {
      toast.error("Erro ao criar produto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Nome</Label>
        <Input {...register("nome")} />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <Label>Descrição</Label>
        <Input {...register("descricao")} />
      </div>

      <div>
        <Label>Preço Base</Label>
        <Input type="number" step="0.01" {...register("precoBase")} />
        {errors.precoBase && (
          <p className="text-red-500 text-sm">{errors.precoBase.message}</p>
        )}
      </div>

      <div>
        <Label>Empresa</Label>
        <Select
          onValueChange={(value) => setValue("empresaId", value)}
          value={watch("empresaId")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a empresa" />
          </SelectTrigger>
          <SelectContent>
            {empresas.map((empresa) => (
              <SelectItem key={empresa.id} value={empresa.id}>
                {empresa.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.empresaId && (
          <p className="text-red-500 text-sm">{errors.empresaId.message}</p>
        )}
      </div>

      <div>
        <Label>Categoria</Label>
        <Select
          onValueChange={(value) => setValue("categoriaId", value)}
          value={watch("categoriaId")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            {categorias.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoriaId && (
          <p className="text-red-500 text-sm">{errors.categoriaId.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Salvar Produto
      </Button>
    </form>
  );
}
