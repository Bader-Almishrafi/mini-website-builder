"use client";

import { memo } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { EmptyState } from "@/components/ui/EmptyState";
import { sectionComponents } from "@/lib/section-registry";
import { useBuilderStore } from "@/store/builder-store";
import type { BuilderSection } from "@/types/builder";
import { SortableSection } from "./SortableSection";

type PreviewSectionProps = {
  section: BuilderSection;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const PreviewSection = memo(function PreviewSection({
  section,
  isSelected,
  onSelect,
}: PreviewSectionProps) {
  const SectionComponent = sectionComponents[section.type];

  return (
    <SortableSection
      id={section.id}
      isSelected={isSelected}
      onSelect={() => onSelect(section.id)}>
      <SectionComponent {...section.props} />
    </SortableSection>
  );
});

export function PreviewCanvas() {
  const sections = useBuilderStore((state) => state.sections);
  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);
  const selectSection = useBuilderStore((state) => state.selectSection);
  const reorderSections = useBuilderStore((state) => state.reorderSections);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    reorderSections(String(active.id), String(over.id));
  };

  return (
    <section className="min-w-0 rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Preview
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950">
            Website Canvas
          </h2>
        </div>
        <p className="text-sm text-zinc-500">
          {sections.length} {sections.length === 1 ? "section" : "sections"}
        </p>
      </div>

      <div className="min-h-[620px] overflow-hidden rounded-2xl border border-zinc-200 bg-[#fbfaf7]">
        {sections.length === 0 ? (
          <div className="flex min-h-[620px] items-center justify-center p-8 text-center">
            <EmptyState
              className="max-w-xl border-zinc-200 bg-white"
              title="Start building your page"
              description="Choose a section from the left sidebar. New sections appear here, and clicking any preview block opens its settings."
            />
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={sections.map((section) => section.id)}
              strategy={verticalListSortingStrategy}>
              {sections.map((section) => (
                <PreviewSection
                  key={section.id}
                  section={section}
                  isSelected={selectedSectionId === section.id}
                  onSelect={selectSection}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </section>
  );
}
