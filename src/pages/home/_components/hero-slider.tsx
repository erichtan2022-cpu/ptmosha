import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image:
      "https://images.pexels.com/photos/35157344/pexels-photo-35157344.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    headline: "Training, Consultant & Manpower Supply",
    subheadline:
      "Professional engineering training, expert consultancy services, and skilled personnel supply for every project phase.",
    cta: "Our Services",
    ctaLink: "/services",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513257805917-a0da1146eb15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHw4fHxpbmR1c3RyaWFsJTIwcG93ZXIlMjBwbGFudCUyMGVuZ2luZWVyaW5nJTIwY29tbWlzc2lvbmluZ3xlbnwwfHx8fDE3ODYyOTY4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Plant Commissioning & Energy Solutions",
    subheadline:
      "Turnkey commissioning services for power plants, oil & gas, and industrial facilities across Indonesia.",
    cta: "Our Services",
    ctaLink: "/services",
  },
  {
    image:
      "https://images.unsplash.com/photo-1783419752280-46a2073ef7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwYXV0b21hdGlvbiUyMGluZHVzdHJpYWwlMjBjb250cm9sJTIwcGFuZWx8ZW58MHx8fHwxNzg2Mjk2ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Automation & Electrical Systems",
    subheadline:
      "PLC, HMI, DCS, and SCADA system integration. Complete electrical & instrumentation solutions.",
    cta: "Explore Projects",
    ctaLink: "/projects",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwyfHxzb2xhciUyMHBhbmVsJTIwaW5zdGFsbGF0aW9uJTIwcmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fHx8MTc4NjI5Njg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Solar Power & Marine Engineering",
    subheadline:
      "Renewable energy design & construction. Shipyard electrical solutions for global maritime projects.",
    cta: "Contact Us",
    ctaLink: "/contact",
  },
] as const;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Ken Burns animated background */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[current].image}
              alt={SLIDES[current].headline}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.04_250/0.85)] via-[oklch(0.18_0.04_250/0.6)] to-[oklch(0.18_0.04_250/0.3)]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="h-1 bg-accent mb-6"
              />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance">
                {SLIDES[current].headline}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                {SLIDES[current].subheadline}
              </p>
              <div className="mt-8 flex gap-3">
                <Link to={SLIDES[current].ctaLink}>
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cursor-pointer"
                  >
                    {SLIDES[current].cta}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white/10 text-white border border-white/20 hover:bg-white/20 font-semibold cursor-pointer"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-10 flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="size-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={nextSlide}
          className="size-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "w-8 bg-accent" : "w-4 bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
