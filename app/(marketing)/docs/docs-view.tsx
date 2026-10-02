"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DocsSidebar } from "@/components/layout/docs-sidebar";
import { DOCS_CONTENT, DOCS_NAV } from "@/data/docs-nav";
import { cn } from "@/lib/utils";

const ORDER = DOCS_NAV.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })));

export function DocsView() {
  const [activeId, setActiveId] = useState(ORDER[0].id);
  const index = ORDER.findIndex((i) => i.id === activeId);
  const doc = DOCS_CONTENT[activeId];
  const prev = ORDER[index - 1];
  const next = ORDER[index + 1];

  function go(id: string) {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-32 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20 lg:px-8">
      <aside className="lg:sticky lg:top-28 lg:h-[calc(100svh-8rem)] lg:overflow-y-auto">
        <DocsSidebar activeId={activeId} onSelect={go} />
      </aside>

      <AnimatePresence mode="wait">
        <motion.article
          key={activeId}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[44rem]"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-fog">{ORDER[index].section}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                doc.status === "live" ? "bg-cipher/12 text-cipher" : "bg-white/[0.06] text-fog"
              )}
            >
              <span className={cn("size-1.5 rounded-full", doc.status === "live" ? "bg-cipher" : "bg-fog")} aria-hidden="true" />
              {doc.status === "live" ? "Available in the prototype" : doc.comingSoon ? "Coming later" : "Planned"}
            </span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.035em] text-bone">
            {doc.title}
          </h1>
          <p className="mt-5 text-xl leading-8 text-bone/80">{doc.summary}</p>
          <p className="mt-8 text-[17px] leading-8 text-fog">{doc.body}</p>

          <ul className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {doc.points.map((point) => (
              <li key={point} className="flex gap-4 py-4 text-[15px] leading-7 text-bone/85">
                <span className="mt-3 h-px w-3 shrink-0 bg-cipher" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          {doc.code && (
            <figure className="mt-10 overflow-hidden rounded-xl bg-panel">
              <figcaption className="px-5 pt-4 text-xs text-fog">{doc.code.label}</figcaption>
              <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-6 text-cipher">
                <code>{doc.code.snippet}</code>
              </pre>
            </figure>
          )}

          <nav aria-label="Pagination" className="mt-16 grid grid-cols-2 gap-4">
            {prev ? (
              <button onClick={() => go(prev.id)} className="group rounded-xl py-4 text-left">
                <span className="flex items-center gap-1.5 text-sm text-fog">
                  <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-1 block text-base font-semibold text-bone group-hover:text-cipher">{prev.label}</span>
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button onClick={() => go(next.id)} className="group rounded-xl py-4 text-right">
                <span className="flex items-center justify-end gap-1.5 text-sm text-fog">
                  Next
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-base font-semibold text-bone group-hover:text-cipher">{next.label}</span>
              </button>
            )}
          </nav>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
