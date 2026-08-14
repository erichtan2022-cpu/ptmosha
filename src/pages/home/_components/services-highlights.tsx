import { motion } from "motion/react";
import { Wrench, Cpu, Sun, Users } from "lucide-react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    icon: Wrench,
    title: "Plant Commissioning",
    description:
      "Full-scope commissioning for power plants, oil & gas, chemical, and marine facilities.",
  },
  {
    icon: Cpu,
    title: "Automation & Electrical",
    description:
      "PLC, HMI, DCS, SCADA integration with complete electrical & instrumentation systems.",
  },
  {
    icon: Sun,
    title: "Energy & Solar Power",
    description:
      "Renewable energy design, construction, and geothermal power plant engineering.",
  },
  {
    icon: Users,
    title: "Manpower Supply",
    description:
      "Professional engineering, construction, QA/QC, and O&M personnel for all project scales.",
  },
] as const;

export default function ServicesHighlights() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
            What We Do
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Core Services
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive engineering solutions from concept to completion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to="/services"
                className="group block p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full cursor-pointer"
              >
                <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="size-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
