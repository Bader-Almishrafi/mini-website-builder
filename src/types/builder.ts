export type SectionType = "header" | "hero" | "features" | "cta" | "footer";

export type SectionAlignment = "left" | "center" | "right";

export type SectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
  logoUrl?: string;
  backgroundColor?: string;
  navItems?: string[];
  featureItems?: string[];
  footerText?: string;
  textAlign?: SectionAlignment;
  buttonAlign?: SectionAlignment;
};

export type BuilderSection = {
  id: string;
  type: SectionType;
  props: SectionProps;
};
