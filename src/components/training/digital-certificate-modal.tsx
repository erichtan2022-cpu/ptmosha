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
  Share2,
  ExternalLink,
  ShieldCheck,
  Award,
  Calendar,
  Building,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  type GraduateRecord,
  OFFICIAL_CERTIFICATE_CONFIG,
} from "@/data/graduates-data.ts";
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

  // Generate QR Code URL via reliable public QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    verificationUrl
  )}&color=091E42&bgcolor=FFFFFF`;

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
      <DialogContent className="max-w-4xl w-[96vw] max-h-[92vh] overflow-y-auto p-3 sm:p-6 bg-background border border-border rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <Award className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                Sertifikat Kelulusan Resmi
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
                <span className="font-mono font-medium text-foreground">
                  {graduate.certificateNumber || "-"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
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

        {/* Certificate Printable Canvas */}
        <div
          ref={certificateRef}
          id="official-certificate-canvas"
          className="relative mt-2 p-5 sm:p-10 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-8 border-double border-amber-600/40 rounded-xl shadow-inner text-foreground overflow-hidden"
          style={{
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          }}
        >
          {/* Subtle Guilloché / Corner Accents */}
          <div className="absolute top-2 left-2 size-12 border-t-2 border-l-2 border-amber-600/60 pointer-events-none" />
          <div className="absolute top-2 right-2 size-12 border-t-2 border-r-2 border-amber-600/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 size-12 border-b-2 border-l-2 border-amber-600/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 size-12 border-b-2 border-r-2 border-amber-600/60 pointer-events-none" />

          {/* Watermark Background Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
            <img
              src={OFFICIAL_CERTIFICATE_CONFIG.logoUrl}
              alt="Watermark"
              className="w-[360px] h-auto object-contain grayscale"
            />
          </div>

          {/* Certificate Top Header */}
          <div className="relative text-center space-y-3 pb-6 border-b border-amber-500/25">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img
                src={OFFICIAL_CERTIFICATE_CONFIG.logoUrl}
                alt="PT Mosha Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-black tracking-wider text-primary dark:text-primary-foreground uppercase">
                  {OFFICIAL_CERTIFICATE_CONFIG.companyName}
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {OFFICIAL_CERTIFICATE_CONFIG.companySub}
                </p>
                <p className="text-[10px] text-muted-foreground tracking-wide">
                  SK Kemenkumham: {OFFICIAL_CERTIFICATE_CONFIG.skKemenkumham} | Batam, Indonesia
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-4 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[11px] font-bold tracking-widest uppercase">
                Official Certificate of Competence &amp; Completion
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground uppercase mt-1">
                SERTIFIKAT KELULUSAN
              </h2>
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                Nomor: <span className="font-mono font-bold text-foreground">{graduate.certificateNumber || "-"}</span>
              </p>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="relative py-6 sm:py-8 text-center space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground italic tracking-wide">
              Diberikan dengan penuh kehormatan kepada / Proudly presented to:
            </p>

            <div className="py-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-primary dark:text-amber-300 font-serif drop-shadow-sm underline decoration-amber-500/40 underline-offset-8">
                {graduate.fullName}
              </h1>
              {graduate.institution && (
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-2.5 flex items-center justify-center gap-1.5">
                  <Building className="size-3.5 text-amber-600" />
                  {graduate.institution}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-2">
              Atas kelulusan dan partisipasi aktif dalam program pelatihan teknis profesional:
            </p>

            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-card/80 border border-amber-500/30 shadow-xs">
              <h3 className="text-base sm:text-xl font-bold text-foreground tracking-tight">
                {graduate.trainingTopic}
              </h3>
              <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap mt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5 text-amber-600" />
                  {graduate.completionDate}
                </span>
                {graduate.hours && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-amber-600" />
                    {graduate.hours}
                  </span>
                )}
                {graduate.grade && (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="size-3.5" />
                    Predikat: {graduate.grade}
                  </span>
                )}
              </div>
            </div>

            {graduate.notes && (
              <p className="text-[11px] sm:text-xs text-muted-foreground/90 max-w-2xl mx-auto italic">
                &ldquo;{graduate.notes}&rdquo;
              </p>
            )}
          </div>

          {/* Certificate Footer: QR Code, Official Seal & Signatures */}
          <div className="relative pt-6 border-t border-amber-500/25 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            {/* Signature 1: Director */}
            <div className="text-center sm:text-left space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                PT Mosha Sinalsal Solusi
              </p>
              <div className="h-14 flex items-center justify-center sm:justify-start">
                <div className="font-serif italic text-lg sm:text-xl font-semibold text-foreground/80 tracking-wider">
                  {OFFICIAL_CERTIFICATE_CONFIG.directorName.split(",")[0]}
                </div>
              </div>
              <div className="border-t border-foreground/30 pt-1 w-48 mx-auto sm:mx-0">
                <p className="text-xs font-bold text-foreground">
                  {OFFICIAL_CERTIFICATE_CONFIG.directorName}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {OFFICIAL_CERTIFICATE_CONFIG.directorRole}
                </p>
              </div>
            </div>

            {/* Middle: Official Stamp & QR Code */}
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-1.5 bg-white rounded-lg border border-amber-300 shadow-xs">
                <img
                  src={qrCodeUrl}
                  alt="QR Code Verifikasi"
                  className="size-20 sm:size-24 object-contain"
                />
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold tracking-tight">
                <ShieldCheck className="size-3 text-emerald-600" />
                Pindai untuk Verifikasi Keaslian
              </div>
              <p className="text-[9px] text-muted-foreground font-mono">
                ID: {graduate.certificateNumber}
              </p>
            </div>

            {/* Signature 2: Lead Trainer */}
            <div className="text-center sm:text-right space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Masyarakat Sistem Energi Berkelanjutan
              </p>
              <div className="h-14 flex items-center justify-center sm:justify-end">
                <div className="font-serif italic text-lg sm:text-xl font-semibold text-foreground/80 tracking-wider">
                  {OFFICIAL_CERTIFICATE_CONFIG.leadInstructorName.split(",")[0]}
                </div>
              </div>
              <div className="border-t border-foreground/30 pt-1 w-48 mx-auto sm:ml-auto">
                <p className="text-xs font-bold text-foreground">
                  {OFFICIAL_CERTIFICATE_CONFIG.leadInstructorName}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {OFFICIAL_CERTIFICATE_CONFIG.leadInstructorRole}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Guidance */}
        <div className="mt-3 p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>
              Sertifikat ini diakui resmi oleh <strong>PT Mosha Sinalsal Solusi</strong> &amp; mitra pelatihan terkait. Keaslian dokumen dapat diverifikasi secara daring kapan saja.
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
