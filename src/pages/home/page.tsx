import HeroSlider from "./_components/hero-slider.tsx";
import WelcomeSection from "./_components/welcome-section.tsx";
import ServicesHighlights from "./_components/services-highlights.tsx";
import ClientMarquee from "./_components/client-marquee.tsx";
import PromoPopup from "./_components/promo-popup.tsx";

export default function HomePage() {
  return (
    <>
      <PromoPopup />
      <HeroSlider />
      <WelcomeSection />
      <ServicesHighlights />
      <ClientMarquee />
    </>
  );
}
