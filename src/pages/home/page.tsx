import HeroSlider from "./_components/hero-slider.tsx";
import WelcomeSection from "./_components/welcome-section.tsx";
import ServicesHighlights from "./_components/services-highlights.tsx";
import ClientMarquee from "./_components/client-marquee.tsx";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <WelcomeSection />
      <ServicesHighlights />
      <ClientMarquee />
    </>
  );
}
