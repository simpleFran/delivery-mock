"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { createEmpresa } from "@/services/empresaService";

const empresaSchema = z.object({
  razaoSocial: z.string().min(1, { message: "Razão Social é obrigatória" }),
  nome: z.string().min(1, { message: "Nome Fantasia é obrigatória" }),
  cnpj: z
    .string()
    .min(14, { message: "CNPJ é obrigatório" })
    .regex(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/, "CNPJ inválido"),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(1, { message: "Telefone é obrigatório" }),
  endereco: z.string().min(1, { message: "Endereço é obrigatório" }),
  municipio: z.string().min(1, { message: "Município é obrigatório" }),
  estado: z.string().min(1, { message: "Estado é obrigatório" }),
});

type FormValues = z.infer<typeof empresaSchema>;

export function EmpresaForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(empresaSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    console.log("DATA", data);
    try {
      await createEmpresa(data);
      toast.success("Empresa cadastrada com sucesso!");
      reset(); // Limpa o formulário
      if (onSuccess) onSuccess(); // Fecha modal, se passado
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao cadastrar empresa";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="razaoSocial">Razão Social</Label>
        <Input
          id="razaoSocial"
          {...register("razaoSocial")}
          placeholder="Ex: Minha Empresa LTDA"
        />
        {errors.razaoSocial && (
          <span className="text-red-500">{errors.razaoSocial.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="nome">Nome Fantasia</Label>
        <Input
          id="nome"
          {...register("nome")}
          placeholder="Ex: Minha Empresa"
        />
        {errors.nome && (
          <span className="text-red-500">{errors.nome.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          {...register("cnpj")}
          placeholder="Ex: 12.345.678/0001-90"
        />
        {errors.cnpj && (
          <span className="text-red-500">{errors.cnpj.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" {...register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          {...register("telefone")}
          placeholder="Ex: (11) 91234-5678"
        />
        {errors.telefone && (
          <span className="text-red-500">{errors.telefone.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          {...register("endereco")}
          placeholder="Ex: Rua das Flores, 123"
        />
        {errors.endereco && (
          <span className="text-red-500">{errors.endereco.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="municipio">Município</Label>
        <Input
          id="municipio"
          {...register("municipio")}
          placeholder="Ex: São Paulo"
        />
        {errors.municipio && (
          <span className="text-red-500">{errors.municipio.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="estado">Estado</Label>
        <Input id="estado" {...register("estado")} placeholder="Ex: SP" />
        {errors.estado && (
          <span className="text-red-500">{errors.estado.message}</span>
        )}
      </div>

      <Button
        type="submit"
        className="bg-primary text-white hover:bg-dark w-full"
        disabled={loading}
      >
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
