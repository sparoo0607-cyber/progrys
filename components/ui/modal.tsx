"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Modal / Bottom Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed z-50 flex flex-col bg-[var(--card)] border border-[var(--card-border)] shadow-2xl",
              // Mobile: bottom sheet
              "bottom-0 left-0 right-0 max-h-[90vh] rounded-t-2xl",
              // Desktop: centered modal
              "sm:bottom-auto sm:top-[50%] sm:left-[50%] sm:right-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md sm:rounded-2xl sm:max-h-[85vh]",
              className
            )}
            // Important override for desktop positioning with framer-motion centering
            style={{ 
              top: typeof window !== "undefined" && window.innerWidth >= 640 ? "50%" : undefined,
              transform: typeof window !== "undefined" && window.innerWidth >= 640 ? "translate(-50%, -50%)" : undefined,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--alt-section)] rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
