"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-2xl border transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          scrolled || open ? "border-white/[0.08] bg-vault/70 backdrop-blur-xl" : "border-transparent bg-transparent"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-[-0.01em] text-bone">
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
              <rect x="1" y="1" width="18" height="18" rx="5" fill="none" stroke="#8fa8ff" strokeWidth="1.5" />
              <path d="M1 10h18" stroke="#ece9e1" strokeWidth="1.5" />
            </svg>
            {SITE_NAME}
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-fog transition-colors duration-300 hover:bg-white/[0.05] hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/docs"
              className="rounded-full px-4 py-2 text-sm font-medium text-fog transition-colors duration-300 hover:bg-white/[0.05] hover:text-bone"
            >
              Docs
            </Link>
          </nav>

          <Link
            href="/app"
            className="hidden h-9 items-center rounded-full bg-bone px-5 text-sm font-semibold text-vault transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.97] md:inline-flex"
          >
            Launch app
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-bone md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 px-2 pb-3">
                {[...NAV_LINKS, { label: "Docs", href: "/docs" }].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base text-bone/85 hover:bg-white/[0.05]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/app"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-bone text-sm font-semibold text-vault"
                >
                  Launch app
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
