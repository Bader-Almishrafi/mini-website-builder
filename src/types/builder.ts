export type SectionType = "header" | "hero" | "features" | "cta" | "footer";

export type SectionAlignment = "left" | "center" | "right";

export type ButtonPlacement = "top" | "bottom";

export type SectionButton = {
  id: string;
  label: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
};

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
};

export type SectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttons?: SectionButton[];
  imageUrl?: string;
  logoUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  navItems?: string[];
  featureItems?: FeatureItem[];
  footerText?: string;
  textAlign?: SectionAlignment;
  buttonAlign?: SectionAlignment;
  buttonPlacement?: ButtonPlacement;
};

export type BuilderSection = {
  id: string;
  type: SectionType;
  props: SectionProps;
};
