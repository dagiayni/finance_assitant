"use client";

import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { Card, Button } from "@/components/UI";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [step, setStep] = useState<'upload' | 'verify'>('upload');
  const [classification, setClassification] = useState<'expense' | 'income'>('expense');

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStep('verify');
    }
  };

  return (
    <Layout showGradients={false}>
      <Navbar />
      
      <main className="pt-24 pb-32 px-page-margin flex flex-col gap-section-gap">
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          ref={cameraInputRef} 
          onChange={handleFileChange} 
        />
        <input 
          type="file" 
          accept=".jpg,.png" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />

        {step === 'upload' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-section-gap"
          >
            <header>
              <h2 className="font-manrope text-2xl font-bold text-primary mb-2">Upload Receipt</h2>
              <p className="font-work-sans text-sm text-on-surface-variant">Snap a photo or upload a file to automatically track your expenses.</p>
            </header>

            <section className="flex flex-col gap-4">
              <Card 
                className="aspect-square flex flex-col items-center justify-center p-section-gap border-dashed border-2 border-outline-variant bg-surface-container-low cursor-pointer overflow-hidden relative group" 
                paperGrain
                onClick={() => cameraInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4 relative z-10 shadow-lg"
                >
                  <span className="material-symbols-outlined text-on-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
                </motion.div>
                <p className="font-manrope font-semibold text-primary relative z-10">Tap to take a photo</p>
                <p className="font-work-sans text-xs text-outline mt-2 text-center relative z-10">Supports JPG, PNG</p>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" icon="upload_file" onClick={() => fileInputRef.current?.click()}>Files</Button>
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
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <header className="flex justify-between items-start">
              <div>
                <h2 className="font-manrope text-2xl font-bold text-primary mb-1">Verify Receipt</h2>
                <p className="font-work-sans text-sm text-on-surface-variant max-w-[200px]">We've extracted the core data for you.</p>
              </div>
              <div className="bg-surface-container-low px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-outline-variant/30 shadow-sm mt-1">
                <span className="material-symbols-outlined text-[14px] text-[#4CAF50]">schedule</span>
                <span className="text-xs font-bold text-[#4CAF50]">Pending</span>
              </div>
            </header>

            <Card className="p-6 flex flex-col gap-6 bg-surface-container-lowest border-outline-variant/30 soft-shadow-xl" paperGrain>
              <div className="flex flex-col items-center pt-2">
                <span className="text-[10px] font-bold text-outline-variant tracking-[0.15em] uppercase mb-1">Total Amount</span>
                <span className="font-manrope text-[40px] font-extrabold text-primary tracking-tight">$1,240.50</span>
              </div>

              <div className="w-full border-t-2 border-dashed border-outline-variant/30 my-1"></div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1 border-b border-outline-variant/20 pb-4">
                  <span className="text-[11px] font-bold text-outline-variant tracking-wide">Tax Identification (TIN)</span>
                  <span className="font-manrope text-[15px] font-medium text-primary">TAX-9988221-X</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-b border-outline-variant/20 pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-outline-variant tracking-wide">Tax Applied</span>
                    <span className="font-manrope text-[15px] font-medium text-primary">$112.77</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-outline-variant tracking-wide">Date</span>
                    <span className="font-manrope text-[15px] font-medium text-primary">24 Oct 2023</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-bold text-outline-variant tracking-wide">Classification</span>
                  <div className="flex bg-[#F0F2F5] dark:bg-surface-container-low p-1.5 rounded-[14px] w-full border border-outline-variant/10 shadow-inner">
                    <button 
                      onClick={() => setClassification('expense')}
                      className={`flex-1 py-3 text-[13px] font-bold rounded-[10px] transition-all duration-300 ${classification === 'expense' ? 'bg-white dark:bg-surface-container-highest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                    >
                      Expense (I Paid)
                    </button>
                    <button 
                      onClick={() => setClassification('income')}
                      className={`flex-1 py-3 text-[13px] font-bold rounded-[10px] transition-all duration-300 ${classification === 'income' ? 'bg-white dark:bg-surface-container-highest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                    >
                      Income (Service)
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <Button variant="primary" icon="check_circle" onClick={() => setStep('upload')}>Approve Receipt</Button>
                <Button variant="outline" onClick={() => {
                  setStep('upload');
                  setTimeout(() => cameraInputRef.current?.click(), 100);
                }}>Retake Photo</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </main>

      <BottomNav />
    </Layout>
  );
}
