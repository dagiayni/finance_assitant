"use client";

import Layout from "@/components/Layout";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your FinanceFlow Assistant. How can I help you today?",
      sender: "ai",
      timestamp: "10:00 AM",
    },
    {
      id: "2",
      text: "What was my net profit last month?",
      sender: "user",
      timestamp: "10:01 AM",
    },
    {
      id: "3",
      text: "Your net profit for last month was $12,450.80, which is a 12% increase from the previous month.",
      sender: "ai",
      timestamp: "10:01 AM",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your financial data. One moment...",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Layout showGradients={false}>
      {/* Telegram-style Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass border-0 border-b border-secondary-container/20 h-16 px-4 flex items-center gap-3">
        <Link href="/dashboard" className="p-2 -ml-2 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </Link>
        <div className="flex-1 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="material-symbols-outlined text-on-primary text-[22px]">smart_toy</span>
              <div className="absolute inset-0 paper-grain opacity-10"></div>
           </div>
           <div className="flex flex-col">
              <span className="font-manrope font-extrabold text-sm text-primary leading-none">Finance Assistant</span>
              <div className="flex items-center gap-1.5 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                 <span className="font-work-sans text-[10px] text-secondary font-bold uppercase tracking-wider">AI Agent • Online</span>
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-16 pb-24 w-full max-w-lg mx-auto overflow-hidden">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scrollbar-hide">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`
                    max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative
                    ${msg.sender === "user" 
                      ? "bg-primary text-on-primary rounded-tr-none" 
                      : "bg-surface-container-high text-on-surface rounded-tl-none border border-secondary-container/10"
                    }
                  `}
                >
                  <p className="font-manrope text-[15px] leading-relaxed font-medium">
                    {msg.text}
                  </p>
                  <span 
                    className={`
                      text-[10px] mt-1.5 block opacity-50 font-work-sans font-black text-right
                      ${msg.sender === "user" ? "text-on-primary" : "text-on-surface-variant"}
                    `}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Premium Input Bar */}
        <div className="fixed bottom-20 left-0 w-full p-4 bg-background/95 backdrop-blur-2xl border-t border-secondary-container/20">
           <div className="max-w-lg mx-auto flex items-center gap-3">
              <div className="flex-1 bg-surface-container rounded-[24px] border border-transparent px-5 py-1.5 flex items-center gap-3 transition-all">
                 <textarea
                   rows={1}
                   value={inputText}
                   onChange={(e) => {
                     setInputText(e.target.value);
                     e.target.style.height = 'auto';
                     e.target.style.height = e.target.scrollHeight + 'px';
                   }}
                   onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                   placeholder="Ask anything..."
                   className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 font-manrope text-[15px] text-on-surface placeholder:text-on-surface-variant/40 py-2.5 resize-none max-h-32 leading-relaxed"
                 />
                 <button className="p-1 active:scale-90 transition-transform text-secondary/60 hover:text-secondary">
                    <span className="material-symbols-outlined text-[24px]">mic</span>
                 </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleSend}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-primary text-on-primary
                  ${!inputText.trim() && "opacity-40 grayscale pointer-events-none"}
                `}
              >
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                   send
                </span>
              </motion.button>
           </div>
        </div>
      </main>

      <BottomNav />
    </Layout>
  );
}
