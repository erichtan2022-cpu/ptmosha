import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.tsx";
import TrainingRegistrationForm from "./training-registration-form.tsx";

interface TrainingRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainingId?: string;
}

export default function TrainingRegistrationDialog({
  open,
  onOpenChange,
  trainingId = "plts-commissioning",
}: TrainingRegistrationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl sm:text-2xl font-black text-foreground">
            Pendaftaran &amp; Pembayaran Pelatihan
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Pilih program pelatihan, lakukan transfer ke rekening resmi PT Mosha Sinalsal Solusi, dan lampirkan bukti pembayaran.
          </DialogDescription>
        </DialogHeader>

        <TrainingRegistrationForm
          initialTrainingId={trainingId}
          onSuccess={() => {
            // keep open so user sees summary and WhatsApp confirmation
          }}
          isDialog={true}
        />
      </DialogContent>
    </Dialog>
  );
}
