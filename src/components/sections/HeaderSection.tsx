/* eslint-disable @next/next/no-img-element */
import { memo } from "react";

import type { SectionProps } from "@/types/builder";

export const HeaderSection = memo(function HeaderSection({
  title = "My Website",
  logoUrl,
  navItems = ["Services", "About", "Contact"],
  backgroundColor = "#ffffff",
  textColor = "#18181b",
}: SectionProps) {
  const logoSrc = logoUrl?.trim();
  const visibleNavItems = navItems.filter((item) => item.trim());

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

      {visibleNavItems.length > 0 && (
        <nav className="hidden flex-wrap items-center gap-6 text-sm text-current opacity-75 md:flex">
          {visibleNavItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </nav>
      )}

      <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
        Book now
      </button>
    </header>
  );
});
