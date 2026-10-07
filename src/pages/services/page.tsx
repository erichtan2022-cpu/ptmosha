import PageHero from "@/components/layout/page-hero.tsx";
import IndustrySegments from "./_components/industry-segments.tsx";
import ScopeOfWork from "./_components/scope-of-work.tsx";
import SEOHead from "@/components/seo/seo-head.tsx";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1620203853151-496c7228306c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxMHx8aW5kdXN0cmlhbCUyMHBvd2VyJTIwcGxhbnQlMjBlbmdpbmVlcmluZyUyMGNvbW1pc3Npb25pbmd8ZW58MHx8fHwxNzg2Mjk2ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Layanan Engineering & Konsultan"
        path="/services"
        description="Jasa konsultasi engineering, konstruksi, commissioning, dan maintenance untuk industri migas, pembangkit listrik, marine, dan energi terbarukan di seluruh Indonesia."
        keywords="jasa engineering, konsultan commissioning, Oil Gas service, konstruksi industri, maintenance pembangkit, EPC Indonesia, Batam"
      />
      <PageHero
        label="Our Services"
        title="Layanan & Solusi"
        description="Comprehensive engineering services across 7 major industry sectors, from design and installation to commissioning and maintenance."
        image={HERO_IMAGE}
      />
      <IndustrySegments />
      <ScopeOfWork />
    </>
  );
}
