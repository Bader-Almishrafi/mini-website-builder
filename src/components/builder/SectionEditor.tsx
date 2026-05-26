"use client";

import { ArrowDown, ArrowUp, Copy, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createSectionId } from "@/lib/json-utils";
import { useBuilderStore } from "@/store/builder-store";
import type {
  ButtonPlacement,
  FeatureItem,
  SectionAlignment,
  SectionButton,
  SectionProps,
  SectionType,
} from "@/types/builder";

type TextFieldName = Exclude<
  keyof SectionProps,
  | "navItems"
  | "featureItems"
  | "buttons"
  | "textAlign"
  | "buttonAlign"
  | "buttonPlacement"
>;

type TextField = {
  name: TextFieldName;
  label: string;
  type: "text" | "textarea" | "color";
  placeholder: string;
};

type ListField = {
  name: "navItems";
  label: string;
  type: "list";
  placeholder: string;
};

type FeatureItemsField = {
  name: "featureItems";
  label: string;
  type: "features";
};

type AlignmentField = {
  name: "textAlign" | "buttonAlign";
  label: string;
  type: "alignment";
};

type PlacementField = {
  name: "buttonPlacement";
  label: string;
  type: "placement";
};

type ButtonsField = {
  name: "buttons";
  label: string;
  type: "buttons";
};

type SectionField =
  | TextField
  | ListField
  | FeatureItemsField
  | AlignmentField
  | PlacementField
  | ButtonsField;

const alignmentOptions: SectionAlignment[] = ["left", "center", "right"];
const placementOptions: ButtonPlacement[] = ["top", "bottom"];

const alignmentLabels: Record<SectionAlignment, string> = {
  left: "Left",
  center: "Center",
  right: "Right",
};

const placementLabels: Record<ButtonPlacement, string> = {
  top: "Top",
  bottom: "Bottom",
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
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "color",
      placeholder: "",
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "color",
      placeholder: "",
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
    { name: "buttons", label: "Buttons", type: "buttons" },
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
    {
      name: "textColor",
      label: "Text Color",
      type: "color",
      placeholder: "",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
    { name: "buttonAlign", label: "Button Align", type: "alignment" },
    { name: "buttonPlacement", label: "Button Placement", type: "placement" },
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
      type: "features",
    },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "color",
      placeholder: "",
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "color",
      placeholder: "",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
  ],
  cta: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
    },
    { name: "buttons", label: "Buttons", type: "buttons" },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "color",
      placeholder: "",
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "color",
      placeholder: "",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
    { name: "buttonAlign", label: "Button Align", type: "alignment" },
    { name: "buttonPlacement", label: "Button Placement", type: "placement" },
  ],
  footer: [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
      name: "footerText",
      label: "Footer Text",
      type: "text",
      placeholder: "Enter footer text",
    },
    {
      name: "backgroundColor",
      label: "Background Color",
      type: "color",
      placeholder: "",
    },
    {
      name: "textColor",
      label: "Text Color",
      type: "color",
      placeholder: "",
    },
    { name: "textAlign", label: "Text Align", type: "alignment" },
  ],
};

function getDefaultButtonColors(type: SectionType) {
  return type === "cta"
    ? { backgroundColor: "#ffffff", textColor: "#18181b" }
    : { backgroundColor: "#18181b", textColor: "#ffffff" };
}

function createEditorButton(
  type: SectionType,
  label = "New Button",
): SectionButton {
  const colors = getDefaultButtonColors(type);

  return {
    id: createSectionId(),
    label,
    href: "",
    ...colors,
  };
}

function createFeatureItem(): FeatureItem {
  return {
    id: createSectionId(),
    title: "New Feature",
    description: "Describe this feature.",
  };
}

export function SectionEditor() {
  const sections = useBuilderStore((state) => state.sections);
  const selectedSectionId = useBuilderStore((state) => state.selectedSectionId);
  const updateSection = useBuilderStore((state) => state.updateSection);
  const deleteSection = useBuilderStore((state) => state.deleteSection);
  const duplicateSection = useBuilderStore((state) => state.duplicateSection);
  const moveSection = useBuilderStore((state) => state.moveSection);

  const selectedIndex = sections.findIndex(
    (section) => section.id === selectedSectionId,
  );
  const selectedSection =
    selectedIndex >= 0 ? sections[selectedIndex] : undefined;

  if (!selectedSection) {
    return (
      <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Customize
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950">
            Section Settings
          </h2>
        </div>

        <EmptyState
          className="mt-8"
          title="No section selected"
          description="Select a section in the preview to edit its content, styles, and position."
        />
      </aside>
    );
  }

  const fields = sectionFields[selectedSection.type];

  const updateProps = (props: Partial<SectionProps>) => {
    updateSection(selectedSection.id, props);
  };

  const getEditableButtons = () => {
    const buttons = selectedSection.props.buttons || [];

    if (buttons.length > 0) {
      return buttons;
    }

    const legacyLabel = selectedSection.props.buttonText?.trim();
    const colors = getDefaultButtonColors(selectedSection.type);
    return legacyLabel
      ? [
          {
            id: "legacy-button",
            label: legacyLabel,
            href: "",
            ...colors,
          },
        ]
      : [];
  };

  const getEditableFeatureItems = () => {
    const items = selectedSection.props.featureItems || [];

    return items.reduce<FeatureItem[]>((nextItems, item, index) => {
      if (typeof item === "string") {
        nextItems.push({
          id: `legacy-feature-${index + 1}`,
          title: item,
          description: "Describe this feature.",
        });
        return nextItems;
      }

      nextItems.push(item);
      return nextItems;
    }, []);
  };

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Customize
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-950 capitalize">
          {selectedSection.type} section
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button
          onClick={() => moveSection(selectedSection.id, "up")}
          disabled={selectedIndex === 0}
          size="sm">
          <ArrowUp size={16} />
          Move up
        </Button>
        <Button
          onClick={() => moveSection(selectedSection.id, "down")}
          disabled={selectedIndex === sections.length - 1}
          size="sm">
          <ArrowDown size={16} />
          Move down
        </Button>
        <Button onClick={() => duplicateSection(selectedSection.id)} size="sm">
          <Copy size={16} />
          Duplicate
        </Button>
        <Button
          onClick={() => deleteSection(selectedSection.id)}
          size="sm"
          variant="danger">
          <Trash2 size={16} />
          Delete
        </Button>
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
                      <Input
                        value={item}
                        onChange={(event) => {
                          const nextItems = [...items];
                          nextItems[index] = event.target.value;
                          updateProps({ [field.name]: nextItems });
                        }}
                        className="min-w-0 flex-1 rounded-2xl"
                        placeholder={field.placeholder}
                      />
                      <Button
                        onClick={() =>
                          updateProps({
                            [field.name]: items.filter(
                              (_, itemIndex) => itemIndex !== index,
                            ),
                          })
                        }
                        className="shrink-0 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                        size="sm">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() =>
                    updateProps({ [field.name]: [...items, "New item"] })
                  }
                  className="mt-3"
                  size="sm">
                  Add item
                </Button>
              </div>
            );
          }

          if (field.type === "features") {
            const items = getEditableFeatureItems();

            const updateFeature = (
              featureId: string,
              featureProps: Partial<FeatureItem>,
            ) => {
              updateProps({
                featureItems: items.map((item) =>
                  item.id === featureId
                    ? { ...item, ...featureProps, id: item.id }
                    : item,
                ),
              });
            };

            const removeFeature = (featureId: string) => {
              updateProps({
                featureItems: items.filter((item) => item.id !== featureId),
              });
            };

            const addFeature = () => {
              updateProps({
                featureItems: [...items, createFeatureItem()],
              });
            };

            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-zinc-200 bg-zinc-50 p-3 transition hover:border-zinc-300">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="min-w-0 text-sm font-semibold text-zinc-900">
                          Feature {index + 1}
                        </p>
                        <Button
                          onClick={() => removeFeature(item.id)}
                          className="hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                          size="sm">
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="mb-2 block text-xs font-medium text-zinc-500">
                            Title
                          </label>
                          <Input
                            value={item.title}
                            onChange={(event) =>
                              updateFeature(item.id, {
                                title: event.target.value,
                              })
                            }
                            placeholder="Feature title"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-medium text-zinc-500">
                            Description
                          </label>
                          <Textarea
                            className="min-h-24"
                            value={item.description}
                            onChange={(event) =>
                              updateFeature(item.id, {
                                description: event.target.value,
                              })
                            }
                            placeholder="Feature description"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={addFeature} className="mt-3" size="sm">
                  Add feature
                </Button>
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
                    <Button
                      key={option}
                      onClick={() => updateProps({ [field.name]: option })}
                      className="font-semibold"
                      size="sm"
                      variant={value === option ? "primary" : "secondary"}>
                      {alignmentLabels[option]}
                    </Button>
                  ))}
                </div>
              </div>
            );
          }

          if (field.type === "placement") {
            const value = selectedSection.props.buttonPlacement || "bottom";

            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {placementOptions.map((option) => (
                    <Button
                      key={option}
                      onClick={() => updateProps({ buttonPlacement: option })}
                      className="font-semibold"
                      size="sm"
                      variant={value === option ? "primary" : "secondary"}>
                      {placementLabels[option]}
                    </Button>
                  ))}
                </div>
              </div>
            );
          }

          if (field.type === "buttons") {
            const buttons = getEditableButtons();

            const updateButton = (
              buttonId: string,
              buttonProps: Partial<SectionButton>,
            ) => {
              updateProps({
                buttonText: "",
                buttons: buttons.map((button) =>
                  button.id === buttonId
                    ? { ...button, ...buttonProps, id: button.id }
                    : button,
                ),
              });
            };

            const removeButton = (buttonId: string) => {
              updateProps({
                buttonText: "",
                buttons: buttons.filter((button) => button.id !== buttonId),
              });
            };

            const addButton = () => {
              updateProps({
                buttonText: "",
                buttons: [...buttons, createEditorButton(selectedSection.type)],
              });
            };

            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  {field.label}
                </label>
                <div className="space-y-3">
                  {buttons.map((button, index) => (
                    <div
                      key={button.id}
                      className="rounded-3xl border border-zinc-200 bg-zinc-50 p-3 transition hover:border-zinc-300">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="min-w-0 text-sm font-semibold text-zinc-900">
                          Button {index + 1}
                        </p>
                        <Button
                          onClick={() => removeButton(button.id)}
                          className="hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                          size="sm">
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="mb-2 block text-xs font-medium text-zinc-500">
                            Label
                          </label>
                          <Input
                            value={button.label}
                            onChange={(event) =>
                              updateButton(button.id, {
                                label: event.target.value,
                              })
                            }
                            placeholder="Button label"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-medium text-zinc-500">
                            Link
                          </label>
                          <Input
                            value={button.href || ""}
                            onChange={(event) =>
                              updateButton(button.id, {
                                href: event.target.value,
                              })
                            }
                            placeholder="https://example.com"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-medium text-zinc-500">
                              Background
                            </label>
                            <Input
                              type="color"
                              value={button.backgroundColor || "#18181b"}
                              onChange={(event) =>
                                updateButton(button.id, {
                                  backgroundColor: event.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-xs font-medium text-zinc-500">
                              Text
                            </label>
                            <Input
                              type="color"
                              value={button.textColor || "#ffffff"}
                              onChange={(event) =>
                                updateButton(button.id, {
                                  textColor: event.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={addButton} className="mt-3" size="sm">
                  Add button
                </Button>
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
                <Textarea
                  value={displayValue}
                  onChange={(event) =>
                    updateProps({ [field.name]: event.target.value })
                  }
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
              <Input
                type={field.type}
                value={inputValue}
                onChange={(event) =>
                  updateProps({ [field.name]: event.target.value })
                }
                placeholder={field.placeholder}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
