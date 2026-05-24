import { create } from "zustand";

import { defaultSectionContent } from "@/constants/sections";
import { cloneSectionProps, createSectionId } from "@/lib/json-utils";
import type { BuilderSection, SectionType } from "@/types/builder";

type MoveDirection = "up" | "down";

type BuilderStore = {
  sections: BuilderSection[];
  selectedSectionId: string | null;
  addSection: (type: SectionType) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (id: string, direction: MoveDirection) => void;
  replaceSections: (sections: BuilderSection[]) => void;
  resetBuilder: () => void;
  selectSection: (id: string | null) => void;
  updateSection: (id: string, props: Partial<BuilderSection["props"]>) => void;
};

function createSection(type: SectionType): BuilderSection {
  return {
    id: createSectionId(),
    type,
    props: cloneSectionProps(defaultSectionContent[type]),
  };
}

function mergeWithDefaultProps(section: BuilderSection): BuilderSection {
  return {
    ...section,
    props: cloneSectionProps({
      ...defaultSectionContent[section.type],
      ...section.props,
    }),
  };
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  sections: [],
  selectedSectionId: null,

  addSection: (type) =>
    set((state) => {
      const section = createSection(type);

      return {
        sections: [...state.sections, section],
        selectedSectionId: section.id,
      };
    }),

  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
      selectedSectionId:
        state.selectedSectionId === id ? null : state.selectedSectionId,
    })),

  duplicateSection: (id) =>
    set((state) => {
      const index = state.sections.findIndex((section) => section.id === id);

      if (index === -1) {
        return state;
      }

      const sourceSection = state.sections[index];
      const duplicatedSection: BuilderSection = {
        id: createSectionId(),
        type: sourceSection.type,
        props: cloneSectionProps(sourceSection.props),
      };
      const nextSections = [...state.sections];
      nextSections.splice(index + 1, 0, duplicatedSection);

      return {
        sections: nextSections,
        selectedSectionId: duplicatedSection.id,
      };
    }),

  moveSection: (id, direction) =>
    set((state) => {
      const index = state.sections.findIndex((section) => section.id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (
        index === -1 ||
        targetIndex < 0 ||
        targetIndex >= state.sections.length
      ) {
        return state;
      }

      const nextSections = [...state.sections];
      [nextSections[index], nextSections[targetIndex]] = [
        nextSections[targetIndex],
        nextSections[index],
      ];

      return {
        sections: nextSections,
        selectedSectionId: id,
      };
    }),

  replaceSections: (sections) =>
    set(() => ({
      sections: sections.map(mergeWithDefaultProps),
      selectedSectionId: null,
    })),

  resetBuilder: () =>
    set(() => ({
      sections: [],
      selectedSectionId: null,
    })),

  selectSection: (id) =>
    set(() => ({
      selectedSectionId: id,
    })),

  updateSection: (id, props) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id
          ? { ...section, props: { ...section.props, ...props } }
          : section,
      ),
    })),
}));
