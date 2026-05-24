"use client";

import { Plus } from "lucide-react";

import { sectionLabels, sectionTypes } from "@/constants/sections";
import { useBuilderStore } from "@/store/builder-store";

export function SectionLibrary() {
  const addSection = useBuilderStore((state) => state.addSection);

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Build
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-950">Sections</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Add reusable blocks to the canvas.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {sectionTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => addSection(type)}
            className="group flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-[#fbfaf7] px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-200">
            <span className="font-medium text-zinc-900">
              {sectionLabels[type]}
            </span>
            <span className="rounded-full bg-white p-1.5 text-zinc-500 transition group-hover:bg-zinc-950 group-hover:text-white">
              <Plus size={16} />
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
