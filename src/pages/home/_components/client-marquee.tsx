import { motion } from "motion/react";

const CLIENTS = [
  "Samsung C&T Corporation",
  "ASL Marine Holdings",
  "Wärtsilä Corporation",
  "PT Freeport Indonesia",
  "Supreme Energy",
  "PLN Indonesia",
  "Suzuki Indomobil",
  "Birdon Pty Ltd",
  "Kim Seah Shipyard",
  "PT Destin Mandiri",
] as const;

export default function ClientMarquee() {
  return (
    <section className="py-12 lg:py-16 bg-primary overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10" />

        {/* Scrolling track */}
        <motion.div
          animate={{ x: [0, -1600] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-12 items-center"
        >
          {/* Double the items for seamless loop */}
          {[...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div
              key={`${client}-${idx}`}
              className="shrink-0 px-6 py-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5"
            >
              <span className="text-sm font-medium text-primary-foreground/80 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
