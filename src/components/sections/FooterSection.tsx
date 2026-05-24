import { SectionProps } from "@/types/builder";

export function FooterSection({
  title = "© 2026 My Website",
  footerText,
  textAlign = "center",
}: SectionProps) {
  const content = footerText || title;
  return (
    <footer
      className={`bg-white px-8 py-8 text-sm text-zinc-500 ${
        textAlign === "left"
          ? "text-left"
          : textAlign === "right"
            ? "text-right"
            : "text-center"
      }`}>
      {content}
    </footer>
  );
}
