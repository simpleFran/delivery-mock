import { Dialog, DialogContent, DialogTitle } from "./dialog";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}: CustomModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-text p-6 rounded-xl shadow-lg max-w-xl w-full border border-gray-200">
        <DialogTitle className="text-xl font-bold mb-4">{title}</DialogTitle>

        {children}
      </DialogContent>
    </Dialog>
  );
}
