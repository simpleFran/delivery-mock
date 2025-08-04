"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  children: React.ReactNode;
  onConfirm: () => void;
  entityName:string;
  artigo:string
}

export function ConfirmDeleteDialog({
  children,
  onConfirm,
  entityName,
  artigo

}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir {artigo.toLowerCase()} {entityName}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível. {artigo.toUpperCase()} {entityName} será removid{artigo.toLowerCase()} permanentemente do
            sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button variant="destructive" onClick={onConfirm}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
