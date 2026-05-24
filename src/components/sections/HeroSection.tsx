/* eslint-disable @next/next/no-img-element */
import { memo } from "react";

import type { SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const buttonAlignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const HeroSection = memo(function HeroSection({
  title = "Grow Your Business",
  description = "Build beautiful pages easily.",
  buttonText = "Get Started",
  imageUrl,
  backgroundColor = "#f7f4ee",
  textColor = "#18181b",
  textAlign = "center",
  buttonAlign = "center",
}: SectionProps) {
  const imageSrc = imageUrl?.trim();

  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20"
      style={{ backgroundColor, color: textColor }}>
      <div
        className={`mx-auto grid max-w-5xl gap-8 ${
          imageSrc ? "lg:grid-cols-[1fr_0.85fr] lg:items-center" : ""
        }`}>
        <div className={`flex flex-col ${textAlignClasses[textAlign]}`}>
          <p className="mb-5 w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm">
            No-code landing page
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg opacity-70">{description}</p>
          <div className={`mt-8 flex w-full ${buttonAlignClasses[buttonAlign]}`}>
            <button className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              {buttonText}
            </button>
          </div>
        </div>

        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="h-64 w-full rounded-3xl object-cover shadow-xl sm:h-80"
          />
        )}
      </div>
    </section>
  );
});
