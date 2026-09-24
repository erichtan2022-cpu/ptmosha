import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative pointer-events-auto max-w-lg w-full">
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {/* Image */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/PT_MOSHA_New.jpg"
                  alt="Commissioning Training - PT Mosha Sinalsal Solusi"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
