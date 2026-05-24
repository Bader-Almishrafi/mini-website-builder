import { BuilderPersistence } from "./BuilderPersistence";
import { ImportExportBar } from "./ImportExportBar";
import { PreviewCanvas } from "./PreviewCanvas";
import { SectionEditor } from "./SectionEditor";
import { SectionLibrary } from "./SectionLibrary";

export function BuilderShell() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-zinc-950">
      <BuilderPersistence />
      <ImportExportBar />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[260px_minmax(0,1fr)_340px] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionLibrary />
        </div>
        <PreviewCanvas />
        <div className="lg:sticky lg:top-24">
          <SectionEditor />
        </div>
      </div>
    </main>
  );
}
