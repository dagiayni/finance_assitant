"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { Card, Button } from "@/components/UI";
import { motion } from "framer-motion";

export default function UploadPage() {
  return (
    <Layout showGradients={false}>
      <Navbar />
      
      <main className="pt-24 pb-32 px-page-margin flex flex-col gap-section-gap">
        <header>
          <h2 className="font-manrope text-2xl font-bold text-primary mb-2">Upload Receipt</h2>
          <p className="font-work-sans text-sm text-on-surface-variant">Snap a photo or upload a file to automatically track your expenses.</p>
        </header>

        <section className="flex flex-col gap-4">
          <Card className="aspect-square flex flex-col items-center justify-center p-section-gap border-dashed border-2 border-outline-variant bg-surface-container-low" paperGrain>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center mb-4"
            >
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
            </motion.div>
            <p className="font-manrope font-semibold text-primary">Tap to take a photo</p>
            <p className="font-work-sans text-xs text-outline mt-2 text-center">Supports JPG, PNG, PDF</p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" icon="upload_file">Files</Button>
            <Button variant="outline" icon="history">History</Button>
          </div>
        </section>

        <section className="flex flex-col gap-element-gap">
          <h3 className="font-manrope text-lg font-bold text-primary">Pending Verification</h3>
          <Card className="p-inner-padding flex items-center gap-4 opacity-70" variant="low">
            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-outline">description</span>
            </div>
            <div className="flex-1">
              <p className="font-manrope font-semibold text-sm">Processing Receipt...</p>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-primary h-full"
                />
              </div>
            </div>
          </Card>
        </section>
      </main>

      <BottomNav />
    </Layout>
  );
}
