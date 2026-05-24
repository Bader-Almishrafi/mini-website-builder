"use client";

import { useBuilderStore } from "@/store/builder-store";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { FooterSection } from "@/components/sections/FooterSection";

export function PreviewCanvas() {
  const sections = useBuilderStore((state) => state.sections);
  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);
  const selectSection = useBuilderStore((state) => state.selectSection);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Live preview</p>
          <h2 className="text-xl font-semibold">Website Canvas</h2>
        </div>
      </div>

      <div className="min-h-[650px] overflow-hidden rounded-2xl border border-zinc-200 bg-[#fbfaf7]">
        {sections.length === 0 ? (
          <div className="flex min-h-[650px] items-center justify-center p-8 text-center">
            <div>
              <h3 className="text-2xl font-semibold">
                Start building your page
              </h3>
              <p className="mt-2 max-w-md text-zinc-500">
                Add sections from the left panel to create a simple landing
                page.
              </p>
            </div>
          </div>
        ) : (
          sections.map((section) => (
            <div
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={() => selectSection(section.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectSection(section.id);
                }
              }}
              className={`block w-full text-left transition ${
                selectedSectionId === section.id
                  ? "ring-2 ring-zinc-950 ring-offset-2"
                  : ""
              }`}>
              {section.type === "header" && (
                <HeaderSection {...section.props} />
              )}
              {section.type === "hero" && <HeroSection {...section.props} />}
              {section.type === "features" && (
                <FeaturesSection {...section.props} />
              )}
              {section.type === "cta" && <CTASection {...section.props} />}
              {section.type === "footer" && (
                <FooterSection {...section.props} />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
