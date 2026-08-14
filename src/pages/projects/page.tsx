import PageHero from "@/components/layout/page-hero.tsx";
import ProjectGrid from "./_components/project-grid.tsx";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1513257805917-a0da1146eb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHw4fHxpbmR1c3RyaWFsJTIwcG93ZXIlMjBwbGFudCUyMGVuZ2luZWVyaW5nJTIwY29tbWlzc2lvbmluZ3xlbnwwfHx8fDE3ODYyOTY4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Our Portfolio"
        title="Portofolio Pengalaman"
        description="Proven track record delivering major infrastructure projects across Indonesia with international partners."
        image={HERO_IMAGE}
      />
      <ProjectGrid />
    </>
  );
}
