import { SectionProps } from "@/types/builder";

export function FooterSection({ title = "© 2026 My Website" }: SectionProps) {
  return (
    <footer className="bg-white px-8 py-8 text-center text-sm text-zinc-500">
      {title}
    </footer>
  );
}