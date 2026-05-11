"use client";

import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/UI";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <Layout showGradients={false}>
      <Navbar />

      <main className="pt-24 pb-32 px-page-margin flex flex-col gap-section-gap">
        {/* Hero: Net Profit Section */}
        <section className="flex flex-col gap-element-gap">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="font-work-sans text-xs font-medium text-on-surface-variant mb-1 uppercase tracking-wider">Monthly Net Profit</span>
            <div className="flex items-baseline gap-2">
              <h2 className="font-manrope text-3xl font-bold text-primary-container">$12,450.80</h2>
              <span className="font-work-sans text-xs font-semibold text-secondary bg-secondary-container px-2 py-0.5 rounded-full">+12%</span>
            </div>
          </motion.div>

          {/* Bento Layout: Profit Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-inner-padding" paperGrain>
                <span className="font-work-sans text-xs text-on-surface-variant block mb-2">Gross Revenue</span>
                <span className="font-manrope text-xl font-bold text-primary">$18,200</span>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-inner-padding" paperGrain>
                <span className="font-work-sans text-xs text-on-surface-variant block mb-2">Total Expenses</span>
                <span className="font-manrope text-xl font-bold text-error">$5,749</span>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Profit Trend Chart */}
        <section className="flex flex-col gap-element-gap">
          <div className="flex justify-between items-end">
            <h3 className="font-manrope text-xl font-bold text-primary">Profit Trends</h3>
            <span className="font-work-sans text-xs text-on-surface-variant uppercase">Last 6 Months</span>
          </div>
          <Card className="p-inner-padding h-48 flex items-end justify-between gap-2" paperGrain>
            {[40, 55, 45, 70, 60, 85].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full group">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  className={i === 5 ? "bg-primary-container w-full rounded-t-lg" : "bg-secondary-container w-full rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"}
                />
                <span className={`font-work-sans text-[10px] ${i === 5 ? "text-primary font-bold" : "text-outline"}`}>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </span>
              </div>
            ))}
          </Card>
        </section>

        {/* Recent Activity */}
        <section className="flex flex-col gap-element-gap">
          <div className="flex justify-between items-center">
            <h3 className="font-manrope text-xl font-bold text-primary">Recent Activity</h3>
            <button className="font-work-sans text-xs font-semibold text-secondary uppercase tracking-widest">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            <ActivityItem
              icon="shopping_bag"
              title="Office Supplies"
              date="June 24, 2024"
              amount="-$240.00"
              type="expense"
              category="Business Essentials"
              status="Verified"
            />
            <ActivityItem
              icon="payments"
              title="Client Payment"
              date="June 22, 2024"
              amount="+$4,200.00"
              type="income"
              category="Acme Corp"
              status="Completed"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <motion.section
          whileTap={{ scale: 0.98 }}
          className="bg-primary-container text-on-primary rounded-2xl p-inner-padding flex justify-between items-center custom-shadow cursor-pointer"
        >
          <div>
            <h4 className="font-manrope text-lg font-bold text-white mb-1">New Expense?</h4>
            <p className="font-work-sans text-xs text-on-primary-container">Snap a photo to auto-categorize</p>
          </div>
          <button className="bg-secondary-container text-on-secondary-container p-4 rounded-full shadow-lg">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
          </button>
        </motion.section>
      </main>

      <BottomNav />
    </Layout>
  );
}

function ActivityItem({ icon, title, date, amount, type, category, status }: any) {
  return (
    <Card className="overflow-hidden" paperGrain>
      <div className="p-inner-padding flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">{icon}</span>
          </div>
          <div>
            <p className="font-manrope font-semibold text-primary">{title}</p>
            <p className="font-work-sans text-xs text-outline">{date}</p>
          </div>
        </div>
        <span className={`font-manrope font-bold ${type === 'expense' ? 'text-error' : 'text-secondary'}`}>
          {amount}
        </span>
      </div>
      <div className="perforated-line mx-inner-padding" />
      <div className="px-inner-padding py-3 bg-surface-container-low/50 flex justify-between items-center">
        <span className="font-work-sans text-[11px] text-on-surface-variant flex items-center gap-1 uppercase tracking-tighter">
          <span className="material-symbols-outlined text-[14px]">sell</span> {category}
        </span>
        <span className="font-work-sans text-[10px] font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded">
          {status}
        </span>
      </div>
    </Card>
  );
}
