import { SectionProps } from "@/types/builder";

const textAlignClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const buttonAlignClasses = {
  left: "items-start justify-start md:items-center",
  center: "items-center justify-center",
  right: "items-end justify-end md:items-center",
};

export function HeroSection({
  title = "Grow Your Business",
  description = "Build beautiful pages easily.",
  buttonText = "Get Started",
  imageUrl,
  backgroundColor = "#f7f4ee",
  textAlign = "center",
  buttonAlign = "center",
}: SectionProps) {
  return (
    <section className="px-8 py-20" style={{ backgroundColor }}>
      <div
        className={`mx-auto flex max-w-4xl flex-col ${textAlignClasses[textAlign]}`}>
        <p className="mb-5 w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-600">
          No-code landing page
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-600">{description}</p>
        <div
          className={`mt-8 flex w-full flex-col gap-4 md:flex-row ${buttonAlignClasses[buttonAlign]}`}>
          <button className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white">
            {buttonText}
          </button>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-48 w-full max-w-md rounded-3xl object-cover shadow-xl"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
