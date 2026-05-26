"use client";

import type { ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableSectionProps = {
  id: string;
  isSelected: boolean;
  children: ReactNode;
  onSelect: () => void;
};

export function SortableSection({
  id,
  isSelected,
  children,
  onSelect,
}: SortableSectionProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative block w-full text-left outline-none transition duration-200 ${
        isDragging ? "z-20 scale-[1.01] opacity-80 shadow-xl" : "hover:scale-[1.002]"
      } ${
        isSelected
          ? "z-10 ring-2 ring-inset ring-zinc-950"
          : "hover:ring-1 hover:ring-inset hover:ring-zinc-300"
      }`}>
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label="Drag to reorder section"
        className="absolute left-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/85 text-zinc-500 opacity-80 shadow-sm backdrop-blur transition hover:border-zinc-300 hover:text-zinc-950 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        {...attributes}
        {...listeners}>
        <GripVertical size={17} />
      </button>

      <div
        className="cursor-pointer"
        onClick={(event) => {
          const target = event.target;

          if (target instanceof Element && target.closest("a")) {
            event.preventDefault();
          }

          onSelect();
        }}>
        {children}
      </div>
    </div>
  );
}
