import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api.js";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Copy,
  Check,
  Upload,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  Image as ImageIcon,
  MessageCircle,
  FileText,
  Printer,
  Sparkles,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  AVAILABLE_TRAININGS,
  BANK_ACCOUNT_DETAILS,
  type TrainingOption,
} from "@/data/training-programs.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { toast } from "sonner";
import { trackEvent, trackClarityTag } from "@/components/seo/analytics-tracker.tsx";

interface TrainingRegistrationFormProps {
  initialTrainingId?: string;
  onSuccess?: () => void;
  isDialog?: boolean;
}

export default function TrainingRegistrationForm({
  initialTrainingId = "plts-commissioning",
  onSuccess,
  isDialog = false,
}: TrainingRegistrationFormProps) {
  const [selectedTrainingId, setSelectedTrainingId] = useState<string>(initialTrainingId);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [notes, setNotes] = useState("");

  // File uploads
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    registrationId: string;
    trainingTitle: string;
    fee: string;
    fullName: string;
    email: string;
    phone: string;
  } | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.registrations.generateUploadUrl);
  const createRegistration = useMutation(api.registrations.createRegistration);

  const currentTraining: TrainingOption =
    AVAILABLE_TRAININGS.find((t) => t.id === selectedTrainingId) ||
    AVAILABLE_TRAININGS[0];

  useEffect(() => {
    if (initialTrainingId) {
      const found = AVAILABLE_TRAININGS.find((t) => t.id === initialTrainingId);
      if (found) setSelectedTrainingId(initialTrainingId);
    }
  }, [initialTrainingId]);

  // Copy account number
  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_ACCOUNT_DETAILS.accountNumber);
    setCopiedAccount(true);
    toast.success("Nomor rekening BCA 3262681995 berhasil disalin!");
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  // Handle Photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal 10 MB");
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle Payment Proof selection
  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran bukti pembayaran maksimal 10 MB");
      return;
    }

    setProofFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProofPreview(null);
    }
  };

  // Upload a single file to Convex Storage
  const uploadToStorage = async (file: File) => {
    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!res.ok) {
      throw new Error(`Gagal mengupload file: ${file.name}`);
    }
    const json = await res.json();
    return json.storageId;
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Mohon isi Nama Lengkap sesuai sertifikat");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Mohon masukkan alamat email yang valid");
      return;
    }
    if (!phone.trim()) {
      toast.error("Mohon isi Nomor WA/Telepon aktif");
      return;
    }
    if (!currentJob.trim()) {
      toast.error("Mohon isi Posisi Pekerjaan Sekarang");
      return;
    }
    if (!photoFile) {
      toast.error("Mohon upload Photo Berwarna untuk sertifikat (Maks 10 MB)");
      return;
    }
    if (!proofFile) {
      toast.error("Mohon upload Bukti Bayar Training (Maks 10 MB)");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Mengupload berkas dan memproses pendaftaran...");

    try {
      // 1. Upload files to Convex Storage
      let photoStorageId = undefined;
      let proofStorageId = undefined;

      try {
        photoStorageId = await uploadToStorage(photoFile);
      } catch (err) {
        console.warn("Storage upload photo fallback", err);
      }

      try {
        proofStorageId = await uploadToStorage(proofFile);
      } catch (err) {
        console.warn("Storage upload proof fallback", err);
      }

      // 2. Insert into Convex Database
      const regResult = await createRegistration({
        trainingId: currentTraining.id,
        trainingTitle: currentTraining.shortTitle,
        trainingFee: currentTraining.feeFormatted,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        currentJob: currentJob.trim(),
        photoStorageId,
        proofStorageId,
        notes: notes.trim(),
      });

      // 3. Dispatch Email to moshasolusi@gmail.com via FormSubmit AJAX
      try {
        const emailPayload = {
          _subject: `[Pendaftaran Training] ${currentTraining.shortTitle} - ${fullName}`,
          "Nama Training": currentTraining.shortTitle,
          "Biaya Training": `${currentTraining.feeFormatted} (${currentTraining.feeWords})`,
          "Jadwal Training": `${currentTraining.schedule} (${currentTraining.time})`,
          "Tempat / Mode": `${currentTraining.location} (${currentTraining.mode})`,
          "Nama Lengkap (Sertifikat)": fullName,
          "Email Peserta": email,
          "Nomor WA / Telepon": phone,
          "Posisi Pekerjaan": currentJob,
          "Catatan Tambahan": notes || "-",
          "Link Foto Berwarna": regResult.photoUrl || "Tersimpan di Cloud Storage",
          "Link Bukti Pembayaran": regResult.proofUrl || "Tersimpan di Cloud Storage",
          "Waktu Registrasi": new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
          }),
        };

        await fetch("https://formsubmit.co/ajax/moshasolusi@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(emailPayload),
        });
      } catch (emailErr) {
        console.warn("FormSubmit email notification notice:", emailErr);
      }

      toast.success("Pendaftaran & Bukti Pembayaran Berhasil Terkirim!", {
        id: toastId,
      });

      // Track conversion in Google Analytics 4 & Microsoft Clarity
      trackEvent("generate_lead", {
        event_category: "Training Registration",
        event_label: currentTraining.shortTitle,
        value: currentTraining.fee,
        currency: "IDR",
      });
      trackEvent("purchase", {
        transaction_id: String(regResult.registrationId),
        value: currentTraining.fee,
        currency: "IDR",
        item_name: currentTraining.shortTitle,
      });
      trackClarityTag("registration_success", currentTraining.id);

      setSubmissionResult({
        registrationId: String(regResult.registrationId),
        trainingTitle: currentTraining.shortTitle,
        fee: currentTraining.feeFormatted,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kendala saat menyimpan pendaftaran. Silakan coba lagi atau hubungi WhatsApp Admin.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp confirmation message link
  const getWhatsAppConfirmationUrl = () => {
    if (!submissionResult) return `https://wa.me/${BANK_ACCOUNT_DETAILS.adminWhatsapp1}`;
    const text =
      `Halo Admin PT Mosha Sinalsal Solusi,\n\n` +
      `Saya telah mendaftar dan mengupload bukti transfer pelatihan:\n` +
      `📌 *Training:* ${submissionResult.trainingTitle}\n` +
      `👤 *Nama Lengkap:* ${submissionResult.fullName}\n` +
      `📧 *Email:* ${submissionResult.email}\n` +
      `📱 *No. WA:* ${submissionResult.phone}\n` +
      `💰 *Biaya:* ${submissionResult.fee}\n` +
      `🆔 *ID Registrasi:* ${submissionResult.registrationId}\n\n` +
      `Mohon verifikasi pendaftaran saya. Terima kasih!`;
    return `https://wa.me/${BANK_ACCOUNT_DETAILS.adminWhatsapp1}?text=${encodeURIComponent(text)}`;
  };

  // Mailto fallback link
  const getMailtoUrl = () => {
    if (!submissionResult) return `mailto:${BANK_ACCOUNT_DETAILS.destinationEmail}`;
    const subject = `[Konfirmasi Pendaftaran] ${submissionResult.trainingTitle} - ${submissionResult.fullName}`;
    const body =
      `Yth. Tim Training PT Mosha Sinalsal Solusi,\n\n` +
      `Saya telah melakukan pendaftaran dan pembayaran untuk pelatihan:\n` +
      `- Training: ${submissionResult.trainingTitle}\n` +
      `- Nama Lengkap: ${submissionResult.fullName}\n` +
      `- Email: ${submissionResult.email}\n` +
      `- No. WA: ${submissionResult.phone}\n` +
      `- Nominal: ${submissionResult.fee}\n` +
      `- ID Pendaftaran: ${submissionResult.registrationId}\n\n` +
      `Mohon konfirmasi dan informasi link pelatihan.\n\nTerima kasih.`;
    return `mailto:${BANK_ACCOUNT_DETAILS.destinationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Reset form to register another
  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionResult(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setCurrentJob("");
    setNotes("");
    setPhotoFile(null);
    setPhotoPreview(null);
    setProofFile(null);
    setProofPreview(null);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isSubmitted && submissionResult ? (
          /* =========================================================================
             SUCCESS SCREEN
             ========================================================================= */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 sm:p-8 rounded-2xl bg-card border-2 border-emerald-500/40 shadow-2xl text-center space-y-6"
          >
            <div className="size-20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
              <CheckCircle2 className="size-10 animate-bounce" />
            </div>

            <div>
              <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold mb-2">
                Pendaftaran Berhasil Terkirim
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Terima Kasih, {submissionResult.fullName}!
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Data pendaftaran dan bukti pembayaran Anda telah berhasil disimpan di sistem dan diteruskan ke email{" "}
                <span className="font-semibold text-foreground underline">
                  {BANK_ACCOUNT_DETAILS.destinationEmail}
                </span>.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-muted/50 border border-border rounded-xl p-5 text-left max-w-lg mx-auto space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  ID Registrasi
                </span>
                <span className="font-mono text-xs font-bold text-accent">
                  MSS-{submissionResult.registrationId.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pelatihan:</span>
                  <span className="font-semibold text-foreground text-right">
                    {submissionResult.trainingTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investasi Biaya:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {submissionResult.fee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama Peserta:</span>
                  <span className="font-medium text-foreground">
                    {submissionResult.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-foreground">
                    {submissionResult.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp / Telepon:</span>
                  <span className="font-medium text-foreground">
                    {submissionResult.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps Guidance */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs sm:text-sm text-foreground max-w-lg mx-auto text-left flex gap-3">
              <Info className="size-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-400">
                  Langkah Selanjutnya:
                </p>
                <p className="text-muted-foreground mt-1">
                  Tim training kami akan memverifikasi berkas dan bukti transfer Anda. Link Google Meet / Zoom serta panduan kelas akan dikirimkan ke email dan nomor WhatsApp Anda sebelum hari pelaksanaan.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <a
                href={getWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 cursor-pointer shadow-md">
                  <MessageCircle className="size-4 mr-2" />
                  Konfirmasi via WhatsApp
                </Button>
              </a>

              <a
                href={getMailtoUrl()}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-muted font-medium h-11 cursor-pointer text-xs"
                >
                  <Send className="size-3.5 mr-1.5" />
                  Kirim Salinan Email
                </Button>
              </a>

              <Button
                variant="ghost"
                onClick={() => window.print()}
                className="w-full sm:w-auto text-xs h-11 cursor-pointer"
                title="Cetak Tanda Terima"
              >
                <Printer className="size-4 mr-1.5" />
                Cetak Bukti
              </Button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Daftar Pelatihan Lainnya
              </button>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             FORM & PAYMENT DETAILS SCREEN
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* ---------------------------------------------------------------------
                LEFT / TOP COLUMN: TRAINING INFO & BANK TRANSFER DETAILS (5 Cols)
                --------------------------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-5">
              {/* Card Rekening Resmi */}
              <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-muted/40 shadow-xl p-5 sm:p-6 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/15 text-accent">
                    <CreditCard className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm sm:text-base leading-tight">
                      Rekening Resmi Pembayaran
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Pembayaran aman &amp; terverifikasi langsung
                    </p>
                  </div>
                </div>

                {/* Bank Card Graphic */}
                <div className="rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 shadow-lg space-y-4 border border-white/10 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      {BANK_ACCOUNT_DETAILS.bankName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/20 font-mono font-semibold">
                      BCA
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-blue-200/80 block uppercase tracking-wider">
                      Nomor Rekening
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-amber-300">
                        {BANK_ACCOUNT_DETAILS.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/15 hover:bg-white/25 text-white text-xs font-medium cursor-pointer transition-colors"
                        title="Salin Nomor Rekening"
                      >
                        {copiedAccount ? (
                          <>
                            <Check className="size-3.5 text-emerald-400" />
                            <span className="text-emerald-300 text-[11px]">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span className="text-[11px]">Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-1 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-[10px] text-blue-200/80 block uppercase tracking-wider">
                        Atas Nama
                      </span>
                      <span className="font-bold tracking-wide">
                        {BANK_ACCOUNT_DETAILS.accountHolder}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Training Fee Overview */}
                <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">
                      Biaya Pelatihan Terpilih:
                    </span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold">
                      {currentTraining.mode}
                    </Badge>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-foreground">
                      {currentTraining.feeFormatted}
                    </span>
                    <span className="text-xs text-muted-foreground text-right italic max-w-[180px]">
                      ({currentTraining.feeWords})
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Batas Pembayaran:</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">
                      Paling lambat {currentTraining.paymentDeadline}
                    </span>
                  </div>
                </div>

                {/* Training Details Box */}
                <div className="space-y-3 pt-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-accent" />
                    Informasi Pelatihan
                  </h5>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Calendar className="size-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-foreground font-medium">Hari, Tanggal: </span>
                        <span>{currentTraining.schedule}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Clock className="size-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-foreground font-medium">Pukul / Waktu: </span>
                        <span>{currentTraining.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-foreground font-medium">Tempat / Media: </span>
                        <span>{currentTraining.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground border-t border-border pt-2 leading-relaxed">
                    <span className="font-semibold text-foreground">Diselenggarakan oleh: </span>
                    {currentTraining.organizer}
                  </p>
                </div>

                {/* Destination Notice */}
                <div className="text-[11px] text-muted-foreground bg-primary/5 rounded-lg p-3 border border-primary/10 flex items-start gap-2">
                  <Info className="size-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    Formulir ini otomatis meneruskan data pendaftaran &amp; bukti transfer langsung ke email panitia{" "}
                    <span className="font-semibold text-foreground">
                      {BANK_ACCOUNT_DETAILS.destinationEmail}
                    </span>.
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------------
                RIGHT / MAIN COLUMN: REGISTRATION FORM (7 Cols)
                --------------------------------------------------------------------- */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border-2 border-border bg-card shadow-xl p-6 sm:p-8 space-y-6">
                <div>
                  <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-accent/30 text-xs">
                    Formulir Resmi
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    Pendaftaran &amp; Konfirmasi Pembayaran
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Silakan isi data lengkap Anda untuk penerbitan sertifikat resmi dan konfirmasi akses pelatihan.
                  </p>
                  <p className="text-xs text-rose-500 font-medium mt-1">
                    * Menunjukkan pertanyaan yang wajib diisi
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* 1. DROPDOWN PILIH TRAINING */}
                  <div className="space-y-1.5">
                    <Label htmlFor="training-select" className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-between">
                      <span>Pilih Program Training *</span>
                      <span className="text-[11px] text-accent font-semibold">Tersedia nominal &amp; jadwal</span>
                    </Label>
                    <select
                      id="training-select"
                      value={selectedTrainingId}
                      onChange={(e) => setSelectedTrainingId(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-xs sm:text-sm font-medium text-foreground shadow-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none cursor-pointer"
                      required
                    >
                      {AVAILABLE_TRAININGS.map((tr) => (
                        <option key={tr.id} value={tr.id}>
                          {tr.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground">
                      Program terpilih: <strong className="text-foreground">{currentTraining.shortTitle}</strong> ({currentTraining.feeFormatted})
                    </p>
                  </div>

                  {/* 2. NAMA LENGKAP */}
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-xs sm:text-sm font-bold text-foreground">
                      Nama Lengkap (Sesuai Nama yang dicantumkan di Sertifikat) *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Contoh: Ir. Muhammad Rizky, S.T."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-10 text-xs sm:text-sm"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Pastikan ejaan nama dan gelar sudah benar untuk dicetak pada sertifikat.
                    </p>
                  </div>

                  {/* 3. EMAIL */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-bold text-foreground">
                      Alamat Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-10 text-xs sm:text-sm"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Link Google Meet / Zoom dan e-sertifikat akan dikirimkan ke email ini.
                    </p>
                  </div>

                  {/* 4. NOMOR WA / TELEPON */}
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs sm:text-sm font-bold text-foreground">
                      Nomor WA/Telepon *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-10 text-xs sm:text-sm"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Untuk dimasukkan ke grup koordinasi peserta &amp; reminder jadwal.
                    </p>
                  </div>

                  {/* 5. POSISI PEKERJAAN SEKARANG */}
                  <div className="space-y-1.5">
                    <Label htmlFor="currentJob" className="text-xs sm:text-sm font-bold text-foreground">
                      Posisi Pekerjaan Sekarang (Bila sedang bekerja) *
                    </Label>
                    <Input
                      id="currentJob"
                      type="text"
                      placeholder="Contoh: Electrical Engineer / Mahasiswa Teknik Mesin / Belum Bekerja"
                      value={currentJob}
                      onChange={(e) => setCurrentJob(e.target.value)}
                      required
                      className="h-10 text-xs sm:text-sm"
                    />
                  </div>

                  {/* 6. UPLOAD PHOTO BERWARNA (UNTUK SERTIFIKAT) */}
                  <div className="space-y-1.5">
                    <Label className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-between">
                      <span>Kirim Photo Berwarna (Untuk sertifikat) *</span>
                      <span className="text-[11px] text-muted-foreground">Maks 10 MB</span>
                    </Label>
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                        photoFile
                          ? "border-emerald-500 bg-emerald-500/5"
                          : "border-border hover:border-accent bg-muted/30 hover:bg-muted/50"
                      }`}
                    >
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      {photoFile ? (
                        <div className="flex items-center justify-center gap-3">
                          {photoPreview && (
                            <img
                              src={photoPreview}
                              alt="Preview Foto"
                              className="size-12 rounded-lg object-cover border border-emerald-500"
                            />
                          )}
                          <div className="text-left">
                            <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <FileCheck className="size-3.5 text-emerald-600" />
                              {photoFile.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {(photoFile.size / 1024 / 1024).toFixed(2)} MB • Klik untuk ganti
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-1">
                          <Upload className="size-6 text-muted-foreground mx-auto" />
                          <p className="text-xs font-semibold text-foreground">
                            Pilih Foto Berwarna (Pasfoto formal)
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Format JPG, PNG, atau WebP (Maksimal 10 MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 7. UPLOAD BUKTI BAYAR TRAINING */}
                  <div className="space-y-1.5">
                    <Label className="text-xs sm:text-sm font-bold text-foreground flex items-center justify-between">
                      <span>Kirim Bukti Bayar Training *</span>
                      <span className="text-[11px] text-muted-foreground">Maks 10 MB</span>
                    </Label>
                    <div
                      onClick={() => proofInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                        proofFile
                          ? "border-emerald-500 bg-emerald-500/5"
                          : "border-border hover:border-accent bg-muted/30 hover:bg-muted/50"
                      }`}
                    >
                      <input
                        ref={proofInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg,application/pdf"
                        onChange={handleProofChange}
                        className="hidden"
                      />
                      {proofFile ? (
                        <div className="flex items-center justify-center gap-3">
                          {proofPreview ? (
                            <img
                              src={proofPreview}
                              alt="Preview Bukti Bayar"
                              className="size-12 rounded-lg object-cover border border-emerald-500"
                            />
                          ) : (
                            <FileText className="size-8 text-emerald-600" />
                          )}
                          <div className="text-left">
                            <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                              <FileCheck className="size-3.5 text-emerald-600" />
                              {proofFile.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {(proofFile.size / 1024 / 1024).toFixed(2)} MB • Klik untuk ganti
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-1">
                          <CreditCard className="size-6 text-muted-foreground mx-auto" />
                          <p className="text-xs font-semibold text-foreground">
                            Upload Bukti Transfer / Resi Pembayaran
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Format JPG, PNG, WebP atau PDF (Maksimal 10 MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 8. CATATAN TAMBAHAN (OPSIONAL) */}
                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-xs sm:text-sm font-medium text-foreground">
                      Catatan / Pertanyaan Tambahan (Opsional)
                    </Label>
                    <Textarea
                      id="notes"
                      rows={2}
                      placeholder="Tuliskan catatan khusus atau permintaan faktur / invoice bila ada..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="text-xs sm:text-sm resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-extrabold h-12 text-sm sm:text-base shadow-lg cursor-pointer transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-5 mr-2 animate-spin" />
                          Mengirimkan Pendaftaran &amp; Bukti Bayar...
                        </>
                      ) : (
                        <>
                          <Send className="size-4 mr-2" />
                          Kirim Formulir Pendaftaran &amp; Bukti Pembayaran
                        </>
                      )}
                    </Button>
                    <p className="text-center text-[11px] text-muted-foreground mt-2">
                      Data Anda aman dan akan diproses langsung oleh tim panitia PT Mosha Sinalsal Solusi ({BANK_ACCOUNT_DETAILS.destinationEmail}).
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
