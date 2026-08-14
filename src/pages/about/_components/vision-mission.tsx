import { motion } from "motion/react";
import { Target, Eye } from "lucide-react";

export default function VisionMission() {
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
            Our Direction
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Vision & Mission
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-card border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/30" />
            <div className="size-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Eye className="size-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Become a leading consultancy, contractor, and supply company in
              Indonesia that is reliable, professional, and globally competitive
              — delivering engineering solutions that empower industries and
              support the nation{"'"}s sustainable development.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 rounded-2xl bg-card border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/30" />
            <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="size-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <ul className="space-y-3 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="size-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span>
                  Provide professional turnkey engineering solutions from concept
                  through commissioning and maintenance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="size-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span>
                  Develop competent, skilled, and certified professionals to
                  meet international standards.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="size-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span>
                  Prioritize quality, safety, health, and environmental
                  sustainability in every project delivery.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="size-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                <span>
                  Build lasting partnerships by delivering excellence, integrity,
                  and value to all stakeholders.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
