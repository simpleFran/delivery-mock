/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

import { getCategoriasByEmpresaId } from "@/services/categoriaService";
import { getEmpresas } from "@/services/empresaService";
import {
  Product,
  createProduct,
  updateProduct
} from "@/services/produtoService";

const schema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  descricao: z.string().optional(),
  precoBase: z.coerce.number().min(0, "Preço inválido"),
  empresaId: z.string().min(1, "Selecione a empresa"),
  categoriaId: z.string().min(1, "Selecione a categoria"),
});

type FormData = z.infer<typeof schema>;

interface ProductModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Product | null;
}

export function ProductModal({
  onClose,
  onSuccess,
  initialData,
}: ProductModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          nome: initialData.nome,
          descricao: initialData.descricao || "",
          precoBase: initialData.precoBase,
          empresaId: initialData.empresaId,
          categoriaId: initialData.categoriaId,
        }
      : {},
  });

  const [empresas, setEmpresas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  const empresaSelecionada = watch("empresaId");

  useEffect(() => {
    (async () => {
      const data = await getEmpresas();
      setEmpresas(data);
    })();
  }, []);

  useEffect(() => {
    console.log("Empresa selecionada:", empresaSelecionada);
    if (empresaSelecionada) {
      (async () => {
        const data = await getCategoriasByEmpresaId(empresaSelecionada);
        console.log("CATEGORIAS FETCHED:", data);
        setCategorias(data.body);
      })();
    }
  }, [empresaSelecionada]);

  const onSubmit = async (data: FormData) => {
    try {
      if (initialData) {
        await updateProduct(initialData.id, data);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await createProduct(data);
        toast.success("Produto criado com sucesso!");
      }
      onSuccess();
      onClose();
      reset();
    } catch {
      toast.error("Erro ao salvar produto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-background p-6 rounded-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Editar Produto" : "Novo Produto"}
        </h2>
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
              <SelectContent className="bg-white dark:bg-background">
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
              <SelectContent className="bg-white dark:bg-background">
                {(categorias || []).map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </SelectItem>
                ))}
                x
              </SelectContent>
            </Select>
            {errors.categoriaId && (
              <p className="text-red-500 text-sm">
                {errors.categoriaId.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? "Salvar Alterações" : "Criar Produto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
