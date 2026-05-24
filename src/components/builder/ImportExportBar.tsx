"use client";

export function ImportExportBar() {
  return (
    <header className="flex h-18 items-center justify-between border-b border-zinc-200 bg-white px-5">
      <div>
        <h1 className="text-lg font-semibold">Mini Website Builder</h1>
        <p className="text-sm text-zinc-500">Build and preview simple landing pages</p>
      </div>

      <div className="flex gap-2">
        <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:border-zinc-900">
          Import
        </button>
        <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          Export
        </button>
      </div>
    </header>
  );
}