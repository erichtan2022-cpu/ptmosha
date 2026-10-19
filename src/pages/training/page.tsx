import PageHero from "@/components/layout/page-hero.tsx";
import FeaturedTrainingCard from "./_components/featured-training-card.tsx";
import TrainingTable from "./_components/training-table.tsx";
import SEOHead from "@/components/seo/seo-head.tsx";

const HERO_IMAGE =
  "https://images.pexels.com/photos/8761328/pexels-photo-8761328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

export default function TrainingPage() {
  return (
    <>
      <SEOHead
        title="Program Training & Sertifikasi"
        path="/training"
        description="Daftar pelatihan profesional PT Mosha Sinalsal Solusi: Training Commissioning Oil & Gas, PLTS (Pembangkit Listrik Tenaga Surya), EPC, dan sertifikasi teknik. Online dan tatap muka di Batam."
        keywords="training commissioning, pelatihan PLTS, sertifikasi Oil Gas, kursus engineering, training online Batam, pelatihan teknik Indonesia, commissioning PLTS"
      />
      <PageHero
        label="Our Training"
        title="Training & Certification Program"
        description="Professional training programs covering engineering commissioning, renewable energy, safety, sustainability, and professional certification — available online and offline."
        image={HERO_IMAGE}
      />
      
      {/* Quick link banner to Alumni & Certificate Verification Database */}
      <div className="bg-primary/5 border-b border-border py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="flex size-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold shrink-0">
              ✓
            </span>
            <p className="text-xs sm:text-sm text-foreground">
              Sudah menyelesaikan pelatihan di PT Mosha? Cek status kelulusan &amp; unduh e-sertifikat Anda di{" "}
              <strong>Direktori Verifikasi Sertifikat</strong>.
            </p>
          </div>
          <a
            href="/verifikasi-sertifikat"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent/80 transition-colors shrink-0 underline decoration-accent/40 underline-offset-4"
          >
            Buka Database Alumni &amp; Sertifikat →
          </a>
        </div>
      </div>

      <FeaturedTrainingCard />
      <TrainingTable />
    </>
  );
}

