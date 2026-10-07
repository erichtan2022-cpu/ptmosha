import { useSearchParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  GraduationCap,
  ArrowLeft,
  ShieldCheck,
  Zap,
  HelpCircle,
  FileCheck2,
  PhoneCall,
} from "lucide-react";
import TrainingRegistrationForm from "@/components/training/training-registration-form.tsx";
import { BANK_ACCOUNT_DETAILS } from "@/data/training-programs.ts";
import { Button } from "@/components/ui/button.tsx";
import SEOHead from "@/components/seo/seo-head.tsx";

export default function PendaftaranPage() {
  const [searchParams] = useSearchParams();
  const trainingParam = searchParams.get("training") || "plts-commissioning";

  return (
    <div className="min-h-screen bg-muted/20 py-8 sm:py-12">
      <SEOHead
        title="Pendaftaran & Pembayaran Training"
        path="/pendaftaran"
        description="Formulir pendaftaran resmi dan konfirmasi pembayaran pelatihan PT Mosha Sinalsal Solusi. Pilih program training, bayar ke BCA 3262681995, dan upload bukti transfer langsung."
        keywords="pendaftaran training, pembayaran pelatihan, formulir registrasi, BCA PT Mosha, daftar training PLTS, daftar commissioning"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/training"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Daftar Training
          </Link>

          <a
            href={`https://wa.me/${BANK_ACCOUNT_DETAILS.adminWhatsapp1}?text=Halo%20Admin%20PT%20Mosha,%20saya%20butuh%20bantuan%20terkait%20pendaftaran%20training`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            <PhoneCall className="size-3.5" />
            Butuh Bantuan? Hubungi Admin
          </a>
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="size-4" />
            Pendaftaran &amp; Pembayaran Resmi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Formulir Pendaftaran &amp; Konfirmasi Pembayaran
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Lengkapi data diri Anda, pilih program pelatihan yang sedang dibuka, lakukan pembayaran ke rekening resmi PT Mosha Sinalsal Solusi, dan lampirkan bukti transfer untuk validasi.
          </p>
        </motion.div>

        {/* Core Form Component */}
        <TrainingRegistrationForm initialTrainingId={trainingParam} />

        {/* Value Props & Guarantee Footnotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Rekening Resmi Perusahaan</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Semua pembayaran ditujukan langsung ke Bank Central Asia (BCA) a.n. PT Mosha Sinalsal Solusi (3262681995).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
            <FileCheck2 className="size-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground">E-Sertifikat &amp; Modul Lengkap</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Peserta mendapatkan e-sertifikat resmi berpenomoran khusus, softcopy materi lengkap, serta rekaman video kelas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
            <Zap className="size-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Verifikasi &amp; Email Konfirmasi</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Data pendaftaran dan bukti transfer langsung diverifikasi dan diteruskan ke email panitia (moshasolusi@gmail.com).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
