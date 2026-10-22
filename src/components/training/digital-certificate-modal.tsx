import { useRef, useState, useEffect } from "react";
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
  Download,
  FileText,
  Eye,
  User,
} from "lucide-react";
import {
  type GraduateRecord,
  OFFICIAL_CERTIFICATE_CONFIG,
  COMMISSIONING_TOPICS,
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
  const [activeTab, setActiveTab] = useState<"scan" | "digital">("scan");
  const certificateRef = useRef<HTMLDivElement>(null);

  // Automatically select scan tab if certificate image exists, otherwise digital
  useEffect(() => {
    if (graduate?.certificateImageUrl) {
      setActiveTab("scan");
    } else {
      setActiveTab("digital");
    }
  }, [graduate]);

  if (!graduate) return null;

  const isCommissioning =
    graduate.trainingTopic?.toLowerCase().includes("commissioning") ||
    graduate.certificateNumber?.includes("COF22");

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verifikasi-sertifikat?cert=${encodeURIComponent(
          graduate.certificateNumber
        )}`
      : `/verifikasi-sertifikat?cert=${encodeURIComponent(graduate.certificateNumber)}`;

  // Generate QR Code URL via reliable public QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
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

  const topicsList = graduate.topics || (isCommissioning ? COMMISSIONING_TOPICS : []);

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
            {/* View Tab Switcher if image exists */}
            {graduate.certificateImageUrl && (
              <div className="flex items-center rounded-lg bg-muted p-0.5 border border-border/60 mr-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("scan")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "scan"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="size-3.5" />
                  Scan Asli
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("digital")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "digital"
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Eye className="size-3.5" />
                  E-Sertifikat
                </button>
              </div>
            )}

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

            {graduate.certificateImageUrl && (
              <a
                href={graduate.certificateImageUrl}
                download={`Sertifikat_${graduate.fullName.replace(/\s+/g, "_")}_${graduate.certificateNumber}.png`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 gap-1.5 bg-accent/10 border-accent/30 text-accent-foreground hover:bg-accent/20 font-semibold cursor-pointer"
                >
                  <Download className="size-3.5" />
                  Unduh Scan
                </Button>
              </a>
            )}

            <Button
              type="button"
              size="sm"
              onClick={handlePrint}
              className="text-xs h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold cursor-pointer"
            >
              <Printer className="size-3.5" />
              Cetak PDF
            </Button>
          </div>
        </DialogHeader>

        {/* View 1: Authentic Certificate Scan View */}
        {activeTab === "scan" && graduate.certificateImageUrl ? (
          <div className="space-y-3 py-2">
            <div className="p-2 sm:p-3 rounded-xl bg-card border border-border shadow-sm flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>
                  Dokumen fisik resmi sertifikat pelatihan atas nama{" "}
                  <strong>{graduate.fullName}</strong> ({graduate.certificateNumber}).
                </span>
              </div>
              <a
                href={graduate.certificateImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Buka Resolusi Penuh</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

            <div className="relative rounded-xl overflow-hidden border-2 border-border shadow-lg bg-neutral-900 flex items-center justify-center">
              <img
                src={graduate.certificateImageUrl}
                alt={`Sertifikat ${graduate.fullName}`}
                className="w-full h-auto max-h-[75vh] object-contain shadow-2xl"
              />
            </div>
          </div>
        ) : (
          /* View 2: High-Fidelity Interactive Digital Certificate (Printable Canvas) */
          <div
            ref={certificateRef}
            id="official-certificate-canvas"
            className="relative mt-2 bg-[#fdfcf9] text-neutral-900 border-4 border-[#0b1a30] rounded-xl shadow-xl overflow-hidden select-text"
            style={{
              fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
              {/* Left Deep Navy Sidebar (matching official design) */}
              <div className="md:col-span-4 bg-[#0a182f] text-white p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#0a182f]">
                {/* Logo & Company Profile */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3 text-center shadow-xs">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[#0a182f] font-serif font-black text-2xl tracking-tighter">
                        {"{"}
                      </span>
                      <span className="text-rose-600 font-extrabold text-xl tracking-wider font-sans">
                        MSS
                      </span>
                      <span className="text-[#0a182f] font-serif font-black text-2xl tracking-tighter">
                        {"}"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">
                      PT Mosha Sinalsal Solusi
                    </h3>
                    <p className="text-[11px] text-neutral-300 font-medium">
                      Consultant, Training &amp; Manpower Supply
                    </p>
                    <p className="text-[9px] text-neutral-400 mt-1 leading-snug">
                      Main Business : Energy (Oil &amp; Gas, Power Plant, Solar PV, Renewable Energy), Commissioning, Automation
                    </p>
                  </div>

                  {/* Training Topics Syllabus */}
                  <div className="pt-2">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-amber-400 border-b border-white/20 pb-1 mb-2.5">
                      TRAINING TOPICS
                    </h4>
                    <ol className="space-y-1 text-[10px] text-neutral-200 leading-snug">
                      {topicsList.length > 0 ? (
                        topicsList.map((topic, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="font-mono text-amber-400 font-bold shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="line-clamp-2">
                              {topic.replace(/^\d+\s*/, "")}
                            </span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li>01 Pengenalan &amp; Dasar Rekayasa Sistem</li>
                          <li>02 Design, Layout &amp; Single Line Diagram</li>
                          <li>03 Standar Keselamatan &amp; Regulasi</li>
                          <li>04 Pre-Commissioning &amp; Testing</li>
                          <li>05 Performance Verification &amp; Handover</li>
                        </>
                      )}
                    </ol>
                  </div>
                </div>

                {/* Association Partnership */}
                <div className="pt-4 border-t border-white/20 mt-4">
                  <p className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                    IN ASSOCIATION WITH
                  </p>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 border border-white/10">
                    <div className="size-6 rounded bg-white text-[#0a182f] font-black text-xs flex items-center justify-center shrink-0">
                      M
                    </div>
                    <div className="text-[10px] leading-tight">
                      <p className="font-bold text-white">Masyarakat Sistem Energi</p>
                      <p className="text-neutral-300 text-[9px]">Berkelanjutan Indonesia</p>
                      <p className="text-amber-400 text-[8px] font-mono">www.masebi.org</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Certificate Main Body */}
              <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between bg-[#fbf9f4] relative">
                {/* Top Section: Title & Dynamic Verification QR */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
                        Certificate
                      </h1>
                      <p className="text-lg sm:text-xl font-serif italic text-neutral-700 -mt-1">
                        of Training
                      </p>
                      <div className="w-12 h-1 bg-amber-600 mt-2" />
                    </div>

                    {/* Official Verification QR Code */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="p-1 bg-white border border-neutral-300 rounded shadow-xs">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code Verifikasi"
                          className="size-16 sm:size-20 object-contain"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-neutral-500 mt-0.5 font-bold uppercase">
                        Scan to Verify
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                      This is to certify that
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-wide font-sans border-b-2 border-neutral-400 pb-1 inline-block">
                      {graduate.fullName}
                    </h2>

                    <div className="pt-2">
                      <p className="text-xs text-neutral-600 font-serif">Training Tittle :</p>
                      <h3 className="text-lg sm:text-2xl font-serif italic font-extrabold text-amber-900 mt-0.5 leading-snug">
                        {graduate.trainingTopic}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Bottom Details, Photo / Signature & Official Stamp */}
                <div className="mt-8 pt-4 border-t border-neutral-300">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                    {/* Participant Photo / Badge */}
                    <div className="sm:col-span-4 flex items-center justify-start sm:justify-start">
                      {graduate.certificateImageUrl ? (
                        <div className="w-24 h-32 bg-red-600 p-1 rounded border-2 border-neutral-800 shadow-md overflow-hidden shrink-0">
                          <img
                            src={graduate.certificateImageUrl}
                            alt={graduate.fullName}
                            className="w-full h-full object-cover scale-[1.8] translate-y-2 -translate-x-1"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-32 bg-gradient-to-b from-red-600 to-red-700 rounded border-2 border-neutral-800 shadow-md flex flex-col items-center justify-center text-white shrink-0">
                          <div className="size-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg mb-1">
                            <User className="size-7" />
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-center px-1">
                            Peserta Resmi
                          </span>
                        </div>
                      )}

                      {/* Venue, Date, Cert No Table */}
                      <div className="ml-3 text-[10px] font-mono border border-neutral-400 rounded overflow-hidden shadow-2xs">
                        <div className="grid grid-cols-2 bg-neutral-200/80 px-2 py-0.5 border-b border-neutral-300">
                          <span className="text-neutral-600 font-bold">VENUE</span>
                          <span className="font-bold text-neutral-900">{graduate.venue || "BATAM"}</span>
                        </div>
                        <div className="grid grid-cols-2 bg-white px-2 py-0.5 border-b border-neutral-300">
                          <span className="text-neutral-600 font-bold">DATE</span>
                          <span className="font-bold text-neutral-900 whitespace-nowrap">{graduate.completionDate}</span>
                        </div>
                        <div className="grid grid-cols-2 bg-neutral-100 px-2 py-0.5">
                          <span className="text-neutral-600 font-bold">CERT. NO.</span>
                          <span className="font-black text-amber-900 whitespace-nowrap">{graduate.certificateNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Signature & Official Stamp */}
                    <div className="sm:col-span-8 flex items-center justify-end gap-3 text-right">
                      {/* Stamp Graphic */}
                      <div className="relative size-20 sm:size-24 rounded-full border-2 border-dashed border-red-600/70 p-1 flex flex-col items-center justify-center text-center text-red-600/80 font-bold rotate-[-8deg] shadow-inner shrink-0 select-none">
                        <span className="text-[7px] uppercase tracking-tighter font-extrabold leading-none">
                          MOSHA SINALSAL SOLUSI
                        </span>
                        <div className="font-serif font-black text-xs my-0.5 text-red-700">
                          {"{"} MSS {"}"}
                        </div>
                        <span className="text-[6px] uppercase tracking-tighter leading-none">
                          CONSULTANT TRAINING<br />MANPOWER SUPPLY
                        </span>
                      </div>

                      {/* Instructor / Manager Signature */}
                      <div className="space-y-0.5">
                        {/* Authentic Stylized Signature */}
                        <div className="h-12 flex items-center justify-end pr-2">
                          <svg
                            viewBox="0 0 160 50"
                            className="w-32 h-10 text-neutral-800"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 35 C 30 10, 45 40, 60 15 C 75 45, 90 20, 110 30 C 130 15, 140 40, 155 25" />
                            <path d="M30 40 Q 80 48, 145 38" />
                          </svg>
                        </div>
                        <p className="font-bold text-neutral-900 text-xs sm:text-sm tracking-wide">
                          {graduate.instructor || "Emos Arapenta Ginting"}
                        </p>
                        <p className="text-[10px] text-neutral-600 font-medium">
                          (Manager &amp; Instructor)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Sub-Footer */}
                  <div className="mt-4 pt-2 border-t border-neutral-300 text-center text-[9px] text-neutral-500 leading-tight">
                    <p className="font-semibold text-neutral-700">
                      PT. MOSHA SINALSAL SOLUSI (www.moshassolusi.com) — Komplek Pertokoan Bukit Kemuning Blok DD3 No 02, BATAM – KEPULAUAN RIAU
                    </p>
                    <p>
                      Phone : 082392907198, Email: admin@moshassolusi.com, staff@moshassolusi.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Guidance */}
        <div className="mt-3 p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>
              Sertifikat ini diakui resmi oleh <strong>PT Mosha Sinalsal Solusi</strong> &amp; <strong>MASEBI</strong>. Keaslian dokumen dapat diverifikasi secara daring kapan saja melalui barcode atau nomor registrasi.
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
