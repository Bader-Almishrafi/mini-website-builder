import { SectionProps } from "@/types/builder";

export function HeaderSection({ title = "My Website" }: SectionProps) {
  return (
    <header className="flex items-center justify-between bg-white px-8 py-5">
      <div className="text-lg font-semibold">{title}</div>
      <nav className="hidden gap-6 text-sm text-zinc-600 md:flex">
        <span>Services</span>
        <span>About</span>
        <span>Contact</span>
      </nav>
      <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm text-white">
        Book now
      </button>
    </header>
  );
}