import PageHero from "@/components/layout/page-hero.tsx";
import TrainingTable from "./_components/training-table.tsx";

const HERO_IMAGE =
  "https://images.pexels.com/photos/8761328/pexels-photo-8761328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="Our Training"
        title="Program Training & Sertifikasi"
        description="Professional training programs covering engineering commissioning, renewable energy, safety, sustainability, and professional certification — available online and offline."
        image={HERO_IMAGE}
      />
      <TrainingTable />
    </>
  );
}
