import { SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const buttonAlignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export function CTASection({
  title = "Ready to Start?",
  buttonText = "Contact Us",
  backgroundColor = "#111827",
  textAlign = "center",
  buttonAlign = "center",
}: SectionProps) {
  return (
    <section
      className={`px-8 py-16 text-white ${textAlignClasses[textAlign]}`}
      style={{ backgroundColor }}>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className={`mt-6 flex ${buttonAlignClasses[buttonAlign]}`}>
        <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
