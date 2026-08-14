import { motion } from "motion/react";
import { ShieldCheck, HeartPulse, Leaf, Award } from "lucide-react";

const QHSE_ITEMS = [
  {
    icon: Award,
    title: "Quality",
    description:
      "We adhere to international quality management standards, ensuring every deliverable meets or exceeds client expectations through continuous improvement and rigorous quality control processes.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: HeartPulse,
    title: "Health",
    description:
      "We promote occupational health programs and wellness initiatives to protect our workforce. Regular health assessments and awareness campaigns ensure a healthy working environment.",
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    description:
      "Zero incident is our target. We implement comprehensive safety management systems, conduct regular training, and maintain strict compliance with HSE regulations on every project site.",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Leaf,
    title: "Environment",
    description:
      "We are committed to minimizing environmental impact through sustainable practices, waste reduction, and supporting renewable energy initiatives that protect our planet for future generations.",
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
] as const;

export default function QhseSection() {
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
            Our Commitment
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            QHSE Standards
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Quality, Health, Safety, and Environment are at the core of
            everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QHSE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`size-12 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}
                >
                  <item.icon className={`size-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
