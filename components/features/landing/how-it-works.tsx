"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOW_IT_WORKS } from "@/components/features/landing/landing-content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // All four steps arrive together in one staggered sequence; the rail draws across as they land.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".hiw-list", start: "top 80%", once: true },
          defaults: { ease: "expo.out" },
        });
        tl.from(".hiw-rail", { scaleX: 0, duration: 1.6 }, 0).from(
          ".hiw-step",
          { opacity: 0, y: 40, filter: "blur(10px)", duration: 1.2, stagger: 0.12 },
          0.1
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="how-it-works" className="scroll-mt-0">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-24 sm:px-6 lg:h-[100svh] lg:min-h-[640px] lg:max-h-[960px] lg:justify-center lg:px-8">
        <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-bone">
          From wallet to result in four moves.
        </h2>

        <ol className="hiw-list relative mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-10">
          <span aria-hidden="true" className="hiw-rail absolute inset-x-0 top-0 hidden h-px origin-left bg-cipher/50 lg:block" />
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className="hiw-step relative lg:pt-10">
              <span
                aria-hidden="true"
                className="absolute -top-[5px] left-0 hidden size-[11px] rounded-full border-2 border-vault bg-cipher lg:block"
              />
              <span className="block font-display text-6xl font-medium leading-none tracking-[-0.04em] text-cipher tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-8 text-xl font-semibold leading-snug tracking-[-0.015em] text-bone">{step.title}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-7 text-fog">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
