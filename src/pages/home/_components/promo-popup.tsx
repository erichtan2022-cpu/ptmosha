import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, CreditCard, MessageCircle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

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
                <Link
                  to="/pendaftaran?training=plts-commissioning"
                  onClick={() => setOpen(false)}
                  className="block relative group overflow-hidden bg-black/5"
                >
                  <img
                    src="/images/plts-commissioning-training.jpg"
                    alt="Pelatihan Profesional: Pengenalan, Desain & Commissioning PLTS - PT Mosha Sinalsal Solusi & Masebi"
                    className="w-full h-auto max-h-[64vh] object-contain mx-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="bg-amber-500 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                      Klik untuk Daftar &amp; Bayar Online
                    </span>
                  </div>
                </Link>

                {/* Training & Bank Notice strip */}
                <div className="bg-emerald-500/10 border-t border-border px-3 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Calendar className="size-3.5 text-emerald-600" />
                    <span>17 Okt 2026 (Online)</span>
                  </div>
                  <Badge className="bg-emerald-600 text-white font-bold text-[11px] px-2 py-0.5">
                    Rp 250.000
                  </Badge>
                </div>

                {/* Bottom Actions */}
                <div className="p-3 sm:p-4 bg-card border-t border-border flex flex-col sm:flex-row items-center gap-2">
                  <Link
                    to="/pendaftaran?training=plts-commissioning"
                    onClick={() => setOpen(false)}
                    className="w-full sm:flex-1"
                  >
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md cursor-pointer text-xs sm:text-sm h-10">
                      <CreditCard className="size-4 mr-1.5" />
                      Daftar &amp; Bayar Sekarang
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/62822268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20mendaftar%20Pelatihan%20PLTS%2017%20Oktober%202026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs sm:text-sm h-10 cursor-pointer">
                      <MessageCircle className="size-4 mr-1.5 text-emerald-600" />
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
