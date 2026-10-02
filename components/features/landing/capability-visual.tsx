"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, CircleDashed, Hand, Lock } from "lucide-react";
import type { AdvantageId } from "@/components/features/landing/landing-content";
import { useScramble } from "@/components/motion/use-scramble";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Advances 0..length-1 on an interval, then holds the last value for one extra beat before looping. */
function useLoop(length: number, ms: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % (length + 1)), ms);
    return () => window.clearTimeout(t);
  }, [i, length, ms, reduce]);
  return reduce ? length - 1 : Math.min(i, length - 1);
}

const MESSAGES = [
  "Summarize this week's governance votes",
  "Find the cheapest image model API",
  "Draft a reply to the grant committee",
];

function toCipher(text: string) {
  let h = 0;
  return text
    .replace(/[^\s]/g, (c) => {
      h = (h * 31 + c.charCodeAt(0)) >>> 0;
      return "0123456789abcdef"[h % 16];
    })
    .slice(0, 34);
}

function PrivateSession() {
  const i = useLoop(MESSAGES.length, 3200);
  const message = MESSAGES[i];
  const cipher = useScramble(toCipher(message), 1200);

  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-10">
      <div>
        <span className="text-xs text-fog">You type</span>
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-3 text-xl font-medium leading-snug text-bone sm:text-2xl"
          >
            {message}
          </motion.p>
        </AnimatePresence>
        <p className="mt-4 font-mono text-xs text-fog">signed by 0x7a3f…c91e</p>
      </div>

      <div className="relative hidden h-full min-h-32 w-px bg-white/10 sm:block" aria-hidden="true">
        <motion.span
          className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-cipher"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        />
        <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cipher/40 bg-panel">
          <Lock className="size-4 text-cipher" />
        </span>
      </div>

      <div>
        <span className="text-xs text-cipher">The model receives</span>
        <p className="mt-3 break-all font-mono text-xl leading-snug text-cipher sm:text-2xl">{cipher}</p>
        <p className="mt-4 text-xs text-fog">No address. No onchain history.</p>
      </div>
    </div>
  );
}

const AGENT_STEPS = [
  { label: "Search governance forum", meta: "4 queries" },
  { label: "Read 12 proposals", meta: "forum + explorer" },
  { label: "Buy archived vote data", meta: "0.40 USDG", seal: true },
  { label: "Compare outcomes", meta: "12 of 12" },
  { label: "Deliver the brief", meta: "48s total" },
];

function Agent() {
  const active = useLoop(AGENT_STEPS.length + 1, 1300);

  return (
    <div className="flex h-full flex-col">
      <p className="text-lg font-medium leading-snug text-bone">
        &ldquo;What changed in Robinhood Chain governance this month?&rdquo;
      </p>
      <ol className="relative mt-8 flex flex-1 flex-col justify-center gap-6 pl-9">
        <span className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[9px] top-2 w-px bg-cipher"
          animate={{ height: `${(Math.min(active, AGENT_STEPS.length - 1) / (AGENT_STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ maxHeight: "calc(100% - 1rem)" }}
        />
        {AGENT_STEPS.map((s, i) => {
          const done = i < active;
          const running = i === active;
          return (
            <li key={s.label} className={cn("relative transition-opacity duration-500", i > active && "opacity-35")}>
              <span
                className={cn(
                  "absolute -left-9 top-0 grid size-[19px] place-items-center rounded-full border bg-panel transition-colors duration-500",
                  done ? (s.seal ? "border-seal bg-seal" : "border-cipher bg-cipher") : "border-white/25"
                )}
              >
                {done ? (
                  <Check className="size-3 text-vault" strokeWidth={3} />
                ) : running ? (
                  <CircleDashed className="size-3 text-cipher motion-safe:animate-spin" />
                ) : null}
              </span>
              <span className="block text-[15px] text-bone">{s.label}</span>
              <span className={cn("mt-0.5 block font-mono text-xs", s.seal ? "text-seal" : "text-fog")}>{s.meta}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function AgentControls() {
  const step = useLoop(3, 1800);
  const spent = step >= 1 ? 2 : 1;

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-4xl font-medium tracking-[-0.03em] text-bone tabular-nums">
          ${spent.toFixed(2)}
        </span>
        <span className="text-sm text-fog">of $5.00 today</span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((c) => (
          <span
            key={c}
            className={cn("h-2 rounded-full transition-colors duration-700", c < spent ? "bg-seal" : "bg-white/[0.08]")}
          />
        ))}
      </div>
      <ul className="mt-6 space-y-3 text-sm">
        <li className={cn("flex items-center justify-between transition-opacity duration-500", step < 1 && "opacity-35")}>
          <span className="flex items-center gap-2 text-bone">
            <Check className="size-4 text-cipher" /> Data API · $0.40
          </span>
          <span className="text-cipher">Auto-approved</span>
        </li>
        <li className={cn("flex items-center justify-between transition-opacity duration-500", step < 2 && "opacity-35")}>
          <span className="flex items-center gap-2 text-bone">
            <Hand className="size-4 text-seal" /> GPU job · $1.20
          </span>
          <span className="text-seal">Over $1 cap · asks you</span>
        </li>
      </ul>
    </div>
  );
}

function PrivatePayments() {
  const reduce = useReducedMotion();
  const nodes = [
    { x: 45, label: "Your wallet", sub: "0x7a3f…" },
    { x: 160, label: "Agent wallet", sub: "funded once" },
    { x: 275, label: "Data API", sub: "0.40 USDG" },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <svg viewBox="0 0 320 150" className="w-full overflow-visible" aria-hidden="true">
        <path d="M45 50 Q160 0 275 50" fill="none" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 5" />
        <g stroke="#ffb547" strokeWidth="2" strokeLinecap="round">
          <line x1="152" y1="17" x2="168" y2="33" />
          <line x1="168" y1="17" x2="152" y2="33" />
        </g>
        <line x1="45" y1="70" x2="275" y2="70" stroke="rgba(255,255,255,0.12)" />
        <motion.line
          x1="45"
          y1="70"
          x2="275"
          y2="70"
          stroke="#8fa8ff"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        {!reduce && (
          <motion.circle
            r="4"
            cy="70"
            fill="#ffb547"
            animate={{ cx: [45, 160, 160, 275] }}
            transition={{ duration: 3, times: [0, 0.4, 0.55, 1], repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
          />
        )}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy="70" r="7" fill="#0c0f1a" stroke="#8fa8ff" strokeWidth="1.5" />
            <text x={n.x} y="102" textAnchor="middle" fill="#ece9e1" fontSize="12" fontWeight="600">
              {n.label}
            </text>
            <text x={n.x} y="120" textAnchor="middle" fill="#8d93a8" fontSize="10.5">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-4 text-sm text-fog">The service is paid. Your main address is never in the receipt.</p>
    </div>
  );
}

const VISUALS: Record<AdvantageId, () => React.JSX.Element> = {
  "private-session": PrivateSession,
  "autonomous-agent": Agent,
  "agent-controls": AgentControls,
  "private-payments": PrivatePayments,
};

export function CapabilityVisual({ id }: { id: AdvantageId }) {
  const Visual = VISUALS[id];
  return <Visual />;
}
