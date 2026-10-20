import PageHero from "@/components/layout/page-hero.tsx";
import ConsultantList from "./_components/consultant-list.tsx";
import PltsBrochureSection from "./_components/plts-brochure-section.tsx";
import SEOHead from "@/components/seo/seo-head.tsx";

const HERO_IMAGE =
  "https://images.pexels.com/photos/8761328/pexels-photo-8761328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

export default function ConsultantPage() {
  return (
    <>
      <SEOHead
        title="Daftar Konsultan & Pelatih - Termasuk Brosur PLTS Atap"
        path="/consultant"
        description="Daftar konsultan profesional, instalasi PLTS Atap, dan instruktur training PT Mosha Sinalsal Solusi - Ahli commissioning, engineering, energi terbarukan, manajemen, dan sertifikasi profesional."
        keywords="konsultan engineering, brosur PLTS Atap, pasang panel surya, konsultan PLTS, instruktur training, ahli commissioning, Batam"
      />
      <PageHero
        label="Our Consultants"
        title="Consultant List"
        description="Expert consultancy services across engineering, energy, sustainability, management, and professional development — delivered by experienced specialists."
        image={HERO_IMAGE}
      />
      <ConsultantList />
      <PltsBrochureSection />
    </>
  );
}
