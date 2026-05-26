import { memo } from "react";

import type { FeatureItem, SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const FeaturesSection = memo(function FeaturesSection({
  title = "Our Features",
  description = "Fast, simple, and modern.",
  featureItems = [],
  backgroundColor = "#ffffff",
  textColor = "#18181b",
  textAlign = "center",
}: SectionProps) {
  const visibleFeatureItems = normalizeVisibleFeatures(featureItems);

  return (
    <section
      className={`px-6 py-16 sm:px-8 ${textAlignClasses[textAlign]}`}
      style={{ backgroundColor, color: textColor }}>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="mt-3 opacity-70">{description}</p>
      </div>

      {visibleFeatureItems.length > 0 && (
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {visibleFeatureItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="rounded-3xl border border-current/15 bg-white/10 p-6 shadow-sm backdrop-blur">
              <h3 className="font-semibold">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm opacity-65">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

function normalizeVisibleFeatures(featureItems: unknown): FeatureItem[] {
  if (!Array.isArray(featureItems)) {
    return [];
  }

  return featureItems.reduce<FeatureItem[]>((items, item, index) => {
    if (typeof item === "string") {
      if (item.trim()) {
        items.push({
          id: `legacy-feature-${index + 1}`,
          title: item,
          description: "",
        });
      }

      return items;
    }

    if (
      typeof item === "object" &&
      item !== null &&
      "title" in item &&
      typeof item.title === "string" &&
      item.title.trim()
    ) {
      items.push({
        id:
          "id" in item && typeof item.id === "string"
            ? item.id
            : `feature-${index + 1}`,
        title: item.title,
        description:
          "description" in item && typeof item.description === "string"
            ? item.description
            : "",
      });
    }

    return items;
  }, []);
}
