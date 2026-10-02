"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ADVANTAGES, type AdvantageId } from "@/components/features/landing/landing-content";
import { CapabilityVisual } from "@/components/features/landing/capability-visual";
import { cn } from "@/lib/utils";

// Asymmetric bento: the session tile leads wide, the agent runs tall, money tiles sit side by side.
const LAYOUT: Record<AdvantageId, string> = {
  "private-session": "lg:col-span-2",
  "autonomous-agent": "lg:row-span-2",
  "agent-controls": "",
  "private-payments": "",
};

function Tile({ index }: { index: number }) {
  const item = ADVANTAGES[index];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-panel p-6 transition-colors duration-500 hover:border-white/[0.16] sm:p-7",
        LAYOUT[item.id]
      )}
    >
      <h3 className="text-xl font-semibold tracking-[-0.015em] text-bone">{item.title}</h3>
      <p className="mt-2 text-[15px] text-fog">{item.description}</p>
      <div className="relative flex-1 pt-6" aria-hidden="true">
        {inView && <CapabilityVisual id={item.id} />}
      </div>
    </motion.article>
  );
}

export function Capabilities() {
  return (
    <section id="product" className="mx-auto flex max-w-7xl scroll-mt-24 flex-col px-4 py-24 sm:px-6 lg:h-[100svh] lg:min-h-[640px] lg:max-h-[960px] lg:px-8 lg:pb-12 lg:pt-28">
      <h2 className="max-w-3xl font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-bone">
        An agent that works for you, never exposes you.
      </h2>
      <div className="mt-10 grid flex-1 gap-4 lg:min-h-0 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
        {ADVANTAGES.map((a, i) => (
          <Tile key={a.id} index={i} />
        ))}
      </div>
    </section>
  );
}
