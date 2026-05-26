import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-40";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-zinc-950 text-white hover:bg-zinc-800 focus:ring-zinc-300",
  secondary:
    "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-900 hover:text-zinc-950 focus:ring-zinc-200",
  danger:
    "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-100",
  ghost:
    "border border-transparent bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 focus:ring-zinc-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "rounded-2xl px-3 py-2 text-sm",
  md: "rounded-full px-4 py-2 text-sm",
};

export function Button({
  children,
  className = "",
  variant = "secondary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
