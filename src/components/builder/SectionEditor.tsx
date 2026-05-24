"use client";

import { useBuilderStore } from "@/store/builder-store";
import {
  SectionAlignment,
  SectionProps,
  SectionType,
} from "@/types/builder";

type TextFieldName = Exclude<
  keyof SectionProps,
  "navItems" | "featureItems" | "textAlign" | "buttonAlign"
>;

type TextField = {
  name: TextFieldName;
  label: string;
  type: "text" | "textarea" | "color";
  placeholder: string;
};

type ListField = {
  name: "navItems" | "featureItems";
  label: string;
  type: "list";
  placeholder: string;
};

type AlignmentField = {
  name: "textAlign" | "buttonAlign";
  label: string;
  type: "alignment";
};

type SectionField = TextField | ListField | AlignmentField;

const alignmentOptions: SectionAlignment[] = ["left", "center", "right"];

const alignmentLabels: Record<SectionAlignment, string> = {
  left: "Left",
  center: "Center",
  right: "Right",
};

const sectionFields: Record<SectionType, SectionField[]> = {
  header: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "logoUrl",
      label: "Logo URL",
      type: "text",
      placeholder: "Enter logo image URL",
    },
    {
      name: "navItems",
      label: "Navigation Items",
      type: "list",
      placeholder: "Navigation item",
    },
  ],
  hero: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
    },
    {
      name: "buttonText",
      label: "Button Text",
      type: "text",
      placeholder: "Enter button label",
    },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "text",
      placeholder: "Enter image URL",
    },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "color",
      placeholder: "",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
    { name: "buttonAlign", label: "Button Align", type: "alignment" },
  ],
  features: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
    },
    {
      name: "featureItems",
      label: "Feature Items",
      type: "list",
      placeholder: "Feature item",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
  ],
  cta: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "buttonText",
      label: "Button Text",
      type: "text",
      placeholder: "Enter button label",
    },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "color",
      placeholder: "",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
    { name: "buttonAlign", label: "Button Align", type: "alignment" },
  ],
  footer: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "footerText",
      label: "Footer Text",
      type: "text",
      placeholder: "Enter footer text",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
  ],
};

export function SectionEditor() {
  const sections = useBuilderStore((state) => state.sections);

  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);

  const updateSection = useBuilderStore((state) => state.updateSection);
  const deleteSection = useBuilderStore((state) => state.deleteSection);

  const selectedSection = sections.find(
    (section) => section.id === selectedSectionId,
  );

  if (!selectedSection) {
    return (
      <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Customize
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
              Section Settings
            </h2>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center text-sm text-zinc-500">
          <p className="text-base font-semibold text-zinc-900">
            No section selected
          </p>
          <p className="mt-3 max-w-sm mx-auto">
            Click a section in the preview to open its settings panel and
            customize the page.
          </p>
        </div>
      </aside>
    );
  }

  const fields = sectionFields[selectedSection.type];

  const updateProps = (props: Partial<SectionProps>) => {
    updateSection(selectedSection.id, props);
  };

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
            Customize
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-950 capitalize">
            {selectedSection.type} section
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {fields.map((field) => {
          if (field.type === "list") {
            const listValue = selectedSection.props[field.name];
            const items = Array.isArray(listValue) ? listValue : [];

            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={`${field.name}-${index}`} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(event) => {
                          const nextItems = [...items];
                          nextItems[index] = event.target.value;
                          updateProps({ [field.name]: nextItems });
                        }}
                        className="min-w-0 flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition duration-150 focus:border-zinc-900 focus:bg-white"
                        placeholder={field.placeholder}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateProps({
                            [field.name]: items.filter(
                              (_, itemIndex) => itemIndex !== index,
                            ),
                          })
                        }
                        className="shrink-0 rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-100">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => updateProps({ [field.name]: [...items, ""] })}
                  className="mt-3 inline-flex items-center rounded-2xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-200">
                  Add item
                </button>
              </div>
            );
          }

          if (field.type === "alignment") {
            const value = selectedSection.props[field.name] || "center";

            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {alignmentOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateProps({ [field.name]: option })}
                      className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-zinc-200 ${
                        value === option
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-950"
                      }`}>
                      {alignmentLabels[option]}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          const rawValue = selectedSection.props[field.name] as
            | string
            | undefined;
          const displayValue = rawValue || "";
          const inputValue =
            field.type === "color" ? displayValue || "#ffffff" : displayValue;

          if (field.type === "textarea") {
            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                <textarea
                  value={displayValue}
                  onChange={(event) =>
                    updateProps({ [field.name]: event.target.value })
                  }
                  className="min-h-30 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition duration-150 focus:border-zinc-900 focus:bg-white"
                  placeholder={field.placeholder}
                />
              </div>
            );
          }

          return (
            <div key={field.name}>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                {field.label}
              </label>
              <input
                type={field.type}
                value={inputValue}
                onChange={(event) =>
                  updateProps({ [field.name]: event.target.value })
                }
                className="w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition duration-150 focus:border-zinc-900 focus:bg-white"
                placeholder={field.placeholder}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <button
          type="button"
          onClick={() => deleteSection(selectedSection.id)}
          className="inline-flex w-full items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200">
          Delete Section
        </button>
      </div>
    </aside>
  );
}
