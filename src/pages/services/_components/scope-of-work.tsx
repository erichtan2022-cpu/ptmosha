import { motion } from "motion/react";
import {
  Settings,
  Cpu,
  Sun,
  Users,
  CheckCircle2,
} from "lucide-react";

const SCOPES = [
  {
    icon: Settings,
    title: "Plant Commissioning",
    subtitle: "Full-scope commissioning services",
    items: [
      "Power Plant (Gas Turbine, Steam Turbine, CCPP, PLTMG)",
      "Oil & Gas (Upstream & Downstream Facilities)",
      "Chemical Plant & Smelter",
      "Marine & Shipyard (Vessel Systems)",
      "Pre-commissioning, commissioning, and start-up",
      "Performance testing & acceptance",
      "Mechanical completion & punch-list management",
      "System turnover documentation",
    ],
  },
  {
    icon: Cpu,
    title: "Automation, Electrical & Instrumentation",
    subtitle: "Complete E&I solutions",
    items: [
      "PLC Programming (Siemens, Allen-Bradley, Schneider)",
      "HMI/SCADA Development & Configuration",
      "DCS System Integration (Yokogawa, Honeywell, ABB)",
      "Instrument Calibration & Loop Testing",
      "Power Distribution & MCC Commissioning",
      "Motor Control & VFD Configuration",
      "Fire & Gas Detection System",
      "Emergency Shutdown System (ESD)",
    ],
  },
  {
    icon: Sun,
    title: "Energy, Geothermal & Solar Power",
    subtitle: "Renewable energy engineering",
    items: [
      "Solar PV System Design & Engineering",
      "Solar Panel Installation & Construction",
      "Inverter Commissioning & Grid Tie",
      "Geothermal Power Plant Support",
      "Energy Audit & Optimization",
      "Electrical Balance of Plant (BoP)",
      "Performance Ratio Monitoring",
      "O&M Support for Solar Farms",
    ],
  },
  {
    icon: Users,
    title: "Professional Manpower Supply",
    subtitle: "Skilled personnel for all project phases",
    items: [
      "Engineering (Electrical, Mechanical, Instrument, Process)",
      "Construction Supervisors & Foremen",
      "QA/QC Inspectors (Welding, Piping, Electrical)",
      "Commissioning Engineers & Technicians",
      "Operation & Maintenance Personnel",
      "HSE Officers & Safety Supervisors",
      "Project Management Staff",
      "Document Controllers & Planners",
    ],
  },
] as const;

export default function ScopeOfWork() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
            Detailed Capabilities
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Scope of Work
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            In-depth look at our service capabilities and technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SCOPES.map((scope, idx) => (
            <motion.div
              key={scope.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 lg:p-8 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <scope.icon className="size-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {scope.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {scope.subtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {scope.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
