"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useScramble } from "@/components/motion/use-scramble";

const POLICY = [
  { label: "Agent balance", value: "$19.95", of: "$20.00", fill: 0.9975 },
  { label: "Spent today", value: "$0.05", of: "$5.00", fill: 0.01 },
];

const PAYMENTS = [
  { service: "Market data API", amount: "0.05", time: "Just now" },
  { service: "Search credits", amount: "0.02", time: "Yesterday" },
];

export function SessionRail({ connected, sessionKey }: { connected: boolean; sessionKey: string }) {
  const sessionId = useScramble(sessionKey, 1000);

  return (
    <aside aria-label="Session details" className="hidden w-80 shrink-0 overflow-y-auto border-l border-white/[0.07] p-6 xl:block">
      <section>
        <h2 className="flex items-center gap-2 text-sm font-semibold text-bone">
          <Lock className="size-4 text-cipher" aria-hidden="true" /> Private session
        </h2>
        <p className="mt-3 font-mono text-sm text-cipher">{sessionId}</p>
        <p className="mt-2 text-sm leading-6 text-fog">
          {connected ? "Your wallet signed in, but this session id is all the model sees." : "Connect a wallet to fund the agent. Chat works either way."}
        </p>
      </section>

      <section className="mt-8 border-t border-white/[0.07] pt-6">
        <h2 className="text-sm font-semibold text-bone">Agent wallet</h2>
        <dl className="mt-4 space-y-5">
          {POLICY.map((p) => (
            <div key={p.label}>
              <div className="flex items-baseline justify-between text-sm">
                <dt className="text-fog">{p.label}</dt>
                <dd className="tabular-nums text-bone">
                  {p.value} <span className="text-fog">/ {p.of}</span>
                </dd>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full origin-left rounded-full bg-seal"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: p.fill }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-fog">
          Up to <span className="text-bone">$1.00</span> per payment without asking. USDG on Robinhood Chain only.
        </p>
      </section>

      <section className="mt-8 border-t border-white/[0.07] pt-6">
        <h2 className="text-sm font-semibold text-bone">Recent payments</h2>
        <ul className="mt-3 divide-y divide-white/[0.06]">
          {PAYMENTS.map((p) => (
            <li key={p.service} className="flex items-center justify-between py-3 text-sm">
              <span>
                <span className="block text-bone">{p.service}</span>
                <span className="text-xs text-fog">{p.time}</span>
              </span>
              <span className="tabular-nums text-seal">{p.amount} USDG</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-fog">Simulated. Nothing is broadcast.</p>
      </section>
    </aside>
  );
}
