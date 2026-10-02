"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const MODELS = ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3.1 405B", "Mistral Large"];

export function ModelSelector() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(MODELS[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[13px] transition-colors"
      >
        <span className="text-fog">Model</span>
        <span className="font-medium text-bone">{model}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-fog transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            role="listbox"
            aria-label="Choose AI model"
            className="absolute left-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-white/[0.1] bg-panel p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]"
          >
            {MODELS.map((m) => (
              <button
                key={m}
                role="option"
                aria-selected={m === model}
                onClick={() => {
                  setModel(m);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-colors",
                  m === model ? "bg-white/[0.07] text-bone" : "text-fog hover:bg-white/[0.04] hover:text-bone"
                )}
              >
                {m === model && <span className="h-1.5 w-1.5 rounded-full bg-cipher" />}
                {m}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
