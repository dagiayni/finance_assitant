"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { label: "Upload", icon: "add_a_photo", href: "/upload" },
  { label: "AI Chat", icon: "smart_toy", href: "/chat" },
  { label: "Reports", icon: "analytics", href: "/reports" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe glass rounded-t-2xl border-t border-secondary-container/20">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center p-2 transition-all active:translate-y-0.5",
              isActive ? "text-on-secondary-container" : "text-on-surface-variant"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-secondary-container rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span
              className={cn(
                "material-symbols-outlined",
                isActive && "font-fill"
              )}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-work-sans text-[10px] font-medium mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
