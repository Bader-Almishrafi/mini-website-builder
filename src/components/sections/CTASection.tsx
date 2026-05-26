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

export const CTASection = memo(function CTASection({
  title = "Ready to Start?",
  description = "Launch your next page in minutes.",
  buttonText = "Contact Us",
  buttons = [],
  backgroundColor = "#111827",
  textColor = "#ffffff",
  textAlign = "center",
  buttonAlign = "center",
  buttonPlacement = "bottom",
}: SectionProps) {
  const visibleButtons = getVisibleButtons(buttons, buttonText);
  const buttonGroup =
    visibleButtons.length > 0 ? (
      <div
        className={`flex w-full flex-wrap gap-3 ${buttonAlignClasses[buttonAlign]} ${
          buttonPlacement === "top" ? "mb-7" : "mt-7"
        }`}>
        {visibleButtons.map((button) => (
          <PreviewButton key={button.id} button={button} />
        ))}
      </div>
    ) : null;

  return (
    <section
      className="px-6 py-16 sm:px-8"
      style={{ backgroundColor, color: textColor }}>
      <div className={`mx-auto flex max-w-3xl flex-col ${textAlignClasses[textAlign]}`}>
        {buttonPlacement === "top" && buttonGroup}
        <h2 className="text-3xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base opacity-75">{description}</p>
        )}
        {buttonPlacement === "bottom" && buttonGroup}
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
          backgroundColor: "#ffffff",
          textColor: "#18181b",
        },
      ]
    : [];
}

function PreviewButton({ button }: { button: SectionButton }) {
  const href = button.href?.trim();
  const style = {
    backgroundColor: button.backgroundColor || "#ffffff",
    color: button.textColor || "#18181b",
  };
  const className =
    "rounded-full border border-current/10 px-6 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-lg";

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
