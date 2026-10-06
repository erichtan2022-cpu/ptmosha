import { useState, useEffect } from "react";
import { X, ExternalLink, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button.tsx";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 pointer-events-none overflow-y-auto"
          >
            <div className="relative pointer-events-auto max-w-sm sm:max-w-md w-full my-auto">
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 shadow-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-border"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {/* Card Container */}
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-card border border-border/80 flex flex-col max-h-[90vh]">
                <a
                  href="https://bit.ly/3T6EePy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group overflow-hidden bg-black/5"
                >
                  <img
                    src="/images/plts-commissioning-training.jpg"
                    alt="Pelatihan Profesional: Pengenalan, Desain & Commissioning PLTS - PT Mosha Sinalsal Solusi & Masebi"
                    className="w-full h-auto max-h-[68vh] object-contain mx-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Klik untuk Mendaftar
                    </span>
                  </div>
                </a>

                {/* Bottom Actions */}
                <div className="p-3 sm:p-4 bg-card border-t border-border flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href="https://bit.ly/3T6EePy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1"
                  >
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md cursor-pointer text-xs sm:text-sm h-9">
                      <ExternalLink className="size-3.5 mr-1.5" />
                      Daftar (bit.ly/3T6EePy)
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/62822268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20mendaftar%20Pelatihan%20PLTS%2017%20Oktober%202026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs sm:text-sm h-9 cursor-pointer">
                      <MessageCircle className="size-3.5 mr-1.5 text-emerald-600" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
