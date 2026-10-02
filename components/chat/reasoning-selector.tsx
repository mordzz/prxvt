"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LEVELS = ["Low", "Medium", "High"];

export function ReasoningSelector() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState("Medium");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[13px] transition-colors"
      >
        <span className="text-fog">Reasoning</span>
        <span className="font-medium text-bone">{level}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-fog transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            role="listbox"
            aria-label="Reasoning effort"
            className="absolute right-0 bottom-full z-50 mb-1.5 w-36 overflow-hidden rounded-xl border border-white/[0.1] bg-panel p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]"
          >
            {LEVELS.map((l) => (
              <button
                key={l}
                role="option"
                aria-selected={l === level}
                onClick={() => {
                  setLevel(l);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-colors",
                  l === level ? "bg-white/[0.07] text-bone" : "text-fog hover:bg-white/[0.04] hover:text-bone"
                )}
              >
                {l === level && <span className="h-1.5 w-1.5 rounded-full bg-cipher" />}
                {l}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
