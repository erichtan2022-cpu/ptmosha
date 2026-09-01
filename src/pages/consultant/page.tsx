import PageHero from "@/components/layout/page-hero.tsx";
import ConsultantList from "./_components/consultant-list.tsx";

const HERO_IMAGE =
  "https://images.pexels.com/photos/8761328/pexels-photo-8761328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

export default function ConsultantPage() {
  return (
    <>
      <PageHero
        label="Our Consultants"
        title="Consultant List"
        description="Expert consultancy services across engineering, energy, sustainability, management, and professional development — delivered by experienced specialists."
        image={HERO_IMAGE}
      />
      <ConsultantList />
    </>
  );
}
