import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  children,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 text-center ${className}`}>
      <p className="text-base font-semibold text-zinc-900">{title}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
        {description}
      </p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
