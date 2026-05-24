import { sectionTypes } from "@/constants/sections";
import type {
  BuilderSection,
  SectionAlignment,
  SectionProps,
  SectionType,
} from "@/types/builder";

export const DESIGN_STORAGE_KEY = "mini-website-builder-design";
export const EXPORT_FILE_NAME = "mini-website-builder-design.json";

const alignmentValues: SectionAlignment[] = ["left", "center", "right"];
type StringPropName = Extract<
  keyof SectionProps,
  | "title"
  | "description"
  | "buttonText"
  | "imageUrl"
  | "logoUrl"
  | "backgroundColor"
  | "textColor"
  | "footerText"
>;

type ListPropName = Extract<keyof SectionProps, "navItems" | "featureItems">;

const stringPropNames: StringPropName[] = [
  "title",
  "description",
  "buttonText",
  "imageUrl",
  "logoUrl",
  "backgroundColor",
  "textColor",
  "footerText",
];
const listPropNames: ListPropName[] = ["navItems", "featureItems"];

type ParseResult =
  | { ok: true; sections: BuilderSection[] }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSectionType(value: unknown): value is SectionType {
  return typeof value === "string" && sectionTypes.includes(value as SectionType);
}

function isAlignment(value: unknown): value is SectionAlignment {
  return (
    typeof value === "string" &&
    alignmentValues.includes(value as SectionAlignment)
  );
}

export function createSectionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `section-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function cloneSectionProps(props: SectionProps): SectionProps {
  return {
    ...props,
    navItems: props.navItems ? [...props.navItems] : undefined,
    featureItems: props.featureItems ? [...props.featureItems] : undefined,
  };
}

function normalizeProps(value: unknown): SectionProps {
  if (!isRecord(value)) {
    return {};
  }

  const props: SectionProps = {};

  stringPropNames.forEach((name) => {
    const propValue = value[name];
    if (typeof propValue === "string") {
      props[name] = propValue;
    }
  });

  listPropNames.forEach((name) => {
    const propValue = value[name];
    if (
      Array.isArray(propValue) &&
      propValue.every((item) => typeof item === "string")
    ) {
      props[name] = propValue;
    }
  });

  if (isAlignment(value.textAlign)) {
    props.textAlign = value.textAlign;
  }

  if (isAlignment(value.buttonAlign)) {
    props.buttonAlign = value.buttonAlign;
  }

  return props;
}

export function normalizeSections(value: unknown): ParseResult {
  const rawSections = Array.isArray(value)
    ? value
    : isRecord(value) && Array.isArray(value.sections)
      ? value.sections
      : null;

  if (!rawSections) {
    return {
      ok: false,
      error: "The file must contain an array of sections.",
    };
  }

  const ids = new Set<string>();
  const sections: BuilderSection[] = [];

  for (const [index, rawSection] of rawSections.entries()) {
    if (!isRecord(rawSection)) {
      return {
        ok: false,
        error: `Section ${index + 1} must be an object.`,
      };
    }

    if (!isSectionType(rawSection.type)) {
      return {
        ok: false,
        error: `Section ${index + 1} has an unsupported section type.`,
      };
    }

    const rawId = typeof rawSection.id === "string" ? rawSection.id : "";
    const id = rawId && !ids.has(rawId) ? rawId : createSectionId();
    ids.add(id);

    sections.push({
      id,
      type: rawSection.type,
      props: normalizeProps(rawSection.props),
    });
  }

  return { ok: true, sections };
}

export function parseImportedSections(json: string): ParseResult {
  try {
    return normalizeSections(JSON.parse(json));
  } catch {
    return {
      ok: false,
      error: "The selected file is not valid JSON.",
    };
  }
}

export function readSectionsFromStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedDesign = window.localStorage.getItem(DESIGN_STORAGE_KEY);
  if (!savedDesign) {
    return null;
  }

  const result = parseImportedSections(savedDesign);
  return result.ok ? result.sections : null;
}

export function writeSectionsToStorage(sections: BuilderSection[]) {
  if (typeof window === "undefined") {
    return;
  }

  if (sections.length === 0) {
    window.localStorage.removeItem(DESIGN_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(sections));
}

export function clearSavedSections() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DESIGN_STORAGE_KEY);
  }
}

export function exportSectionsAsJson(sections: BuilderSection[]) {
  const blob = new Blob([JSON.stringify(sections, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = EXPORT_FILE_NAME;
  link.click();
  URL.revokeObjectURL(url);
}
