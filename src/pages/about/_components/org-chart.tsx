import { motion } from "motion/react";
import { User, Users, HardHat } from "lucide-react";

const ORG_LEVELS = [
  {
    level: "Top Management",
    icon: User,
    roles: ["Director", "General Manager", "Finance Manager"],
    accent: "border-accent bg-accent/5",
    iconColor: "text-accent",
  },
  {
    level: "Project Management",
    icon: Users,
    roles: [
      "Project Manager",
      "Project Engineer",
      "HSE Manager",
      "QA/QC Manager",
      "Procurement",
    ],
    accent: "border-primary bg-primary/5",
    iconColor: "text-primary",
  },
  {
    level: "Execution Team",
    icon: HardHat,
    roles: [
      "Site Supervisor",
      "Commissioning Engineer",
      "Electrical Engineer",
      "Instrument Technician",
      "Automation Engineer",
      "Mechanical Fitter",
    ],
    accent: "border-muted-foreground/30 bg-muted/50",
    iconColor: "text-muted-foreground",
  },
] as const;

export default function OrgChart() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
            Our People
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Organization Structure
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A structured hierarchy ensuring efficient project delivery from
            leadership to field execution
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {ORG_LEVELS.map((level, idx) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div
                className={`p-6 rounded-xl border-2 ${level.accent} relative`}
              >
                {/* Connector line */}
                {idx < ORG_LEVELS.length - 1 && (
                  <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-border" />
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-lg bg-card border border-border flex items-center justify-center">
                    <level.icon className={`size-5 ${level.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {level.level}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {level.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-card border border-border text-muted-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
