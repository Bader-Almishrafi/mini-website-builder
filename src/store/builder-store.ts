import { create } from "zustand";
import { BuilderSection, SectionType } from "@/types/builder";

type BuilderStore = {
  sections: BuilderSection[];
  selectedSectionId: string | null;

  addSection: (type: SectionType) => void;
  deleteSection: (id: string) => void;
  selectSection: (id: string | null) => void;
};

const defaultSectionContent: Record<SectionType, BuilderSection["props"]> = {
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

export const useBuilderStore = create<BuilderStore>((set) => ({
  sections: [],

  selectedSectionId: null,

  addSection: (type) =>
    set((state) => ({
      sections: [
        ...state.sections,
        {
          id: crypto.randomUUID(),
          type,
          props: defaultSectionContent[type],
        },
      ],
    })),

  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
      selectedSectionId:
        state.selectedSectionId === id
          ? null
          : state.selectedSectionId,
    })),

  selectSection: (id) =>
    set(() => ({
      selectedSectionId: id,
    })),
}));