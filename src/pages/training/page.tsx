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
      <FeaturedTrainingCard />
      <TrainingTable />
    </>
  );
}

