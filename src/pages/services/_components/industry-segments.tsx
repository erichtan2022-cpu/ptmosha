import { motion } from "motion/react";
import {
  Flame,
  Zap,
  Sun,
  Ship,
  FlaskConical,
  Droplets,
  Mountain,
  Leaf,
} from "lucide-react";

const SEGMENTS = [
  {
    icon: Flame,
    title: "Oil & Gas",
    description:
      "Upstream and downstream facility commissioning, piping, instrumentation, and process control systems.",
  },
  {
    icon: Zap,
    title: "Power Plant",
    description:
      "Gas turbine, steam turbine, and combined cycle power plant commissioning and electrical systems.",
  },
  {
    icon: Sun,
    title: "Solar Power & Renewable Energy",
    description:
      "Photovoltaic system design, installation, inverter commissioning, and grid interconnection.",
  },
  {
    icon: Ship,
    title: "Marine / Shipyard",
    description:
      "Vessel electrical systems, shipboard automation, navigation electronics, and docking commissioning.",
  },
  {
    icon: FlaskConical,
    title: "Smelter / Chemical Plant",
    description:
      "Process instrumentation, DCS configuration, burner management systems, and safety interlocks.",
  },
  {
    icon: Droplets,
    title: "Water Treatment",
    description:
      "SCADA systems, pump control automation, water quality monitoring, and PLC programming.",
  },
  {
    icon: Mountain,
    title: "Mining",
    description:
      "Conveyor control systems, power distribution, remote monitoring, and heavy equipment instrumentation.",
  },
  {
    icon: Leaf,
    title: "Environment & Sustainability",
    description:
      "Emissions monitoring, environmental compliance systems, waste management automation, and green technology integration.",
  },
] as const;

export default function IndustrySegments() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Industry Segments
          </h2>
          <p className="text-muted-foreground">
            We serve clients across diverse industrial verticals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SEGMENTS.map((segment, idx) => (
            <motion.div
              key={segment.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="group p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="size-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <segment.icon className="size-5 text-accent" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {segment.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {segment.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
