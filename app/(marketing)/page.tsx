import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { Benefits } from "@/components/marketing/benefits";
import { LevelsOverview } from "@/components/marketing/levels-overview";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PracticeFeatures } from "@/components/marketing/practice-features";
import { ExampleStats } from "@/components/marketing/example-stats";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Belajar Bahasa Inggris dari Nol, Satu Langkah Setiap Hari`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <LevelsOverview />
      <HowItWorks />
      <PracticeFeatures />
      <ExampleStats />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
