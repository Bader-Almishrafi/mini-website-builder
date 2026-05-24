"user client";

import { SectionLibrary } from "./SectionLibrary";
import { PreviewCanvas } from "./PreviewCanvas";
import { SectionEditor } from "./SectionEditor";
import { ImportExportBar } from "./ImportExportBar";

export function BuilderShell() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-zinc-950">
      <ImportExportBar />

      <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 gap-4 p-4 lg:grid-cols-[280px_1fr_320px]">
        <SectionLibrary />
        <PreviewCanvas />
        <SectionEditor />
      </div>
    </main>
  );
}