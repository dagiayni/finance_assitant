"use client";

import { motion } from "framer-motion";

export default function PremiumLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 bg-primary rounded-2xl shadow-xl flex items-center justify-center mb-6 relative overflow-hidden"
        >
          <img
            alt="Logo"
            className="w-10 h-10 object-contain invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFgvYbxuyhWmBTRWuGDD_VwNfrK69OM4is1xlTSxv-WC6zHXQ-TlXHOoaYReuugMu9-0VYZMVrKp6HFlZWCpvprhUhiii8fQSJj77_eyhgI3wyL4buXDx2NK4FnSIACV4thdcvWFnxDrgHN43FV8ginfNEFsR5HeIY044wrGjXOeiISNFSJ-_htXc8t5EhKAITcxq4ygmF8tEaOkswn81gMYFBREIx_mneU1yPgbHVM9-Xs5p_pMRb5_bjG5N3SrH7WxZbx9Ci8J0"
          />
          <div className="absolute inset-0 paper-texture opacity-10"></div>
        </motion.div>
        
        <motion.h2
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-manrope text-xl font-bold text-primary tracking-tight"
        >
          FinanceFlow
        </motion.h2>
        <p className="font-work-sans text-xs text-on-surface-variant mt-2 uppercase tracking-[0.2em]">Loading your assets</p>
      </motion.div>
    </div>
  );
}
