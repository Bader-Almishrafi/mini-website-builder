import { SectionProps } from "@/types/builder";

export function HeroSection({
  title = "Grow Your Business",
  description = "Build beautiful pages easily.",
  buttonText = "Get Started",
}: SectionProps) {
  return (
    <section className="bg-[#f7f4ee] px-8 py-20 text-center">
      <p className="mx-auto mb-5 w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-600">
        No-code landing page
      </p>
      <h1 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600">
        {description}
      </p>
      <button className="mt-8 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white">
        {buttonText}
      </button>
    </section>
  );
}