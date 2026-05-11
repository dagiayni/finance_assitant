"use client";

import Layout from "@/components/Layout";
import { Card, Button, Input } from "@/components/UI";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedGrowthStage, setSelectedGrowthStage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const router = useRouter();

  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <Layout showGradients={true}>
      <header className="flex justify-between items-center px-page-margin h-16 w-full z-50 fixed top-0 glass border-0 border-b border-white/10">
        <button
          onClick={step === 1 ? () => router.push("/onboarding/verify") : prevStep}
          className="active:scale-90 transition-transform p-2 bg-surface-container-low rounded-full"
        >
          <span className="material-symbols-outlined text-primary text-[18px]">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <div className="font-manrope text-base font-extrabold text-primary tracking-tight uppercase">Setup</div>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className={cn("h-1 rounded-full transition-all duration-500", s === step ? "w-4 bg-secondary" : "w-1.5 bg-secondary-container")} />
            ))}
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <span className="font-work-sans text-[10px] font-black text-secondary/60">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
      </header>

      <main className="flex-1 px-page-margin pt-24 pb-8 flex flex-col w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!isFinishing ? (
            <motion.div
              key="form-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex-1 flex flex-col"
            >
              <section className="mb-6">
                <motion.h1
                  key={`title-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-manrope text-2xl font-black text-primary mb-2 leading-tight"
                >
                  {step === 1 && "Start with a identity."}
                  {step === 2 && "Where do you operate?"}
                  {step === 3 && "Let's talk about scale."}
                </motion.h1>
                <motion.p
                  key={`desc-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-work-sans text-sm text-on-surface-variant leading-relaxed opacity-80"
                >
                  {step === 1 && "How should we refer to your empire?"}
                  {step === 2 && "This helps us provide industry-specific insights."}
                  {step === 3 && "Knowing your monthly volume allows us to optimize projections."}
                </motion.p>
              </section>

              <div className="flex-1 max-h-fit">
                <Card className="p-inner-padding min-h-[180px] flex flex-col justify-start bg-surface-container-lowest/60 backdrop-blur-md border-0 shadow-2xl" paperGrain={false}>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <Input
                          label="Legal Business Name"
                          placeholder="e.g. Acme Creative Studio"
                          icon="business"
                          hint="Publicly visible"
                          autoFocus
                        />
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                        {["Technology & SaaS", "Retail & E-commerce", "Creative Agency", "Professional Services", "Other"].map((item, i) => (
                          <motion.button
                            key={item}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => {
                              setSelectedIndustry(item);
                              setTimeout(nextStep, 300);
                            }}
                            className={cn(
                              "w-full group p-4 flex justify-between items-center border-2 rounded-2xl transition-all active:scale-[0.98] soft-shadow-lg",
                              selectedIndustry === item
                                ? "bg-secondary border-secondary text-on-secondary"
                                : "bg-surface-container-low/20 border-transparent hover:border-secondary/40 hover:bg-secondary/5 text-primary"
                            )}
                          >
                            <span className="font-manrope font-bold text-base">{item}</span>
                            <span className={cn(
                              "material-symbols-outlined text-[18px] transition-opacity",
                              selectedIndustry === item ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}>
                              {selectedIndustry === item ? "check_circle" : "arrow_forward_ios"}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="flex flex-col gap-2">
                          <label className="font-work-sans text-[11px] text-secondary uppercase tracking-widest font-bold opacity-80 px-1">Estimated Monthly Revenue</label>
                          <div className="relative flex items-center group">
                            <div className="absolute left-0 h-full flex items-center z-20">
                              <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-secondary-container/50 text-secondary font-black text-[10px] h-10 px-2 ml-2 rounded-xl border-0 focus:ring-0 appearance-none cursor-pointer hover:bg-secondary-container transition-colors"
                              >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                              </select>
                            </div>
                            <input
                              className="w-full bg-surface-container-low/40 border-2 border-transparent py-4 pl-16 pr-4 font-manrope text-lg rounded-2xl focus:outline-none focus:border-secondary/30 focus:bg-surface-container-lowest transition-all text-primary placeholder:text-outline-variant/40 soft-shadow-lg"
                              placeholder="50,000"
                              type="number"
                              autoFocus
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="font-work-sans text-[11px] text-secondary uppercase tracking-widest font-bold opacity-80 px-1">Growth Stage</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Early Startup", "Scaling Up", "Steady Flow", "Established"].map(stage => (
                              <button
                                key={stage}
                                onClick={() => setSelectedGrowthStage(stage)}
                                className={cn(
                                  "py-4 font-manrope font-bold text-sm border-2 rounded-xl transition-all active:scale-95",
                                  selectedGrowthStage === stage
                                    ? "bg-secondary border-secondary text-on-secondary"
                                    : "bg-surface-container-low/30 border-transparent text-primary hover:bg-secondary/5"
                                )}
                              >
                                {stage}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {step === 1 || step === 3 ? (
                  <Button
                    onClick={nextStep}
                    icon={step === 3 ? "done_all" : "arrow_forward"}
                    variant={step === 3 ? "secondary" : "primary"}
                    size="md"
                  >
                    {step === 3 ? "Complete Profile" : "Continue"}
                  </Button>
                ) : null}

                <button
                  onClick={handleFinish}
                  className="w-full py-2 font-work-sans text-[10px] font-black text-outline hover:text-primary transition-colors active:opacity-60 uppercase tracking-[0.3em] flex items-center justify-center gap-2"
                >
                  Skip Onboarding
                  <span className="material-symbols-outlined text-[14px]">skip_next</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-secondary/30 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-secondary rounded-full"
                />
                <span className="material-symbols-outlined text-on-secondary text-[48px]">check_circle</span>
              </div>
              <h2 className="font-manrope text-3xl font-black text-primary mb-3">All Set!</h2>
              <p className="font-work-sans text-on-surface-variant max-w-[240px]">We're tailoring your financial dashboard now. Get ready for clarity.</p>
              <div className="mt-12 w-12 h-1 bg-surface-container-low rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-secondary"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
