"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCS_NAV } from "@/data/docs-nav";

export function DocsSidebar({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const activeLabel = DOCS_NAV.flatMap((s) => s.items).find((i) => i.id === activeId)?.label;

  const content = (
    <nav aria-label="Documentation" className="flex flex-col gap-8">
      {DOCS_NAV.map((section) => (
        <div key={section.title}>
          <p className="px-3 text-sm font-semibold text-bone">{section.title}</p>
          <ul className="mt-2 flex flex-col">
            {section.items.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  {active && (
                    <motion.span
                      layoutId="docs-active"
                      className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-cipher"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  <button
                    onClick={() => {
                      onSelect(item.id);
                      setOpen(false);
                    }}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-left text-[15px] transition-colors duration-300",
                      active ? "text-bone" : "text-fog hover:text-bone"
                    )}
                  >
                    {item.label}
                    {item.comingSoon && <span className="text-xs text-fog/70">Soon</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex h-12 w-full items-center justify-between rounded-xl bg-panel px-4 text-sm text-bone"
        >
          <span>
            <span className="text-fog">Docs / </span>
            {activeLabel}
          </span>
          <ChevronDown className={cn("size-4 text-fog transition-transform duration-300", open && "rotate-180")} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6">{content}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden lg:block">{content}</div>
    </>
  );
}
