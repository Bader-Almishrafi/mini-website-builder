import { SectionProps } from "@/types/builder";

export function CTASection({
  title = "Ready to Start?",
  buttonText = "Contact Us",
}: SectionProps) {
  return (
    <section className="bg-zinc-950 px-8 py-16 text-center text-white">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950">
        {buttonText}
      </button>
    </section>
  );
}