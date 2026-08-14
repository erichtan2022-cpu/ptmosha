import PageHero from "@/components/layout/page-hero.tsx";
import CompanyBackground from "./_components/company-background.tsx";
import VisionMission from "./_components/vision-mission.tsx";
import QhseSection from "./_components/qhse-section.tsx";
import OrgChart from "./_components/org-chart.tsx";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1694521787162-5373b598945c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwZW5naW5lZXJpbmclMjBjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwd29ya2Vyc3xlbnwwfHx8fDE3ODYyOTc3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Tentang Kami"
        description="A premier engineering consultancy and contractor with global capabilities, delivering turnkey solutions across Indonesia and the Asia-Pacific region."
        image={HERO_IMAGE}
      />
      <CompanyBackground />
      <VisionMission />
      <QhseSection />
      <OrgChart />
    </>
  );
}
