import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Printer,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Award,
  FileCheck,
} from "lucide-react";
import { type GraduateRecord } from "@/data/graduates-data.ts";
import { toast } from "sonner";

interface DigitalCertificateModalProps {
  graduate: GraduateRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DigitalCertificateModal({
  graduate,
  isOpen,
  onClose,
}: DigitalCertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!graduate) return null;

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verifikasi-sertifikat?cert=${encodeURIComponent(
          graduate.certificateNumber
        )}`
      : `/verifikasi-sertifikat?cert=${encodeURIComponent(graduate.certificateNumber)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    toast.success("Tautan verifikasi resmi berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[96vw] max-h-[94vh] overflow-y-auto p-3 sm:p-6 bg-background border border-border rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <Award className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                Sertifikat Resmi Pelatihan
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px] font-semibold gap-1 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  Terverifikasi
                </Badge>
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                No. Registrasi:{" "}
                <span className="font-mono font-bold text-foreground">
                  {graduate.certificateNumber || "-"}
                </span>
                {graduate.venue && (
                  <span className="ml-2 text-muted-foreground">
                    • Venue: <strong className="text-foreground">{graduate.venue}</strong>
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="text-xs h-8 gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-600" />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Salin Link
                </>
              )}
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handlePrint}
              className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold cursor-pointer"
            >
              <Printer className="size-3.5" />
              Cetak / Simpan PDF
            </Button>
          </div>
        </DialogHeader>

        {/* Certificate Display Area - Shows authentic certificate scan only */}
        <div className="space-y-3 py-2">
          {/* Top Status & Fullscreen link */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-muted/40 border border-border shadow-2xs flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>
                Dokumen fisik asli diterbitkan untuk <strong>{graduate.fullName}</strong> ({graduate.certificateNumber}).
              </span>
            </div>
            {graduate.certificateImageUrl && (
              <a
                href={graduate.certificateImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Buka Dokumen Penuh</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>

          {/* Certificate Image Frame */}
          {graduate.certificateImageUrl ? (
            <div
              ref={certificateRef}
              id="official-certificate-canvas"
              className="relative rounded-xl overflow-hidden border-2 border-border shadow-lg bg-neutral-900 flex items-center justify-center p-1 sm:p-2"
            >
              <img
                src={graduate.certificateImageUrl}
                alt={`Sertifikat Resmi ${graduate.fullName}`}
                className="w-full h-auto max-h-[76vh] object-contain shadow-2xl rounded"
              />
            </div>
          ) : (
            <div className="p-10 rounded-xl bg-card border border-border text-center space-y-3">
              <FileCheck className="size-12 text-accent mx-auto" />
              <h3 className="text-base font-bold text-foreground">
                Sertifikat Fisik Telah Diterbitkan
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Sertifikat resmi atas nama <strong>{graduate.fullName}</strong> untuk program pelatihan <strong>{graduate.trainingTopic}</strong> telah disahkan oleh PT Mosha Sinalsal Solusi.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Guidance */}
        <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>
              Dokumen asli dikeluarkan secara sah oleh <strong>PT Mosha Sinalsal Solusi</strong> &amp; <strong>MASEBI</strong>. Keaslian sertifikat dapat diverifikasi kapan saja.
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs h-7 cursor-pointer shrink-0"
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
