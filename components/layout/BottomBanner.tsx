"use client";

import * as React from "react";
import { X, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BottomBanner() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Show only if not dismissed in this session (or local storage as requested, let's use localStorage)
    const isDismissed = localStorage.getItem("bottom-banner-dismissed");
    if (!isDismissed) {
      // Delay before sliding up
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("bottom-banner-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#FFFFFF] border-t border-[#E4E4E7] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#A1A1AA] bg-[#F4F4F5] px-2 py-1 rounded">
                <Megaphone size={12} /> Sponsored
              </span>
              <p className="text-sm font-medium text-[#0A0A0A]">
                Get 50% off the Ultimate Developer Roadmap bundle this week only!
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-[#A1A1AA] hover:text-[#0A0A0A] hover:bg-[#F4F4F5] rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
