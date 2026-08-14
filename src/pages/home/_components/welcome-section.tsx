import { motion } from "motion/react";

export default function WelcomeSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
              About Our Company
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Engineering Excellence Since 2021
            </h2>
            <p className="text-base font-medium text-accent mb-6">
              Training, Konsultan &amp; Supply Manpower
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">
                  PT Mosha Sinalsal Solusi (MSS)
                </strong>{" "}
                was established in November 2021. We specialize in delivering
                turnkey system solutions across the full project lifecycle.
              </p>
              <p>
                From initial concept and engineering design through
                installation, commissioning, and ongoing maintenance — our team
                brings decades of combined expertise in plant commissioning,
                automation systems, renewable energy, and professional manpower
                supply.
              </p>
              <p>
                Headquartered in Batam, Kepulauan Riau, we serve clients
                throughout Indonesia and the Asia-Pacific region with a
                commitment to global-standard quality, safety, and reliability.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "140 MW", label: "Largest Plant" },
              { value: "6+", label: "Industry Sectors" },
              { value: "2021", label: "Established" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <p className="text-2xl lg:text-3xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
