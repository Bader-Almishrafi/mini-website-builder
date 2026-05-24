import { SectionProps } from "@/types/builder";

export function HeaderSection({
  title = "My Website",
  logoUrl,
  navItems = ["Services", "About", "Contact"],
}: SectionProps) {
  const logoSrc = logoUrl?.trim();
  const visibleNavItems = navItems.filter((item) => item.trim());

  return (
    <header className="flex flex-wrap items-center justify-between bg-white px-8 py-5">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={title || "Logo"}
          className="h-10 max-w-[180px] object-contain"
        />
      ) : (
        <div className="text-lg font-semibold">{title}</div>
      )}
      <nav className="hidden gap-6 text-sm text-zinc-600 md:flex">
        {visibleNavItems.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </nav>
      <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm text-white">
        Book now
      </button>
    </header>
  );
}
