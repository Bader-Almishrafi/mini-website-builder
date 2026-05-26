/* eslint-disable @next/next/no-img-element */
import { memo } from "react";

import type { SectionButton, SectionProps } from "@/types/builder";

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
  buttons = [],
  imageUrl,
  backgroundColor = "#f7f4ee",
  textColor = "#18181b",
  textAlign = "center",
  buttonAlign = "center",
  buttonPlacement = "bottom",
}: SectionProps) {
  const imageSrc = imageUrl?.trim();
  const visibleButtons = getVisibleButtons(buttons, buttonText);
  const buttonGroup =
    visibleButtons.length > 0 ? (
      <div
        className={`flex w-full flex-wrap gap-3 ${buttonAlignClasses[buttonAlign]} ${
          buttonPlacement === "top" ? "mb-8" : "mt-8"
        }`}>
        {visibleButtons.map((button) => (
          <PreviewButton key={button.id} button={button} />
        ))}
      </div>
    ) : null;

  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20"
      style={{ backgroundColor, color: textColor }}>
      <div
        className={`mx-auto grid max-w-5xl gap-8 ${
          imageSrc ? "lg:grid-cols-[1fr_0.85fr] lg:items-center" : ""
        }`}>
        <div className={`flex flex-col ${textAlignClasses[textAlign]}`}>
          {buttonPlacement === "top" && buttonGroup}
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg opacity-70">{description}</p>
          {buttonPlacement === "bottom" && buttonGroup}
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

function getVisibleButtons(buttons: SectionButton[], buttonText?: string) {
  const configuredButtons = buttons.filter((button) => button.label.trim());

  if (configuredButtons.length > 0) {
    return configuredButtons;
  }

  const legacyLabel = buttonText?.trim();
  return legacyLabel
    ? [
        {
          id: "legacy-button",
          label: legacyLabel,
          backgroundColor: "#18181b",
          textColor: "#ffffff",
        },
      ]
    : [];
}

function PreviewButton({ button }: { button: SectionButton }) {
  const href = button.href?.trim();
  const style = {
    backgroundColor: button.backgroundColor || "#18181b",
    color: button.textColor || "#ffffff",
  };
  const className =
    "rounded-full px-6 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-lg";

  if (href) {
    return (
      <a className={className} href={href} style={style}>
        {button.label}
      </a>
    );
  }

  return (
    <button className={className} style={style} type="button">
      {button.label}
    </button>
  );
}
