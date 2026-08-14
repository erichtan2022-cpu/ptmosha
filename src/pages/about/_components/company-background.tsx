import { motion } from "motion/react";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZW5naW5lZXJpbmclMjBjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwd29ya2Vyc3xlbnwwfHx8fDE3ODYyOTc3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function CompanyBackground() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed"
          >
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                Who We Are
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Company Background
              </h2>
            </div>

            <p>
              <strong className="text-foreground">
                PT Mosha Sinalsal Solusi (MSS)
              </strong>{" "}
              was established in November 2021. The company was founded to meet the
              growing demand for professional engineering services in Indonesia{"'"}s
              expanding industrial and energy sectors.
            </p>
            <p>
              We specialize in providing comprehensive{" "}
              <strong className="text-foreground">
                turnkey system solutions
              </strong>{" "}
              — covering the entire project lifecycle from initial concept
              development, detailed engineering design, procurement, fabrication,
              installation, testing, and commissioning through to ongoing
              operation and maintenance support.
            </p>
            <p>
              Our expertise spans multiple industry sectors including oil &
              gas, power generation (conventional and renewable), marine and
              shipyard, chemical processing, water treatment, and mining. We
              bring together a team of highly experienced engineers,
              technicians, and project managers who have delivered projects
              across Indonesia and the wider Asia-Pacific region.
            </p>
            <p>
              Headquartered in Batam, Kepulauan Riau — a strategic location
              for marine and industrial projects — MSS maintains strong
              relationships with major international and domestic clients,
              ensuring we remain at the forefront of engineering excellence.
            </p>
          </motion.div>

          {/* Sidebar with Image + Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Thumbnail Image */}
            <div className="rounded-xl overflow-hidden border border-border">
              <img
                src={ABOUT_IMAGE}
                alt="Engineering team at construction site"
                className="w-full h-52 object-cover"
              />
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
                Established
              </p>
              <p className="text-lg font-bold text-foreground">November 2021</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
                Headquarters
              </p>
              <p className="text-lg font-bold text-foreground">Batam, Indonesia</p>
              <p className="text-sm text-muted-foreground">Kepulauan Riau</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
                Core Expertise
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Plant Commissioning, Automation, Renewable Energy, Manpower Supply
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
