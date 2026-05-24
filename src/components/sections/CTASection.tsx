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

export const CTASection = memo(function CTASection({
  title = "Ready to Start?",
  description = "Launch your next page in minutes.",
  buttonText = "Contact Us",
  backgroundColor = "#111827",
  textColor = "#ffffff",
  textAlign = "center",
  buttonAlign = "center",
}: SectionProps) {
  return (
    <section
      className="px-6 py-16 sm:px-8"
      style={{ backgroundColor, color: textColor }}>
      <div className={`mx-auto flex max-w-3xl flex-col ${textAlignClasses[textAlign]}`}>
        <h2 className="text-3xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base opacity-75">{description}</p>
        )}
        <div className={`mt-7 flex w-full ${buttonAlignClasses[buttonAlign]}`}>
          <button className="rounded-full border border-current/10 bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:-translate-y-0.5 hover:shadow-lg">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
});
