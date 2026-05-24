"use client";

export function SectionEditor() {
  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-zinc-500">Customize</p>
      <h2 className="mt-1 text-xl font-semibold">Section Settings</h2>

      <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 p-5 text-sm text-zinc-500">
        Select a section from the preview to edit its content.
      </div>
    </aside>
  );
}