"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, ChevronDown, Coins, Lock, Paperclip, Plus, Settings, Wallet } from "lucide-react";

// Rendered at a fixed desktop size, then scaled to fit, so the preview is the real layout in miniature.
const W = 1200;
const H = 760;

function AgentMark() {
  return (
    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-md border border-cipher/40">
      <span className="h-px w-3 bg-cipher" />
    </span>
  );
}

function Screen() {
  return (
    <div className="flex bg-vault text-bone" style={{ width: W, height: H }}>
      <aside className="flex w-60 shrink-0 flex-col border-r border-white/[0.07] p-3">
        <div className="flex h-11 items-center gap-2.5 px-2 font-display text-[15px] font-semibold">
          <svg viewBox="0 0 20 20" className="size-5">
            <rect x="1" y="1" width="18" height="18" rx="5" fill="none" stroke="#8fa8ff" strokeWidth="1.5" />
            <path d="M1 10h18" stroke="#ece9e1" strokeWidth="1.5" />
          </svg>
          PRXVT
        </div>
        <div className="mt-4 flex h-10 items-center gap-2 rounded-xl border border-white/[0.1] px-3 text-sm font-medium">
          <Plus className="size-4" /> New chat
        </div>
        <p className="mt-6 px-3 text-xs text-fog">Recent</p>
        <div className="mt-2 space-y-0.5 text-sm">
          <div className="rounded-lg bg-white/[0.06] px-3 py-2.5">Tokenized assets on Robinhood</div>
          <div className="px-3 py-2.5 text-fog">Private payment research</div>
          <div className="px-3 py-2.5 text-fog">Agent spending policy</div>
        </div>
        <div className="mt-auto space-y-0.5 border-t border-white/[0.07] pt-3 text-sm text-fog">
          <div className="flex items-center gap-2.5 px-3 py-2.5"><Wallet className="size-4" /> Wallet</div>
          <div className="flex items-center gap-2.5 px-3 py-2.5"><Settings className="size-4" /> Settings</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center justify-between border-b border-white/[0.07] px-6 text-[13px]">
          <span className="flex items-center gap-1.5">
            <span className="text-fog">Model</span> <span className="font-medium">GPT-4o</span>
            <ChevronDown className="size-3.5 text-fog" />
          </span>
          <span className="flex h-9 items-center gap-2 rounded-full border border-white/[0.1] px-4">
            <span className="size-1.5 rounded-full bg-cipher" />
            <span className="font-mono text-xs">0x7a3f…c91e</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-hidden px-8 py-7">
          <div className="flex justify-end">
            <div className="max-w-[70%] rounded-2xl rounded-br-md bg-white/[0.07] px-4 py-2.5 text-[15px]">
              Research tokenized assets available on Robinhood Chain.
            </div>
          </div>
          <div className="flex gap-3">
            <AgentMark />
            <p className="text-[15px] leading-7 text-bone/90">
              Search complete. 6 sources found. Two sit behind a paid data service, and I can pay from your agent balance.
            </p>
          </div>
          <div className="flex gap-3">
            <AgentMark />
            <div className="flex-1">
              <p className="text-[15px] leading-7 text-bone/90">Approved. Payment settled on Robinhood Chain.</p>
              <div className="mt-3 flex items-center gap-4 rounded-xl border border-seal/25 px-4 py-3">
                <span className="grid size-8 place-items-center rounded-full bg-seal/12 text-seal">
                  <Check className="size-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">Paid · Market data API</p>
                  <p className="mt-0.5 text-xs text-fog">Receipt 0x8b…21e · simulated</p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-seal">0.05 USDG</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <AgentMark />
            <p className="text-[15px] leading-7 text-bone/90">
              USDG fits private payments best. It settles natively with minimal fees, so agent payments stay small and frequent.
            </p>
          </div>
        </div>

        <div className="px-8 pb-6">
          <div className="rounded-2xl border border-white/[0.1] bg-panel">
            <p className="px-4 pt-4 pb-2 text-[15px] text-fog/70">Message your agent privately</p>
            <div className="flex items-center justify-between px-2.5 pb-2.5 text-xs text-fog">
              <span className="flex items-center gap-1.5 px-2.5 py-1.5"><Paperclip className="size-4" /> Attach</span>
              <span className="grid size-9 place-items-center rounded-full bg-bone text-vault"><ArrowUp className="size-4" /></span>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-72 shrink-0 border-l border-white/[0.07] p-6 text-sm">
        <p className="flex items-center gap-2 font-semibold"><Lock className="size-4 text-cipher" /> Private session</p>
        <p className="mt-3 font-mono text-cipher">anon · k2f9 7c1e a04b</p>
        <p className="mt-2 leading-6 text-fog">This session id is all the model sees.</p>
        <div className="mt-8 border-t border-white/[0.07] pt-6">
          <p className="font-semibold">Agent wallet</p>
          {[
            ["Agent balance", "$19.95", "$20.00", "99%"],
            ["Spent today", "$0.05", "$5.00", "1%"],
          ].map(([l, v, o, w]) => (
            <div key={l} className="mt-5">
              <div className="flex justify-between">
                <span className="text-fog">{l}</span>
                <span className="tabular-nums">{v} <span className="text-fog">/ {o}</span></span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-seal" style={{ width: w }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-white/[0.07] pt-6">
          <p className="font-semibold">Recent payments</p>
          <div className="mt-3 flex items-center justify-between py-2">
            <span className="flex items-center gap-2"><Coins className="size-4 text-seal" /> Market data API</span>
            <span className="tabular-nums text-seal">0.05</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function AppMockup({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className={className}
      role="img"
      aria-label="Preview of the PRXVT app: conversation list, a private chat with a paid step, and the agent wallet panel."
    >
      <div
        className="overflow-hidden rounded-2xl border border-white/[0.1]"
        style={{ height: scale ? H * scale : undefined, aspectRatio: scale ? undefined : `${W} / ${H}` }}
      >
        <div aria-hidden="true" style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: W, height: H }}>
          <Screen />
        </div>
      </div>
    </div>
  );
}
