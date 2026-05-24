import { SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function FeaturesSection({
  title = "Our Features",
  description = "Fast, simple, and modern.",
  featureItems = ["Bookings", "Payments", "Customers"],
  textAlign = "center",
}: SectionProps) {
  const visibleFeatureItems = featureItems.filter((item) => item.trim());

  return (
    <section className={`bg-white px-8 py-16 ${textAlignClasses[textAlign]}`}>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="mt-3 text-zinc-600">{description}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
        {visibleFeatureItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-3xl border border-zinc-200 p-6">
            <h3 className="font-semibold">{item}</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Manage everything from one simple page.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
