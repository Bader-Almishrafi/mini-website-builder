/* eslint-disable @next/next/no-img-element */
import { memo } from "react";

import type { SectionButton, SectionProps } from "@/types/builder";

export const HeaderSection = memo(function HeaderSection({
  title = "My Website",
  logoUrl,
  navItems = ["Services", "About", "Contact"],
  buttonText,
  buttons = [],
  backgroundColor = "#ffffff",
  textColor = "#18181b",
}: SectionProps) {
  const logoSrc = logoUrl?.trim();
  const visibleNavItems = navItems.filter((item) => item.trim());
  const visibleButtons = getVisibleButtons(buttons, buttonText);

  return (
    <header
      className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8"
      style={{ backgroundColor, color: textColor }}>
      <div className="flex min-w-0 items-center gap-3">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={title || "Logo"}
            className="h-11 w-11 shrink-0 rounded-2xl object-cover ring-1 ring-black/10"
          />
        )}
        <div className="min-w-0 truncate text-lg font-semibold text-current">
          {title}
        </div>
      </div>

      <div className="ml-auto flex flex-wrap items-center justify-end gap-3 sm:gap-4">
        {visibleNavItems.length > 0 && (
          <nav className="hidden flex-wrap items-center gap-6 text-sm text-current opacity-75 md:flex">
            {visibleNavItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </nav>
        )}

        {visibleButtons.length > 0 && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            {visibleButtons.map((button) => (
              <PreviewButton key={button.id} button={button} />
            ))}
          </div>
        )}
      </div>
    </header>
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
    "rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md";

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
