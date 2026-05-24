import { SectionType, SectionProps } from "@/types/builder";

export const defaultSectionContent: Record<SectionType, SectionProps> = {
  header: {
    title: "My Website",
    logoUrl: "",
    navItems: ["Services", "About", "Contact"],
  },
  hero: {
    title: "Grow Your Business",
    description: "Build beautiful pages easily.",
    buttonText: "Get Started",
    imageUrl: "",
    backgroundColor: "#f7f4ee",
    textAlign: "center",
    buttonAlign: "center",
  },
  features: {
    title: "Our Features",
    description: "Fast, simple, and modern.",
    featureItems: ["Bookings", "Payments", "Customers"],
    textAlign: "center",
  },
  cta: {
    title: "Ready to Start?",
    buttonText: "Contact Us",
    backgroundColor: "#111827",
    textAlign: "center",
    buttonAlign: "center",
  },
  footer: {
    title: "© 2026 My Website",
    footerText: "© 2026 My Website",
    textAlign: "center",
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
