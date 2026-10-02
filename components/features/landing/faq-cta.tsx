import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/data/mock-faq";

export function FaqCta() {
  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-bone">
            Questions, answered.
          </h2>
          <Accordion defaultValue={[FAQ_ITEMS[0]?.question]}>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-white/[0.08]">
                <AccordionTrigger className="py-6 text-left text-base font-semibold text-bone hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-[15px] leading-7 text-fog">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-20 flex flex-col gap-8 rounded-2xl border border-white/[0.08] bg-panel p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-12">
          <div>
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.025em] text-bone">
              Start with a private workspace.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-fog">
              Walk through the full wallet-to-result journey with demo data. No extension, key, or real payment required.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/app"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-bone px-7 text-sm font-semibold text-vault transition-[transform,background-color] duration-300 ease-out-expo hover:bg-white active:scale-[0.97]"
            >
              Launch Private AI
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-bone transition-colors duration-300 hover:border-cipher/60 hover:text-cipher"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
