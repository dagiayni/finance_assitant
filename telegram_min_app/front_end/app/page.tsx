"use client";

import Layout from "@/components/Layout";
import { Button, Card } from "@/components/UI";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <Layout showGradients={true}>
      <div className="flex-1 flex flex-col items-center justify-center px-page-margin py-12">
        {/* Brand Identity Section */}
        <header className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mb-8 soft-shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img
              alt="FinanceFlow Logo"
              className="w-14 h-14 object-contain invert relative z-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFgvYbxuyhWmBTRWuGDD_VwNfrK69OM4is1xlTSxv-WC6zHXQ-TlXHOoaYReuugMu9-0VYZMVrKp6HFlZWCpvprhUhiii8fQSJj77_eyhgI3wyL4buXDx2NK4FnSIACV4thdcvWFnxDrgHN43FV8ginfNEFsR5HeIY044wrGjXOeiISNFSJ-_htXc8t5EhKAITcxq4ygmF8tEaOkswn81gMYFBREIx_mneU1yPgbHVM9-Xs5p_pMRb5_bjG5N3SrH7WxZbx9Ci8J0"
            />
            <div className="absolute inset-0 paper-grain opacity-20"></div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-manrope text-5xl font-black text-primary tracking-tighter mb-4 leading-none">
              Finance<span className="text-secondary">Flow</span>
            </h1>
            <p className="font-work-sans text-lg text-on-surface-variant font-medium max-w-[280px] mx-auto leading-relaxed opacity-80">
              Navigate complexity with <span className="text-primary font-bold">quiet confidence.</span>
            </p>
          </motion.div>
        </header>

        {/* Main Interaction Module */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm"
        >
          <Card className="p-8 bg-surface-container-lowest/40 backdrop-blur-md border-0 shadow-2xl" paperGrain={false}>
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <h3 className="font-manrope font-black text-xl text-primary">Welcome back</h3>
                <p className="font-work-sans text-xs text-on-surface-variant opacity-70">Securely sign in via Telegram to access your insights.</p>
              </div>
              <Link href="/onboarding/verify" className="w-full">
                <Button icon="bolt" variant="primary">Access Your Empire</Button>
              </Link>
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-[1px] bg-outline-variant/30"></div>
                <span className="font-work-sans text-[10px] font-black text-outline-variant uppercase tracking-widest">Privacy Protected</span>
                <div className="flex-1 h-[1px] bg-outline-variant/30"></div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Trust Signals / Footer */}
        <footer className="mt-auto pt-16 text-center space-y-6">
          <div className="flex items-center justify-center gap-8 opacity-40">
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
              <span className="font-work-sans text-[10px] font-bold uppercase tracking-wider">AES-256</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">visibility_off</span>
              <span className="font-work-sans text-[10px] font-bold uppercase tracking-wider">No Tracking</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">cloud_done</span>
              <span className="font-work-sans text-[10px] font-bold uppercase tracking-wider">Cloud Sync</span>
            </div>
          </div>
          <p className="font-work-sans text-[10px] text-outline-variant/60 max-w-[240px] mx-auto leading-relaxed uppercase tracking-widest font-medium">
            Authorized by <span className="text-primary font-black">Telegram Security Protocol</span>
          </p>
        </footer>
      </div>
    </Layout>
  );
}
