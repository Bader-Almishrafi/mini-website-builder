import type { SectionProps, SectionType } from "@/types/builder";

export const defaultSectionContent: Record<SectionType, SectionProps> = {
  header: {
    title: "My Website",
    logoUrl: "",
    backgroundColor: "#ffffff",
    textColor: "#18181b",
    navItems: ["Services", "About", "Contact"],
  },
  hero: {
    title: "Grow Your Business",
    description: "Build beautiful pages easily.",
    buttonText: "Get Started",
    imageUrl: "",
    backgroundColor: "#f7f4ee",
    textColor: "#18181b",
    textAlign: "center",
    buttonAlign: "center",
    buttonPlacement: "bottom",
  },
  features: {
    title: "Our Features",
    description: "Fast, simple, and modern.",
    featureItems: [
      {
        id: "feature-bookings",
        title: "Bookings",
        description: "Manage bookings with a simple, focused workflow.",
      },
      {
        id: "feature-payments",
        title: "Payments",
        description: "Keep payment details organized and easy to review.",
      },
      {
        id: "feature-customers",
        title: "Customers",
        description: "Track customer information from one clean place.",
      },
    ],
    backgroundColor: "#ffffff",
    textColor: "#18181b",
    textAlign: "center",
  },
  cta: {
    title: "Ready to Start?",
    description: "Launch your next page in minutes.",
    buttonText: "Contact Us",
    backgroundColor: "#111827",
    textColor: "#ffffff",
    textAlign: "center",
    buttonAlign: "center",
    buttonPlacement: "bottom",
  },
  footer: {
    title: "(c) 2026 My Website",
    footerText: "(c) 2026 My Website",
    backgroundColor: "#ffffff",
    textColor: "#71717a",
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
