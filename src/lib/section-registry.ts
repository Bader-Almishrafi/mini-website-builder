import type { NamedExoticComponent } from "react";

import { CTASection } from "@/components/sections/CTASection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import type { SectionProps, SectionType } from "@/types/builder";

export const sectionComponents: Record<
  SectionType,
  NamedExoticComponent<SectionProps>
> = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
  cta: CTASection,
  footer: FooterSection,
};
