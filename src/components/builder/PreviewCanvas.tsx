"use client";

import { memo } from "react";

import { sectionComponents } from "@/lib/section-registry";
import { useBuilderStore } from "@/store/builder-store";
import type { BuilderSection } from "@/types/builder";

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
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(section.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(section.id);
        }
      }}
      className={`block w-full text-left outline-none transition duration-200 hover:scale-[1.002] ${
        isSelected
          ? "relative z-10 ring-2 ring-inset ring-zinc-950"
          : "hover:ring-1 hover:ring-inset hover:ring-zinc-300"
      }`}>
      <SectionComponent {...section.props} />
    </div>
  );
});

export function PreviewCanvas() {
  const sections = useBuilderStore((state) => state.sections);
  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);
  const selectSection = useBuilderStore((state) => state.selectSection);

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
            <div>
              <h3 className="text-2xl font-semibold text-zinc-950">
                Start building your page
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                Choose a section from the left sidebar. New sections appear
                here, and clicking any preview block opens its settings.
              </p>
            </div>
          </div>
        ) : (
          sections.map((section) => (
            <PreviewSection
              key={section.id}
              section={section}
              isSelected={selectedSectionId === section.id}
              onSelect={selectSection}
            />
          ))
        )}
      </div>
    </section>
  );
}
