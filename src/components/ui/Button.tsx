import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-accent text-white hover:brightness-110 shadow-[0_0_0_1px_var(--surface-30-border)]",
  secondary:
    "bg-surface-30 text-fg border border-(--surface-30-border) hover:bg-[color-mix(in_oklab,var(--surface-30)_92%,var(--accent-10)_8%)]",
  ghost:
    "text-muted hover:text-fg hover:bg-surface-30/60 border border-transparent",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-[transform,box-shadow,background] duration-200 active:scale-[0.98]";

export function buttonClass(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `${baseClass} ${variants[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      type="button"
      className={`${buttonClass(variant)} disabled:pointer-events-none disabled:opacity-45 ${className}`}
      {...props}
    />
  );
}
