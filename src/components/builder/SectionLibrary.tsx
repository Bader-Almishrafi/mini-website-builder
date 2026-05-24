"use client";

import { Plus } from "lucide-react";
import * as sections from "@/constants/sections";
import { SectionType } from "@/types/builder";
import { useBuilderStore } from "@/store/builder-store";

const sectionLabels = sections.sectionLabels;
const sectionTypes = sections.sectionTypes;

export function SectionLibrary() {
  const addSection = useBuilderStore((state) => state.addSection);

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-zinc-500">Build your page</p>
      <h2 className="mt-1 text-xl font-semibold">Sections</h2>

      <div className="mt-5 space-y-3">
        {sectionTypes.map((type) => (
          <button
            key={type}
            onClick={() => addSection(type)}
            className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-[#fbfaf7] px-4 py-3 text-left transition hover:border-zinc-900 hover:bg-white">
            <span className="font-medium">{sections.sectionLabels[type]}</span>
            <Plus size={18} />
          </button>
        ))}
      </div>
    </aside>
  );
}
