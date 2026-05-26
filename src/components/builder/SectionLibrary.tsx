"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
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
          <Button
            key={type}
            onClick={() => addSection(type)}
            className="group w-full justify-between rounded-2xl bg-[#fbfaf7] px-4 py-3 text-left duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            size="sm">
            <span className="font-medium text-zinc-900">
              {sectionLabels[type]}
            </span>
            <span className="rounded-full bg-white p-1.5 text-zinc-500 transition group-hover:bg-zinc-950 group-hover:text-white">
              <Plus size={16} />
            </span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
