"use client";

import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "lowest" | "low" | "default" | "high" | "highest" | "glass";
  paperGrain?: boolean;
  animate?: boolean;
}

export function Card({
  children,
  className,
  variant = "lowest",
  paperGrain = true,
  animate = true,
}: CardProps) {
  const variantClasses = {
    lowest: "bg-surface-container-lowest",
    low: "bg-surface-container-low",
    default: "bg-surface-container",
    high: "bg-surface-container-high",
    highest: "bg-surface-container-highest",
    glass: "glass",
  };

  const Wrapper = animate ? motion.div : "div";

  return (
    <Wrapper
      initial={animate ? { opacity: 0, y: 15 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      className={cn(
        "rounded-2xl border border-secondary-container/30 soft-shadow-lg overflow-hidden relative",
        variantClasses[variant],
        paperGrain && "paper-grain",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </Wrapper>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, icon, error, hint, className, ...props }: InputProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full group", className)}>
      <div className="flex justify-between items-end px-1">
        <label className="font-work-sans text-[11px] text-secondary uppercase tracking-[0.15em] font-bold opacity-80 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
          {label}
        </label>
        {hint && <span className="font-work-sans text-[10px] text-outline opacity-60 italic">{hint}</span>}
      </div>
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none transition-colors group-focus-within:text-secondary text-outline-variant/60">
           {icon && <span className="material-symbols-outlined text-[22px]">{icon}</span>}
        </div>
        <input
          className={cn(
            "w-full bg-surface-container-low/40 border-2 border-transparent py-4 pl-12 pr-4 font-manrope text-lg rounded-2xl focus:outline-none focus:border-secondary/30 focus:bg-surface-container-lowest transition-all text-primary placeholder:text-outline-variant/40 soft-shadow-lg",
            error && "border-error/50 bg-error/5",
            "group-hover:bg-surface-container-low/60"
          )}
          {...props}
        />
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-[11px] text-error font-work-sans font-semibold mt-1 px-1 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "glass";
  icon?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  variant = "primary",
  icon,
  loading,
  size = "lg",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-on-primary soft-shadow-lg active:bg-primary/90",
    secondary: "bg-secondary text-on-secondary soft-shadow-lg",
    tertiary: "bg-tertiary-container text-on-tertiary-container",
    outline: "border-2 border-primary/20 text-primary bg-transparent hover:border-primary/40",
    ghost: "bg-transparent text-primary hover:bg-surface-container-low/60",
    glass: "glass text-primary",
  };

  const sizeClasses = {
    sm: "h-10 px-4 text-sm rounded-lg",
    md: "h-12 px-6 text-base rounded-xl",
    lg: "h-16 px-8 text-lg rounded-2xl",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        "w-full flex items-center justify-center gap-3 transition-all disabled:opacity-40 disabled:active:scale-100 font-manrope font-bold tracking-tight relative overflow-hidden",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="material-symbols-outlined text-[24px]"
        >
          progress_activity
        </motion.span>
      ) : (
        <>
          {children}
          {icon && (
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              {icon}
            </span>
          )}
        </>
      )}
      <div className="absolute inset-0 bg-white/5 opacity-0 active:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>
  );
}
