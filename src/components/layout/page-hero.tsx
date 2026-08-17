import { motion } from "motion/react";

type PageHeroProps = {
  label: string;
  title: string;
  description: string;
  image: string;
  tagline?: string;
};

export default function PageHero({ label, title, description, image, tagline }: PageHeroProps) {
  return (
    <section className="relative h-[320px] sm:h-[360px] lg:h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.04_250/0.9)] via-[oklch(0.18_0.04_250/0.75)] to-[oklch(0.18_0.04_250/0.5)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-1 bg-accent mb-5"
            />
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
              {label}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>
            {tagline && (
              <p className="mt-2 text-base font-semibold text-accent">
                {tagline}
              </p>
            )}
            <p className="mt-3 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
