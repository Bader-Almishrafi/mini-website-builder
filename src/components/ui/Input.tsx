import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", type = "text", ...props }: InputProps) {
  const isColor = type === "color";

  return (
    <input
      type={type}
      className={`w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition duration-150 focus:border-zinc-900 focus:bg-white ${
        isColor ? "h-12 p-1" : ""
      } ${className}`}
      {...props}
    />
  );
}
