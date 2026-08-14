import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Building2, Zap } from "lucide-react";

type Category = "all" | "power" | "marine" | "solar" | "geothermal";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "power", label: "Power Plant" },
  { id: "geothermal", label: "Geothermal" },
  { id: "marine", label: "Marine" },
  { id: "solar", label: "Solar" },
];

const PROJECTS = [
  {
    id: 1,
    title: "PLTMG Portsite Dual Fuel Power Plant",
    capacity: "140 MW",
    location: "Papua, Indonesia",
    client: "PT Freeport Indonesia",
    year: "2022",
    category: "power" as Category,
    description:
      "Full commissioning of dual fuel (gas/diesel) power plant including gas turbine, generator systems, switchgear, protection relay, and SCADA integration.",
    image:
      "https://images.unsplash.com/photo-1578776349090-de61da00ff1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxfHxjb21iaW5lZCUyMGN5Y2xlJTIwZ2FzJTIwdHVyYmluZSUyMHBvd2VyJTIwcGxhbnR8ZW58MHx8fHwxNzg2Mjk3MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Geothermal Power Plant Rantau Dedap",
    capacity: "2 x 49 MW",
    location: "South Sumatra, Indonesia",
    client: "Supreme Energy",
    year: "2021",
    category: "geothermal" as Category,
    description:
      "Commissioning support for geothermal steam turbine generators, electrical systems, DCS configuration, and balance of plant equipment.",
    image:
      "https://images.unsplash.com/photo-1781330169385-8df0629c99b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxfHxnZW90aGVybWFsJTIwcG93ZXIlMjBwbGFudCUyMHN0ZWFtJTIwcGlwZXN8ZW58MHx8fHwxNzg2Mjk3MzQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "JAWA-1 CCPP (PLTGU)",
    capacity: "1760 MW",
    location: "Karawang, West Java",
    client: "Samsung C&T Corporation",
    year: "2020 - 2021",
    category: "power" as Category,
    description:
      "Combined cycle power plant commissioning including gas turbines, HRSGs, steam turbines, electrical & instrumentation systems, and DCS/SCADA.",
    image:
      "https://images.unsplash.com/photo-1509390288171-ce2088f7d08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwyfHxjb21iaW5lZCUyMGN5Y2xlJTIwZ2FzJTIwdHVyYmluZSUyMHBvd2VyJTIwcGxhbnR8ZW58MHx8fHwxNzg2Mjk3MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Shipyard Electrical & Instrumentation",
    capacity: "Multiple Vessels",
    location: "Batam, Kepulauan Riau",
    client: "ASL Shipyard / Birdon Pty Ltd Australia",
    year: "2021 - 2023",
    category: "marine" as Category,
    description:
      "Complete vessel electrical and instrumentation works for AHTS vessels including power distribution, navigation systems, and automation at ASL Shipyard & PT Kim Seah Shipyard.",
    image:
      "https://images.unsplash.com/photo-1598193957011-39b9f2916992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxMHx8bWFyaW5lJTIwc2hpcHlhcmQlMjBlbmdpbmVlcmluZyUyMHZlc3NlbCUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3ODYyOTY4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Solar PV Design & Construction",
    capacity: "Rooftop & Ground Mount",
    location: "Bekasi, West Java",
    client: "Private Industrial Client",
    year: "2024",
    category: "solar" as Category,
    description:
      "End-to-end solar photovoltaic system design, engineering, procurement, installation, and commissioning for industrial rooftop and ground-mounted systems.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwyfHxzb2xhciUyMHBhbmVsJTIwaW5zdGFsbGF0aW9uJTIwcmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fHx8MTc4NjI5Njg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
] as const;

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <Zap className="size-3.5 text-accent" />
                    <span className="text-xs font-semibold text-white">
                      {project.capacity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="size-3.5 text-accent shrink-0" />
                      <span className="truncate">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 text-accent shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5 text-accent shrink-0" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
