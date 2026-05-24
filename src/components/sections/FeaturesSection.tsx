import { memo } from "react";

import type { SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const FeaturesSection = memo(function FeaturesSection({
  title = "Our Features",
  description = "Fast, simple, and modern.",
  featureItems = ["Bookings", "Payments", "Customers"],
  backgroundColor = "#ffffff",
  textColor = "#18181b",
  textAlign = "center",
}: SectionProps) {
  const visibleFeatureItems = featureItems.filter((item) => item.trim());

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
              key={`${item}-${index}`}
              className="rounded-3xl border border-current/15 bg-white/10 p-6 shadow-sm backdrop-blur">
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-2 text-sm opacity-65">
                Manage everything from one simple page.
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
});
