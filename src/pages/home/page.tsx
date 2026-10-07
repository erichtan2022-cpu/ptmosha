import HeroSlider from "./_components/hero-slider.tsx";
import WelcomeSection from "./_components/welcome-section.tsx";
import ServicesHighlights from "./_components/services-highlights.tsx";
import ClientMarquee from "./_components/client-marquee.tsx";
import PromoPopup from "./_components/promo-popup.tsx";
import SEOHead from "@/components/seo/seo-head.tsx";

export default function HomePage() {
  return (
    <>
      <SEOHead
        path="/"
        description="PT Mosha Sinalsal Solusi - Perusahaan konsultan engineering, training commissioning Oil & Gas, PLTS, dan supply manpower profesional di Batam dan seluruh Indonesia. Local Company | Global Capabilities."
        keywords="PT Mosha Sinalsal Solusi, training commissioning, Oil Gas Batam, PLTS, konsultan engineering, supply manpower, pelatihan teknik Indonesia"
      />
      <PromoPopup />
      <HeroSlider />
      <WelcomeSection />
      <ServicesHighlights />
      <ClientMarquee />
    </>
  );
}
