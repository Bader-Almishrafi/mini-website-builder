import { memo } from "react";

import type { SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const FooterSection = memo(function FooterSection({
  title = "© 2026 My Website",
  footerText,
  backgroundColor = "#ffffff",
  textColor = "#71717a",
  textAlign = "center",
}: SectionProps) {
  const content = footerText || title;

  return (
    <footer
      className={`px-6 py-8 text-sm sm:px-8 ${textAlignClasses[textAlign]}`}
      style={{ backgroundColor, color: textColor }}>
      {content}
    </footer>
  );
});
