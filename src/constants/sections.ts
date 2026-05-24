import { SectionType, SectionProps } from "@/types/builder";

export const defaultSectionContent: Record<SectionType, SectionProps> = {
  header: {
    title: "My Website",
  },
  hero: {
    title: "Grow Your Business",
    description: "Build beautiful pages easily.",
    buttonText: "Get Started",
  },
  features: {
    title: "Our Features",
    description: "Fast, simple, and modern.",
  },
  cta: {
    title: "Ready to Start?",
    buttonText: "Contact Us",
  },
  footer: {
    title: "© 2026 My Website",
  },
};

export const sectionTypes: SectionType[] = [
  "header",
  "hero",
  "features",
  "cta",
  "footer",
];

export const sectionLabels: Record<SectionType, string> = {
  header: "Header",
  hero: "Hero",
  features: "Features",
  cta: "Call to Action",
  footer: "Footer",
};
