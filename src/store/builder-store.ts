import { create } from "zustand";

import { BuilderSection, SectionType } from "@/types/builder";

import { defaultSectionContent } from "@/constants/sections";

type BuilderStore = {
  sections: BuilderSection[];

  selectedSectionId: string | null;

  addSection: (type: SectionType) => void;

  deleteSection: (id: string) => void;

  selectSection: (id: string | null) => void;
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
        state.selectedSectionId === id ? null : state.selectedSectionId,
    })),

  selectSection: (id) =>
    set(() => ({
      selectedSectionId: id,
    })),
}));
