export type SectionType =
  | "header"
  | "hero"
  | "features"
  | "cta"
  | "footer";

export type SectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
  backgroundColor?: string;
};

export type BuilderSection = {
  id: string;
  type: SectionType;
  props: SectionProps;
};