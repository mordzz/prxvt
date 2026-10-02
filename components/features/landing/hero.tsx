"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AppMockup } from "@/components/features/landing/app-mockup";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADLINE = ["A private", "AI agent that", "can act and pay."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.3 } });
        tl.from(".hero-line > span", { yPercent: 110, rotate: 2, stagger: 0.09 })
          .from(".hero-fade", { opacity: 0, y: 16, filter: "blur(8px)", stagger: 0.08, duration: 1 }, "-=0.9")
          .from(".hero-mockup", { opacity: 0, y: 80, rotateX: 18, filter: "blur(14px)", duration: 1.8 }, "-=1");

        // As the hero scrolls away the mockup settles flat and dissolves into the page.
        gsap.fromTo(
          ".hero-mockup-inner",
          { rotateX: 10, scale: 0.96 },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".hero-mockup", start: "top 85%", end: "top 25%", scrub: true },
          }
        );
        gsap.to(".hero-mockup-inner", {
          opacity: 0,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".hero-mockup", start: "center 30%", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 size-[min(90vw,900px)] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(143,168,255,0.22), transparent 65%)" }}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <h1 className="font-display text-[clamp(2.4rem,6.4vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-bone">
          {HEADLINE.map((line) => (
            <span key={line} className="hero-line block overflow-hidden pb-[0.08em]">
              <span className="block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-8 max-w-[38rem] text-pretty text-base leading-7 text-fog sm:text-lg sm:leading-8">
          Chat privately, let your agent use approved tools, and control every onchain payment from one workspace. Your
          wallet proves who you are. It never follows you into the conversation.
        </p>

        <div className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/app"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-7 text-sm font-semibold text-vault transition-[transform,background-color] duration-300 ease-out-expo hover:bg-white active:scale-[0.97]"
          >
            Launch Private AI
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-sm font-semibold text-bone transition-colors duration-300 hover:border-cipher/60 hover:text-cipher"
          >
            See how it works
            <ArrowDown className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="hero-mockup relative mx-auto mt-20 max-w-6xl px-4 [perspective:1600px] sm:mt-24 sm:px-6 lg:px-8">
        <div className="hero-mockup-inner origin-top [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)]">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}
