"use client";

import Layout from "@/components/Layout";
import { Card, Button, Input } from "@/components/UI";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <Layout showGradients={true}>
      <header className="flex justify-between items-center px-page-margin h-20 w-full z-50 fixed top-0 glass border-0 border-b border-white/10">
        <Link href="/" className="active:scale-90 transition-transform p-3 bg-surface-container-low rounded-full">
          <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
        </Link>
        <div className="flex flex-col items-center">
          <div className="font-manrope text-lg font-extrabold text-primary tracking-tight">Identity</div>
          <div className="font-work-sans text-[10px] font-black text-secondary uppercase tracking-widest">Verification</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-white/20">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">verified</span>
        </div>
      </header>

      <main className="flex-grow pt-28 pb-32 px-page-margin w-full flex flex-col max-w-lg mx-auto">
        <section className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-manrope text-3xl font-black text-primary mb-3 leading-tight"
          >
            Confirm your profile.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-work-sans text-base text-on-surface-variant leading-relaxed"
          >
            We've securely imported your Telegram details. Please ensure your contact info is up to date for encrypted alerts.
          </motion.p>
        </section>

        <div className="flex-1">
          <Card className="p-inner-padding mb-10 bg-surface-container-lowest/40 backdrop-blur-sm border-0 shadow-2xl" paperGrain={false}>
            <div className="flex flex-col items-center mb-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-secondary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  alt="User Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgRk2oyiyim8m2i04VcC9Pl39wf5mYKSR9fzmfV3-5D4HCSzGay12wInxXv-D4eqJ3MpWmPUy4ZMncMVYbwPVofkidyvhD8UFQgJ_97eExKW-DtdxccTwyOlrKkyOw4aDpzp-Vo7xvpi_Lit7ARZBLPSHGeQs82oZyhRyZSEpyfywoE8KOQALqKyffBPCe7_qKT6CacjlcsFvvxHWI3PfiR7afJjOS9BLD4aV3QGkzujxhiFO4DEPEa0MHGzqi5fAdlsP0wGo04_I"
                />
                <button className="absolute bottom-1 right-1 bg-primary text-on-primary p-2.5 rounded-full shadow-2xl active:scale-90 transition-transform z-20 border-2 border-white">
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-work-sans text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Verified Telegram ID</span>
              </div>
            </div>

            <div className="space-y-8">
              <Input label="Display Name" defaultValue="Alexander West" icon="person_outline" hint="Visible on dashboard" />
              <Input label="Secure Email" defaultValue="alex.west@telegram.org" icon="mail_outline" type="email" hint="For monthly reports" />
              <Input label="Mobile Access" placeholder="+1 (555) 000-0000" icon="smartphone" type="tel" hint="Two-factor enabled" />
            </div>

            <div className="my-10 perforated-line" />

            <div className="flex gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
              <span className="material-symbols-outlined text-primary text-[28px]">gpp_good</span>
              <div className="flex flex-col gap-1">
                <h4 className="font-manrope font-extrabold text-sm text-primary">Military-Grade Encryption</h4>
                <p className="font-work-sans text-[11px] text-on-surface-variant leading-relaxed">
                  Your data is protected by end-to-end encryption. FinanceFlow never shares your personal contact details with third parties.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 w-full p-page-margin bg-gradient-to-t from-background via-background/80 to-transparent pb-10 z-50">
          <Link href="/onboarding/setup">
            <Button icon="arrow_forward" variant="primary">Proceed to Setup</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
