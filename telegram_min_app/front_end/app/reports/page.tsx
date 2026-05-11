"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/UI";
import { motion } from "framer-motion";

export default function ReportsPage() {
  return (
    <Layout showGradients={false}>
      <Navbar />
      
      <main className="pt-24 pb-32 px-page-margin flex flex-col gap-section-gap">
        <header>
          <h2 className="font-manrope text-2xl font-bold text-primary mb-2">Financial Reports</h2>
          <p className="font-work-sans text-sm text-on-surface-variant">Deep dive into your business performance.</p>
        </header>

        <section className="flex flex-col gap-4">
          <Card className="p-inner-padding" paperGrain>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-manrope font-bold text-primary">Expense Categories</h3>
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </div>
            
            <div className="space-y-4">
              <CategoryProgress label="Rent & Utilities" amount="$2,500" progress={65} color="bg-primary" />
              <CategoryProgress label="Inventory" amount="$1,800" progress={45} color="bg-secondary" />
              <CategoryProgress label="Marketing" amount="$950" progress={30} color="bg-tertiary-container" />
              <CategoryProgress label="Other" amount="$499" progress={15} color="bg-outline" />
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            <Card className="p-inner-padding flex items-center justify-between" paperGrain>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container">picture_as_pdf</span>
                </div>
                <div>
                  <p className="font-manrope font-bold text-sm text-primary">Q2 Tax Report.pdf</p>
                  <p className="font-work-sans text-xs text-outline">Ready to download</p>
                </div>
              </div>
              <button className="material-symbols-outlined text-primary">download</button>
            </Card>
          </div>
        </section>
      </main>

      <BottomNav />
    </Layout>
  );
}

function CategoryProgress({ label, amount, progress, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-manrope text-sm font-medium text-primary">{label}</span>
        <span className="font-work-sans text-sm font-bold text-primary">{amount}</span>
      </div>
      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${color} h-full rounded-full`}
        />
      </div>
    </div>
  );
}
