"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showGradients?: boolean;
}

export default function Layout({ children, showGradients = true }: LayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      {/* Visual Background Element (Subtle Gradient) */}
      {showGradients && (
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary-container rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary-container rounded-full blur-[120px]"></div>
        </div>
      )}

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md flex flex-col min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
}
