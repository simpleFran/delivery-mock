"use client";

import EmpresaTreeAccordionList from "@/components/EmpresasTreeAccordionList";
import { EmpresaForm } from "@/components/forms/EmpresasForm";
import { Button } from "@/components/ui/button";
import { CustomModal } from "@/components/ui/customModal";
import { useState } from "react";

export default function EmpresasPage() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      (document.activeElement as HTMLElement)?.blur();
    }, 100);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-text">Empresas</h1>
        {/* Botão que abre o modal */}
        <Button
          onClick={() => setOpen(true)}
          className="cursor-pointer hover:bg-primary/70 text-white select-none focus-visible:ring-0 focus:outline-none"
        >
          Nova Empresa{" "}
        </Button>
        <CustomModal
          title="Adicionar Empresa"
          isOpen={open}
          onClose={handleClose}
        >
          <EmpresaForm onSuccess={() => setOpen(false)} />
        </CustomModal>
      </div>
     
     
     <EmpresaTreeAccordionList/>
    </div>
  );
}
