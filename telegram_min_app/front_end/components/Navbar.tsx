"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-page-margin h-16 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-secondary-container">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWpA_IcKxsIkGaU-GN_rOfpRm0WrCbLeXSrIHCxEUtTZsJ3iJvtiDCkwEGhXI1uF5Tzd1t-9cb3DxMUw05tug9I-KZdlmXDOEUgCY73DEdDoqyZB_hYh302yL4Xde6uELxtRogs-oQ6whtyX2bk83N2f_KQBxQPvvZh1AO797DjWHWulcVdcm8t9BjC7pJHDvAGW3HJ9xc2j65CmQ1rQo-_F6cqFcZlTDQfIa_XDrLZUZREsNYhzvHxlxpeB1SJQgNdQUP62LmXyM"
          />
        </div>
        <h1 className="font-manrope text-xl font-semibold text-primary tracking-tight">FinanceFlow</h1>
      </div>
      <Link
        href="/settings"
        className="material-symbols-outlined text-primary hover:bg-surface-container-low p-2 rounded-full active:scale-95 transition-transform"
      >
        settings
      </Link>
    </header>
  );
}
