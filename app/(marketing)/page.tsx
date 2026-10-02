import { Hero } from "@/components/features/landing/hero";
import { ActivityTicker } from "@/components/features/landing/activity-ticker";
import { Capabilities } from "@/components/features/landing/capabilities";
import { HowItWorks } from "@/components/features/landing/how-it-works";
import { FaqCta } from "@/components/features/landing/faq-cta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ActivityTicker />
      <Capabilities />
      <HowItWorks />
      <FaqCta />
    </>
  );
}
